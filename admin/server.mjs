import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto"
import { createReadStream, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { createServer } from "node:http"
import { extname, join, normalize, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { validateContent } from "./validate.mjs"

const root = resolve(fileURLToPath(new URL("..", import.meta.url)))
const publicDir = join(root, "admin", "public")
const contentPath = join(root, "content", "site.json")
const credentialsPath = join(root, "admin", ".credentials")
const uploadDir = join(root, "public", "images", "uploads")
const imagesRoot = join(root, "public", "images")
const port = Number(process.env.ADMIN_PORT || 3001)
const host = "127.0.0.1"

const sessions = new Map()
const attempts = new Map()
const SESSION_MS = 12 * 60 * 60 * 1000
const WINDOW_MS = 10 * 60 * 1000

function readContent() {
  return JSON.parse(readFileSync(contentPath, "utf8"))
}

function writeContent(document) {
  writeFileSync(contentPath, `${JSON.stringify(document, null, 2)}\n`, "utf8")
}

function hashPassword(password, salt = randomBytes(16)) {
  return {
    salt: salt.toString("base64"),
    hash: scryptSync(password, salt, 32).toString("base64"),
  }
}

function passwordMatches(password, stored) {
  const actual = scryptSync(password, Buffer.from(stored.salt, "base64"), 32)
  const expected = Buffer.from(stored.hash, "base64")
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

let freshlyCreated = false

function loadCredentials() {
  if (process.env.ADMIN_PASSWORD) {
    const user = process.env.ADMIN_USER || "alejandro"
    return { user, ...hashPassword(process.env.ADMIN_PASSWORD), ephemeral: true }
  }
  if (existsSync(credentialsPath)) {
    return JSON.parse(readFileSync(credentialsPath, "utf8"))
  }
  const password = randomBytes(12).toString("base64url")
  const stored = { user: "alejandro", ...hashPassword(password) }
  writeFileSync(credentialsPath, `${JSON.stringify(stored, null, 2)}\n`, "utf8")
  freshlyCreated = true
  console.log("")
  console.log(`Panel listo en http://${host}:${port}`)
  console.log(`Usuario: ${stored.user}`)
  console.log(`Contraseña: ${password}`)
  console.log("Guardada en admin/.credentials (no se sube al repositorio).")
  console.log("")
  return stored
}

const credentials = loadCredentials()
if (!credentials.ephemeral && !freshlyCreated) {
  console.log(`Panel en http://${host}:${port}`)
  console.log(`Usuario: ${credentials.user}`)
  console.log("La contraseña está en admin/.credentials")
}

function cookieToken(req) {
  const header = req.headers.cookie ?? ""
  const match = header.match(/(?:^|;\s*)archivo=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ""
}

function sessionUser(req) {
  const token = cookieToken(req)
  const session = sessions.get(token)
  if (!session || session.expires < Date.now()) {
    if (token) sessions.delete(token)
    return null
  }
  return session.user
}

function clientIp(req) {
  return req.socket.remoteAddress || "local"
}

function tooManyAttempts(ip) {
  const entry = attempts.get(ip)
  if (!entry || entry.reset < Date.now()) return false
  return entry.count >= 8
}

function recordAttempt(ip) {
  const entry = attempts.get(ip)
  if (!entry || entry.reset < Date.now()) {
    attempts.set(ip, { count: 1, reset: Date.now() + WINDOW_MS })
    return
  }
  entry.count += 1
}

function sameOrigin(req) {
  const origin = req.headers.origin
  if (!origin) return false
  try {
    const url = new URL(origin)
    return url.hostname === host && url.port === String(port)
  } catch {
    return false
  }
}

function send(res, status, body, headers = {}) {
  const payload = typeof body === "string" ? body : JSON.stringify(body)
  res.writeHead(status, {
    "content-type": typeof body === "string" ? "text/plain; charset=utf-8" : "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    ...headers,
  })
  res.end(payload)
}

function readBody(req, limit) {
  return new Promise((resolvePromise, reject) => {
    const chunks = []
    let size = 0
    req.on("data", (chunk) => {
      size += chunk.length
      if (size > limit) {
        reject(Object.assign(new Error("La solicitud es demasiado grande."), { status: 413 }))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on("end", () => resolvePromise(Buffer.concat(chunks)))
    req.on("error", reject)
  })
}

const staticTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
}

function serveFile(res, filePath) {
  if (!existsSync(filePath)) {
    send(res, 404, { error: "No encontrado." })
    return
  }
  const type = staticTypes[extname(filePath).toLowerCase()] ?? "application/octet-stream"
  res.writeHead(200, { "content-type": type, "cache-control": "no-store", "x-content-type-options": "nosniff" })
  createReadStream(filePath).pipe(res)
}

function safeImagePath(urlPath) {
  const relative = decodeURIComponent(urlPath.replace(/^\/images\//, ""))
  const filePath = normalize(join(imagesRoot, relative))
  if (!filePath.startsWith(imagesRoot)) return null
  return filePath
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${host}:${port}`)
    const path = url.pathname

    if (req.method === "GET" && (path === "/" || path === "/index.html")) {
      serveFile(res, join(publicDir, "index.html"))
      return
    }
    if (req.method === "GET" && (path === "/admin.css" || path === "/admin.js")) {
      serveFile(res, join(publicDir, path.slice(1)))
      return
    }
    if (req.method === "GET" && path.startsWith("/images/")) {
      const filePath = safeImagePath(path)
      if (!filePath) {
        send(res, 400, { error: "Ruta no permitida." })
        return
      }
      serveFile(res, filePath)
      return
    }

    if (req.method === "GET" && path === "/api/session") {
      send(res, 200, { ok: Boolean(sessionUser(req)) })
      return
    }

    if (req.method === "POST" && path === "/api/login") {
      if (!sameOrigin(req)) {
        send(res, 403, { error: "Origen no permitido." })
        return
      }
      const ip = clientIp(req)
      if (tooManyAttempts(ip)) {
        send(res, 429, { error: "Demasiados intentos. Espera unos minutos." })
        return
      }
      const body = JSON.parse((await readBody(req, 16_000)).toString("utf8") || "{}")
      const user = String(body.user ?? "")
      const password = String(body.password ?? "")
      const userOk = user.length === credentials.user.length && timingSafeEqual(Buffer.from(user), Buffer.from(credentials.user))
      if (!userOk || !passwordMatches(password, credentials)) {
        recordAttempt(ip)
        send(res, 401, { error: "Usuario o contraseña incorrectos." })
        return
      }
      const token = randomBytes(32).toString("base64url")
      sessions.set(token, { user: credentials.user, expires: Date.now() + SESSION_MS })
      send(res, 200, { ok: true }, {
        "set-cookie": `archivo=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_MS / 1000}`,
      })
      return
    }

    if (req.method === "POST" && path === "/api/logout") {
      sessions.delete(cookieToken(req))
      send(res, 200, { ok: true }, {
        "set-cookie": "archivo=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0",
      })
      return
    }

    if (!sessionUser(req)) {
      send(res, 401, { error: "Entra para continuar." })
      return
    }
    if (req.method !== "GET" && !sameOrigin(req)) {
      send(res, 403, { error: "Origen no permitido." })
      return
    }

    if (req.method === "GET" && path === "/api/content") {
      send(res, 200, readContent())
      return
    }

    if (req.method === "PUT" && path === "/api/content") {
      const body = JSON.parse((await readBody(req, 2_000_000)).toString("utf8"))
      const document = validateContent(body, readContent())
      writeContent(document)
      send(res, 200, document)
      return
    }

    if (req.method === "POST" && path === "/api/upload") {
      const body = JSON.parse((await readBody(req, 6_000_000)).toString("utf8"))
      const match = String(body.dataUrl ?? "").match(/^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=\s]+)$/)
      if (!match) {
        send(res, 400, { error: "Sube un JPG, PNG o WebP." })
        return
      }
      const buffer = Buffer.from(match[2], "base64")
      if (buffer.length > 4_000_000) {
        send(res, 413, { error: "La imagen supera 4 MB." })
        return
      }
      const ext = match[1] === "jpeg" ? "jpg" : match[1]
      const base = String(body.name ?? "imagen")
        .toLowerCase()
        .replace(/\.[a-z0-9]+$/, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 40) || "imagen"
      mkdirSync(uploadDir, { recursive: true })
      const filename = `${Date.now()}-${base}.${ext}`
      writeFileSync(join(uploadDir, filename), buffer)
      send(res, 200, { path: `/images/uploads/${filename}` })
      return
    }

    send(res, 404, { error: "No encontrado." })
  } catch (error) {
    const status = error.status || (error instanceof SyntaxError ? 400 : 500)
    send(res, status, { error: status === 500 ? "No se pudo completar la acción." : error.message })
  }
})

server.listen(port, host)
