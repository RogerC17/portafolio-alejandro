const SECTIONS = [
  ["sitio", "Sitio"],
  ["portada", "Portada"],
  ["contacto", "Contacto"],
  ["redes", "Redes"],
  ["areas", "Áreas"],
  ["prensa", "Prensa"],
  ["publicaciones", "Publicaciones"],
  ["trayectoria", "Trayectoria"],
  ["labor", "Labor social"],
  ["proyectos", "Proyectos"],
]

const app = document.querySelector("#app")
const fileInput = document.querySelector("#file")

let doc = null
let section = "sitio"
let openIds = new Set()
let dirty = false
let saveState = "idle"
let error = ""
let filter = ""
let uploadPath = ""

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function getPath(root, path) {
  return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), root)
}

function setPath(root, path, value) {
  const keys = path.split(".")
  let cursor = root
  for (let index = 0; index < keys.length - 1; index += 1) {
    const key = keys[index]
    if (cursor[key] == null || typeof cursor[key] !== "object") cursor[key] = {}
    cursor = cursor[key]
  }
  cursor[keys[keys.length - 1]] = value
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    headers: { "content-type": "application/json", ...(options.headers || {}) },
    ...options,
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload.error || "No se pudo completar la acción.")
  return payload
}

function field(path, label, { type = "text", wide = false, rows = 4, options = [] } = {}) {
  const id = `f-${path.replace(/[^a-z0-9]+/gi, "-")}`
  const value = getPath(doc, path) ?? ""
  if (type === "textarea") {
    return `<label class="field ${wide ? "wide" : ""}" for="${id}"><span>${label}</span><textarea id="${id}" name="${id}" data-path="${path}" rows="${rows}">${esc(value)}</textarea></label>`
  }
  if (type === "lines") {
    const text = Array.isArray(value) ? value.join("\n") : value
    return `<label class="field wide" for="${id}"><span>${label}</span><textarea id="${id}" name="${id}" data-path="${path}" data-kind="lines" rows="${rows}">${esc(text)}</textarea></label>`
  }
  if (type === "checkbox") {
    return `<label class="check ${wide ? "wide" : ""}" for="${id}"><input id="${id}" name="${id}" type="checkbox" data-path="${path}" data-kind="bool" ${value ? "checked" : ""}><span>${label}</span></label>`
  }
  if (type === "select") {
    const choices = options
      .map((option) => `<option value="${esc(option.value)}" ${option.value === value ? "selected" : ""}>${esc(option.label)}</option>`)
      .join("")
    return `<label class="field ${wide ? "wide" : ""}" for="${id}"><span>${label}</span><select id="${id}" name="${id}" data-path="${path}">${choices}</select></label>`
  }
  const upload = type === "image"
    ? `<button class="tool" type="button" data-action="upload" data-upload="${path}">Subir</button>`
    : ""
  const preview = type === "image" && String(value).startsWith("/images/")
    ? `<img class="preview" src="${esc(value)}" alt="">`
    : ""
  return `<label class="field ${wide ? "wide" : ""}" for="${id}"><span>${label}</span><span class="upload-row"><input id="${id}" name="${id}" data-path="${path}" data-kind="${type === "number" ? "number" : "text"}" value="${esc(value)}" inputmode="${type === "number" ? "numeric" : "text"}">${upload}</span>${preview}</label>`
}

function slugify(value) {
  const base = String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48)
  return base || `registro-${Date.now()}`
}

function uniqueId(list, key, seed) {
  let id = slugify(seed)
  const taken = new Set(list.map((item) => item[key]))
  let suffix = 2
  while (taken.has(id)) {
    id = `${slugify(seed)}-${suffix}`
    suffix += 1
  }
  return id
}

function record(item, index, listKey, title, meta) {
  const id = item.id || item.slug
  const open = openIds.has(id) ? "is-open" : ""
  return `<article class="record ${open}" data-list="${listKey}" data-index="${index}" data-id="${esc(id)}" data-title="${esc(`${title} ${meta}`)}">
    <div class="record-head">
      <button class="record-toggle" type="button" data-action="toggle">
        <span class="record-title">${esc(title || "Sin título")}</span>
        <span class="record-meta">${esc(meta)}</span>
      </button>
      <div class="record-tools">
        <button class="tool" type="button" data-action="up">Subir</button>
        <button class="tool" type="button" data-action="down">Bajar</button>
        <button class="tool danger" type="button" data-action="remove">Quitar</button>
      </div>
    </div>
    <div class="record-body"><div class="grid">${itemBody(listKey, index, item)}</div></div>
  </article>`
}

function itemBody(listKey, index, item) {
  const base = `${listKey}.${index}`
  if (listKey === "press") {
    return [
      field(`${base}.slug`, "Identificador"),
      field(`${base}.media`, "Medio"),
      field(`${base}.title`, "Título", { wide: true }),
      field(`${base}.date`, "Fecha visible"),
      field(`${base}.dateIso`, "Fecha ISO"),
      field(`${base}.url`, "Enlace", { wide: true }),
      field(`${base}.image`, "Imagen", { type: "image", wide: true }),
    ].join("")
  }
  if (listKey === "publications") {
    return [
      field(`${base}.slug`, "Identificador"),
      field(`${base}.year`, "Año"),
      field(`${base}.title`, "Título", { wide: true }),
      field(`${base}.spineTitle`, "Título del lomo"),
      field(`${base}.publisher`, "Editorial"),
      field(`${base}.description`, "Descripción", { type: "textarea", wide: true, rows: 3 }),
      field(`${base}.datePublished`, "Fecha de publicación"),
      field(`${base}.buyUrl`, "Enlace de compra"),
      field(`${base}.url`, "Nota", { wide: true }),
      field(`${base}.authors`, "Autores, uno por línea", { type: "lines", rows: 3 }),
      field(`${base}.content`, "Párrafos, uno por línea", { type: "lines", rows: 4 }),
      field(`${base}.cover`, "Portada", { type: "image" }),
      field(`${base}.coverBack`, "Contraportada", { type: "image" }),
      field(`${base}.coverSpine`, "Lomo", { type: "image" }),
    ].join("")
  }
  if (listKey === "career") {
    return [
      field(`${base}.id`, "Identificador"),
      field(`${base}.year`, "Año"),
      field(`${base}.title`, "Título", { wide: true }),
      field(`${base}.institution`, "Institución", { wide: true }),
      field(`${base}.period`, "Periodo"),
      field(`${base}.category`, "Categoría", {
        type: "select",
        options: ["Cargos", "Formación", "Reconocimientos"].map((value) => ({ value, label: value })),
      }),
      field(`${base}.description`, "Descripción", { type: "textarea", wide: true, rows: 3 }),
      field(`${base}.featured`, "Destacado en portada", { type: "checkbox" }),
      field(`${base}.ongoing`, "Vigente", { type: "checkbox" }),
      field(`${base}.photo.src`, "Fotografía", { type: "image", wide: true }),
      field(`${base}.photo.alt`, "Texto de la fotografía", { type: "textarea", wide: true, rows: 2 }),
      field(`${base}.photo.caption`, "Pie", { type: "textarea", wide: true, rows: 2 }),
      field(`${base}.photo.width`, "Ancho", { type: "number" }),
      field(`${base}.photo.height`, "Alto", { type: "number" }),
    ].join("")
  }
  if (listKey === "projects") {
    return [
      field(`${base}.id`, "Identificador"),
      field(`${base}.source`, "Origen", {
        type: "select",
        options: [
          { value: "enlace-trece", label: "Enlace Trece" },
          { value: "soyalejo", label: "SoyAlejo4.0" },
        ],
      }),
      field(`${base}.title`, "Título", { wide: true }),
      field(`${base}.category`, "Categoría"),
      field(`${base}.year`, "Año"),
      field(`${base}.description`, "Descripción", { type: "textarea", wide: true, rows: 3 }),
      field(`${base}.url`, "Enlace", { wide: true }),
      field(`${base}.image`, "Imagen o miniatura", { type: "image", wide: true }),
      field(`${base}.featured`, "Destacado en portada", { type: "checkbox", wide: true }),
    ].join("")
  }
  const sources = (item.sources || [])
    .map((source, sourceIndex) => {
      const path = `${base}.sources.${sourceIndex}`
      return `<div class="source-row">
        <label class="field"><span>Fuente</span><input data-path="${path}.label" value="${esc(source.label)}"></label>
        <label class="field"><span>Enlace</span><input data-path="${path}.href" value="${esc(source.href)}"></label>
        <button class="tool danger" type="button" data-action="remove-source" data-source="${sourceIndex}">Quitar</button>
      </div>`
    })
    .join("")
  return [
    field(`${base}.id`, "Identificador"),
    field(`${base}.period`, "Fecha"),
    field(`${base}.title`, "Título", { wide: true }),
    field(`${base}.place`, "Lugar"),
    field(`${base}.summary`, "Resumen", { type: "textarea", wide: true, rows: 4 }),
    `<div class="wide sources"><p>Fuentes</p>${sources}<button class="tool" type="button" data-action="add-source">Añadir fuente</button></div>`,
    field(`${base}.image.src`, "Fotografía", { type: "image", wide: true }),
    field(`${base}.image.alt`, "Texto de la fotografía", { type: "textarea", wide: true, rows: 2 }),
    field(`${base}.image.layout`, "Encuadre", {
      type: "select",
      options: [
        { value: "portrait", label: "Retrato" },
        { value: "poster", label: "Afiche" },
        { value: "wide", label: "Horizontal" },
        { value: "split", label: "Dividida" },
      ],
    }),
    field(`${base}.image.width`, "Ancho", { type: "number" }),
    field(`${base}.image.height`, "Alto", { type: "number" }),
  ].join("")
}

function listSection(listKey, leadPath, addLabel, titleOf, metaOf) {
  const items = doc[listKey] || []
  const cards = items.map((item, index) => record(item, index, listKey, titleOf(item), metaOf(item))).join("")
  const searchable = items.length > 8
  return `<div class="toolbar">
      <button class="tool" type="button" data-action="add" data-list="${listKey}">${addLabel}</button>
      ${searchable ? `<input class="search" type="search" value="${esc(filter)}" placeholder="Buscar" aria-label="Buscar">` : ""}
    </div>
    ${field(leadPath, "Entrada de la sección", { type: "textarea", wide: true, rows: 2 })}
    <div class="records">${cards || '<p class="empty">No hay registros. Añade el primero.</p>'}</div>
    <p class="empty" data-filter-empty hidden>Ningún registro coincide con la búsqueda.</p>`
}

function simpleSection() {
  if (section === "sitio") {
    return `<div class="grid">
      ${field("site.name", "Nombre")}
      ${field("site.location", "Lugar")}
      ${field("site.title", "Título del sitio", { wide: true })}
      ${field("site.role", "Rol", { wide: true })}
      ${field("site.statement", "Frase", { wide: true })}
      ${field("site.description", "Descripción", { type: "textarea", wide: true, rows: 4 })}
    </div>`
  }
  if (section === "portada") {
    return `<div class="grid">
      ${field("home.heroLead", "Texto principal", { type: "textarea", wide: true, rows: 4 })}
      ${field("home.manifestoLines.0", "Manifiesto, primera línea", { wide: true })}
      ${field("home.manifestoLines.1", "Manifiesto, segunda línea", { wide: true })}
      ${field("home.manifestoSupport", "Apoyo", { type: "textarea", wide: true, rows: 5 })}
    </div>`
  }
  if (section === "contacto") {
    return `<div class="grid">
      ${field("contact.title", "Título", { wide: true })}
      ${field("contact.lead", "Entrada", { type: "textarea", wide: true, rows: 3 })}
      ${field("contact.quote", "Cita", { type: "textarea", wide: true, rows: 3 })}
      ${field("contact.ctaLabel", "Texto del botón")}
    </div><p class="lede">El botón abre el enlace de LinkedIn que está en Redes.</p>`
  }
  if (section === "redes") {
    return doc.social
      .map((link, index) => `<fieldset class="record is-open"><div class="grid">
        <label class="field"><span>Red</span><input value="${esc(link.id)}" disabled></label>
        ${field(`social.${index}.label`, "Nombre visible")}
        ${field(`social.${index}.href`, "Enlace", { wide: true })}
      </div></fieldset>`)
      .join("")
  }
  return doc.focus
    .map((area, index) => `<fieldset class="record is-open"><div class="grid">
      <p class="wide record-title">${esc(area.title)}</p>
      ${field(`focus.${index}.title`, "Título")}
      ${field(`focus.${index}.register`, "Registro")}
      ${field(`focus.${index}.lead`, "Texto", { type: "textarea", wide: true, rows: 3 })}
      ${field(`focus.${index}.alt`, "Texto de la fotografía", { wide: true })}
    </div></fieldset>`)
    .join("")
}

function sectionBody() {
  if (section === "prensa") {
    return listSection("press", "pressLead", "Añadir nota", (item) => item.title, (item) => item.media)
  }
  if (section === "publicaciones") {
    return listSection("publications", "publicationsLead", "Añadir publicación", (item) => item.title, (item) => item.year)
  }
  if (section === "trayectoria") {
    return listSection("career", "careerLead", "Añadir hito", (item) => item.title, (item) => item.year)
  }
  if (section === "labor") {
    return listSection("socialWork", "socialWorkLead", "Añadir actividad", (item) => item.title, (item) => item.period)
  }
  if (section === "proyectos") {
    return listSection("projects", "projectsLead", "Añadir proyecto", (item) => item.title, (item) => item.source)
  }
  return simpleSection()
}

function renderLogin(message = "") {
  app.innerHTML = `<main class="login"><form class="login-card stack" id="login">
    <h1 class="wordmark">Archivo</h1>
    <p>Panel de contenido</p>
    <label class="field" for="user"><span>Usuario</span><input id="user" name="user" autocomplete="username" required></label>
    <label class="field" for="password"><span>Contraseña</span><input id="password" name="password" type="password" autocomplete="current-password" required></label>
    <p class="alert" role="alert">${esc(message)}</p>
    <button class="primary" type="submit">Entrar</button>
  </form></main>`
  document.querySelector("#login").addEventListener("submit", async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    try {
      await api("/api/login", {
        method: "POST",
        body: JSON.stringify({ user: data.get("user"), password: data.get("password") }),
      })
      await boot()
    } catch (reason) {
      renderLogin(reason.message)
    }
  })
}

function render() {
  const label = SECTIONS.find((entry) => entry[0] === section)?.[1] ?? "Sitio"
  const saveLabel = saveState === "saving" ? "Guardando…" : saveState === "saved" ? "Guardado" : "Guardar"
  app.innerHTML = `<div class="shell">
    <aside class="rail">
      <div class="rail-top"><p class="wordmark">Archivo</p><button class="ghost" type="button" data-action="logout">Salir</button></div>
      <select class="section-select" aria-label="Sección">${SECTIONS.map(([id, name]) => `<option value="${id}" ${id === section ? "selected" : ""}>${name}</option>`).join("")}</select>
      <nav class="nav-list" aria-label="Secciones">${SECTIONS.map(([id, name]) => `<button type="button" data-action="go" data-section="${id}" ${id === section ? 'aria-current="page"' : ""}>${name}</button>`).join("")}</nav>
    </aside>
    <main class="workspace">
      <h1>${label}</h1>
      <p class="lede">Textos, enlaces y fotografías de esta sección. La maqueta del sitio no se edita aquí.</p>
      <p class="alert" role="alert">${esc(error)}</p>
      ${sectionBody()}
    </main>
    <div class="savebar">
      <p>El sitio en este equipo se actualiza al recargar. GoDaddy cambia cuando se publica la exportación.</p>
      <button class="save ${saveState === "saved" ? "is-saved" : ""}" type="button" data-action="save" ${saveState === "saving" ? "disabled" : ""}>${saveLabel}</button>
    </div>
  </div>`
  applyFilter()
}

function applyFilter() {
  const query = filter.trim().toLowerCase()
  const records = [...app.querySelectorAll(".record")]
  let visible = 0
  records.forEach((item) => {
    const matches = !query || (item.dataset.title || "").toLowerCase().includes(query)
    item.hidden = !matches
    if (matches) visible += 1
  })
  const note = app.querySelector("[data-filter-empty]")
  if (note) note.hidden = !query || visible > 0
}

function onInput(event) {
  const target = event.target
  if (target.classList.contains("search")) {
    filter = target.value
    applyFilter()
    return
  }
  if (!target.dataset.path) return
  writeField(target)
  dirty = true
  error = ""
  if (saveState === "saved") {
    saveState = "idle"
    const button = document.querySelector("[data-action='save']")
    if (button) {
      button.textContent = "Guardar"
      button.classList.remove("is-saved")
    }
  }
}

function writeField(target) {
  if (target.dataset.kind === "bool") setPath(doc, target.dataset.path, target.checked)
  else if (target.dataset.kind === "lines") {
    setPath(doc, target.dataset.path, target.value.split("\n").map((line) => line.trim()).filter(Boolean))
  } else if (target.dataset.kind === "number") {
    setPath(doc, target.dataset.path, target.value === "" ? "" : Number(target.value))
  } else setPath(doc, target.dataset.path, target.value)
}

function flush() {
  app.querySelectorAll("[data-path]").forEach(writeField)
}

function blank(listKey) {
  if (listKey === "press") {
    return { slug: uniqueId(doc.press, "slug", "nueva-nota"), media: "Medio", title: "Nueva nota", date: "", url: "https://ejemplo.com" }
  }
  if (listKey === "publications") {
    return {
      slug: uniqueId(doc.publications, "slug", "nueva-publicacion"),
      title: "Nueva publicación",
      description: "Descripción.",
      year: "2026",
      datePublished: "2026",
      buyUrl: "https://ejemplo.com",
      authors: ["Alejandro Linares"],
      content: ["Texto."],
    }
  }
  if (listKey === "career") {
    return {
      id: uniqueId(doc.career, "id", "nuevo-hito"),
      year: "2026",
      title: "Nuevo hito",
      description: "Descripción.",
      category: "Cargos",
    }
  }
  if (listKey === "projects") {
    return {
      id: uniqueId(doc.projects, "id", "nuevo-proyecto"),
      source: "enlace-trece",
      category: "Tecnología",
      title: "Nuevo proyecto",
      description: "Descripción.",
      image: "/images/alejandro/alejandro-linares.webp",
      year: "TODO: validar contenido",
      url: "https://www.youtube.com/@AlejandroLinaresCamberos",
    }
  }
  return {
    id: uniqueId(doc.socialWork, "id", "nueva-actividad"),
    period: "2026",
    title: "Nueva actividad",
    place: "Lugar",
    summary: "Resumen.",
    sources: [{ label: "Fuente", href: "https://ejemplo.com" }],
  }
}

function onClick(event) {
  const action = event.target.closest("[data-action]")
  if (!action || action.disabled) return
  if (action.dataset.action === "save") {
    save()
    return
  }
  if (action.dataset.action === "logout") {
    logout()
    return
  }
  if (action.dataset.action === "go") {
    flush()
    section = action.dataset.section
    filter = ""
    render()
    return
  }
  const article = action.closest(".record")
  if (action.dataset.action === "upload") {
    uploadPath = action.dataset.upload
    fileInput.value = ""
    fileInput.click()
    return
  }
  if (action.dataset.action === "add") {
    flush()
    const listKey = action.dataset.list
    const item = blank(listKey)
    doc[listKey].unshift(item)
    openIds.add(item.id || item.slug)
    dirty = true
    render()
    return
  }
  if (!article) return
  const listKey = article.dataset.list
  const index = Number(article.dataset.index)
  const id = article.dataset.id
  if (action.dataset.action === "toggle") {
    if (openIds.has(id)) openIds.delete(id)
    else openIds.add(id)
    article.classList.toggle("is-open")
    return
  }
  flush()
  if (action.dataset.action === "remove-source") {
    doc[listKey][index].sources.splice(Number(action.dataset.source), 1)
  } else if (action.dataset.action === "add-source") {
    doc[listKey][index].sources.push({ label: "Fuente", href: "https://ejemplo.com" })
    openIds.add(id)
  } else if (action.dataset.action === "remove") {
    const title = doc[listKey][index].title || "este registro"
    if (!window.confirm(`¿Quitar «${title}»? El cambio se aplica al guardar.`)) return
    doc[listKey].splice(index, 1)
    openIds.delete(id)
  } else if (action.dataset.action === "up" && index > 0) {
    const [item] = doc[listKey].splice(index, 1)
    doc[listKey].splice(index - 1, 0, item)
  } else if (action.dataset.action === "down" && index < doc[listKey].length - 1) {
    const [item] = doc[listKey].splice(index, 1)
    doc[listKey].splice(index + 1, 0, item)
  } else return
  dirty = true
  render()
}

function clearEmptyMedia() {
  for (const item of doc.career) {
    if (!String(item.photo?.src ?? "").trim()) item.photo = null
  }
  for (const item of doc.socialWork) {
    if (!String(item.image?.src ?? "").trim()) delete item.image
  }
}

async function save() {
  flush()
  clearEmptyMedia()
  saveState = "saving"
  error = ""
  render()
  try {
    doc = await api("/api/content", { method: "PUT", body: JSON.stringify(doc) })
    dirty = false
    saveState = "saved"
    render()
    window.setTimeout(() => {
      if (saveState === "saved") {
        saveState = "idle"
        const button = document.querySelector("[data-action='save']")
        if (button) {
          button.textContent = "Guardar"
          button.classList.remove("is-saved")
        }
      }
    }, 1600)
  } catch (reason) {
    saveState = "idle"
    error = reason.message
    render()
  }
}

async function logout() {
  if (dirty && !window.confirm("Hay cambios sin guardar. ¿Salir de todas formas?")) return
  await api("/api/logout", { method: "POST", body: "{}" })
  doc = null
  dirty = false
  renderLogin()
}

fileInput.addEventListener("change", async () => {
  const file = fileInput.files?.[0]
  if (!file || !uploadPath) return
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error("No se pudo leer la imagen."))
    reader.readAsDataURL(file)
  })
  try {
    const result = await api("/api/upload", {
      method: "POST",
      body: JSON.stringify({ name: file.name, dataUrl }),
    })
    setPath(doc, uploadPath, result.path)
    dirty = true
    const input = app.querySelector(`[data-path="${CSS.escape(uploadPath)}"]`)
    if (input) input.value = result.path
    if (uploadPath.endsWith(".src")) {
      const image = new Image()
      image.onload = () => {
        const widthPath = uploadPath.replace(/\.src$/, ".width")
        const heightPath = uploadPath.replace(/\.src$/, ".height")
        setPath(doc, widthPath, image.naturalWidth)
        setPath(doc, heightPath, image.naturalHeight)
        const width = app.querySelector(`[data-path="${CSS.escape(widthPath)}"]`)
        const height = app.querySelector(`[data-path="${CSS.escape(heightPath)}"]`)
        if (width) width.value = image.naturalWidth
        if (height) height.value = image.naturalHeight
      }
      image.src = result.path
    }
    const holder = input?.closest(".field")
    if (holder) {
      let preview = holder.querySelector(".preview")
      if (!preview) {
        preview = document.createElement("img")
        preview.className = "preview"
        preview.alt = ""
        holder.append(preview)
      }
      preview.src = result.path
    }
  } catch (reason) {
    error = reason.message
    const alert = app.querySelector(".alert")
    if (alert) alert.textContent = error
  }
})

app.addEventListener("input", onInput)
app.addEventListener("click", onClick)
app.addEventListener("change", (event) => {
  if (!event.target.classList.contains("section-select")) return
  flush()
  section = event.target.value
  filter = ""
  render()
})

window.addEventListener("beforeunload", (event) => {
  if (!dirty) return
  event.preventDefault()
  event.returnValue = ""
})

async function boot() {
  app.innerHTML = `<p class="loading">Abriendo el archivo…</p>`
  doc = await api("/api/content")
  render()
}

api("/api/session")
  .then((session) => (session.ok ? boot() : renderLogin()))
  .catch(() => renderLogin("No se pudo abrir el panel."))
