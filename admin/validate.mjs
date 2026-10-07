const SOCIAL_IDS = ["linkedin", "x", "instagram", "youtube", "facebook", "tiktok"]
const FOCUS_IDS = ["eje-gobernanza", "eje-liderazgo", "eje-medios", "eje-tecnologia"]
const CAREER_CATEGORIES = new Set(["Cargos", "Formación", "Reconocimientos"])
const PROJECT_SOURCES = new Set(["enlace-trece", "soyalejo"])
const LAYOUTS = new Set(["portrait", "poster", "wide", "split"])

function fail(message) {
  const error = new Error(message)
  error.status = 400
  throw error
}

function text(value, label, max = 500) {
  if (typeof value !== "string") fail(`${label} debe ser texto.`)
  const trimmed = value.trim()
  if (!trimmed) fail(`${label} es obligatorio.`)
  if (trimmed.length > max) fail(`${label} supera ${max} caracteres.`)
  return trimmed
}

function optionalText(value, label, max = 500) {
  if (value == null || value === "") return undefined
  return text(value, label, max)
}

function httpUrl(value, label, required = true) {
  const raw = required ? text(value, label, 500) : optionalText(value, label, 500)
  if (!raw) return undefined
  let url
  try {
    url = new URL(raw)
  } catch {
    fail(`${label} no es un enlace válido.`)
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    fail(`${label} debe empezar por http o https.`)
  }
  return raw
}

function localImage(value, label, required = false) {
  const raw = required ? text(value, label, 300) : optionalText(value, label, 300)
  if (!raw) return undefined
  if (!raw.startsWith("/images/") || raw.includes("..") || raw.includes("\\")) {
    fail(`${label} debe ser una ruta dentro de /images/.`)
  }
  return raw
}

function siteHref(value, label) {
  const raw = text(value, label, 500)
  if (raw.startsWith("/") && !raw.startsWith("//") && !raw.includes("..") && !raw.includes("\\")) {
    return raw
  }
  return httpUrl(raw, label)
}

function mediaRef(value, label) {
  const raw = text(value, label, 500)
  if (raw.startsWith("/images/") && !raw.includes("..") && !raw.includes("\\")) return raw
  return httpUrl(raw, label)
}

function idOf(value, label) {
  const raw = text(value, label, 80)
  if (!/^[A-Za-z0-9_-]{1,80}$/.test(raw)) {
    fail(`${label} solo admite letras, números, guiones y guion bajo.`)
  }
  return raw
}

function unique(items, key, label) {
  const seen = new Set()
  for (const item of items) {
    if (seen.has(item[key])) fail(`Hay dos ${label} con el mismo identificador: ${item[key]}.`)
    seen.add(item[key])
  }
}

function lines(value, label, { min = 1, maxItems = 12, maxLen = 2000 } = {}) {
  if (!Array.isArray(value)) fail(`${label} debe ser una lista.`)
  const next = value.map((line, index) => text(line, `${label} ${index + 1}`, maxLen))
  if (next.length < min) fail(`${label} necesita al menos ${min}.`)
  if (next.length > maxItems) fail(`${label} admite hasta ${maxItems}.`)
  return next
}

function flag(value) {
  return value === true
}

function positiveInt(value, label) {
  const number = typeof value === "number" ? value : Number(value)
  if (!Number.isInteger(number) || number < 1 || number > 8000) {
    fail(`${label} debe ser un número entero entre 1 y 8000.`)
  }
  return number
}

function list(value, label, max) {
  if (!Array.isArray(value)) fail(`${label} debe ser una lista.`)
  if (value.length > max) fail(`${label} admite hasta ${max} registros.`)
  return value
}

export function validateContent(input, current) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    fail("El contenido no tiene el formato esperado.")
  }

  const site = input.site ?? {}
  const home = input.home ?? {}
  const contact = input.contact ?? {}

  const document = {
    site: {
      name: text(site.name, "El nombre", 80),
      title: text(site.title, "El título del sitio", 140),
      description: text(site.description, "La descripción", 300),
      location: text(site.location, "El lugar", 80),
      statement: text(site.statement, "La frase", 180),
      role: text(site.role, "El rol", 160),
    },
    home: {
      heroLead: text(home.heroLead, "El texto de portada", 400),
      manifestoLines: lines(home.manifestoLines, "Las líneas del manifiesto", {
        min: 2,
        maxItems: 2,
        maxLen: 160,
      }),
      manifestoSupport: text(home.manifestoSupport, "El apoyo del manifiesto", 800),
    },
    contact: {
      lead: text(contact.lead, "La entrada de contacto", 240),
      quote: text(contact.quote, "La cita de contacto", 240),
      title: text(contact.title, "El título de contacto", 120),
      ctaLabel: text(contact.ctaLabel, "El botón de contacto", 40),
    },
    social: SOCIAL_IDS.map((id) => {
      const row = (input.social ?? []).find((item) => item?.id === id)
      const prev = (current.social ?? []).find((item) => item?.id === id)
      if (!row || !prev) fail("Las redes deben seguir siendo las seis que ya existen.")
      return {
        id,
        label: text(row.label, `El nombre de ${id}`, 40),
        href: httpUrl(row.href, `El enlace de ${id}`),
      }
    }),
    focus: FOCUS_IDS.map((id) => {
      const row = (input.focus ?? []).find((item) => item?.id === id)
      const prev = (current.focus ?? []).find((item) => item?.id === id)
      if (!row || !prev) fail("Las áreas deben seguir siendo las cuatro que ya existen.")
      return {
        ...prev,
        id,
        title: text(row.title, `El título de ${id}`, 80),
        lead: text(row.lead, `El texto de ${id}`, 240),
        register: text(row.register, `El registro de ${id}`, 80),
        alt: text(row.alt, `El texto alterno de ${id}`, 180),
      }
    }),
    pressLead: text(input.pressLead, "La entrada de prensa", 240),
    press: list(input.press, "Prensa", 80).map((item, index) => {
      const label = `La nota ${index + 1}`
      const row = {
        slug: idOf(item?.slug, `${label}: identificador`).toLowerCase(),
        media: text(item?.media, `${label}: medio`, 80),
        title: text(item?.title, `${label}: título`, 220),
        url: httpUrl(item?.url, `${label}: enlace`),
      }
      const date = optionalText(item?.date, `${label}: fecha`, 80)
      if (date) row.date = date
      const dateIso = optionalText(item?.dateIso, `${label}: fecha ISO`, 10)
      if (dateIso && !/^\d{4}-\d{2}-\d{2}$/.test(dateIso)) {
        fail(`${label}: la fecha ISO usa el formato AAAA-MM-DD.`)
      }
      if (dateIso) row.dateIso = dateIso
      const image = localImage(item?.image, `${label}: imagen`)
      if (image) row.image = image
      return row
    }),
    publicationsLead: text(input.publicationsLead, "La entrada de publicaciones", 240),
    publications: list(input.publications, "Publicaciones", 12).map((item, index) => {
      const label = `La publicación ${index + 1}`
      const slug = idOf(item?.slug, `${label}: identificador`).toLowerCase()
      const prev = (current.publications ?? []).find((row) => row.slug === slug)
      const row = {
        slug,
        title: text(item?.title, `${label}: título`, 160),
        description: text(item?.description, `${label}: descripción`, 400),
        year: text(item?.year, `${label}: año`, 12),
        datePublished: text(item?.datePublished, `${label}: fecha`, 20),
        buyUrl: httpUrl(item?.buyUrl, `${label}: enlace de compra`),
        authors: lines(item?.authors, `${label}: autores`, { min: 1, maxItems: 6, maxLen: 120 }),
        content: lines(item?.content, `${label}: contenido`, { min: 1, maxItems: 8, maxLen: 400 }),
      }
      const spineTitle = optionalText(item?.spineTitle, `${label}: lomo`, 80) ?? prev?.spineTitle
      const cover = localImage(item?.cover, `${label}: portada`) ?? prev?.cover
      const coverBack = localImage(item?.coverBack, `${label}: contraportada`) ?? prev?.coverBack
      const coverSpine = localImage(item?.coverSpine, `${label}: lomo gráfico`) ?? prev?.coverSpine
      const url = httpUrl(item?.url, `${label}: nota`, false) ?? prev?.url
      const publisher = optionalText(item?.publisher, `${label}: editorial`, 80) ?? prev?.publisher
      if (spineTitle) row.spineTitle = spineTitle
      if (cover) row.cover = cover
      if (coverBack) row.coverBack = coverBack
      if (coverSpine) row.coverSpine = coverSpine
      if (url) row.url = url
      if (publisher) row.publisher = publisher
      return row
    }),
    careerLead: text(input.careerLead, "La entrada de trayectoria", 500),
    career: list(input.career, "Trayectoria", 80).map((item, index) => {
      const label = `El hito ${index + 1}`
      const id = idOf(item?.id, `${label}: identificador`)
      const prev = (current.career ?? []).find((row) => row.id === id)
      if (!CAREER_CATEGORIES.has(item?.category)) {
        fail(`${label}: la categoría debe ser Cargos, Formación o Reconocimientos.`)
      }
      const row = {
        id,
        year: text(item?.year, `${label}: año`, 12),
        title: text(item?.title, `${label}: título`, 180),
        description: text(item?.description, `${label}: descripción`, 600),
        category: item.category,
      }
      const period = optionalText(item?.period, `${label}: periodo`, 40)
      const institution = optionalText(item?.institution, `${label}: institución`, 180)
      const image = localImage(item?.image, `${label}: imagen`)
      const imagePosition = optionalText(item?.imagePosition, `${label}: encuadre`, 40)
      if (period) row.period = period
      if (institution) row.institution = institution
      if (image) row.image = image
      if (imagePosition) row.imagePosition = imagePosition
      if (flag(item?.ongoing)) row.ongoing = true
      if (flag(item?.featured)) row.featured = true
      const photoSrc = String(item?.photo?.src ?? "").trim()
      if (photoSrc) {
        row.photo = {
          src: localImage(item.photo.src, `${label}: fotografía`, true),
          alt: text(item.photo.alt, `${label}: texto de la fotografía`, 300),
          caption: text(item.photo.caption, `${label}: pie de la fotografía`, 300),
          width: positiveInt(item.photo.width, `${label}: ancho`),
          height: positiveInt(item.photo.height, `${label}: alto`),
        }
        const position = optionalText(item.photo.position, `${label}: posición`, 40) ?? prev?.photo?.position
        if (position) row.photo.position = position
      } else if (prev?.photo && item?.photo !== null) {
        row.photo = prev.photo
      }
      return row
    }),
    projectsLead: text(input.projectsLead, "La entrada de proyectos", 400),
    projects: list(input.projects, "Proyectos", 120).map((item, index) => {
      const label = `El proyecto ${index + 1}`
      if (!PROJECT_SOURCES.has(item?.source)) {
        fail(`${label}: el origen debe ser enlace-trece o soyalejo.`)
      }
      const row = {
        id: idOf(item?.id, `${label}: identificador`),
        source: item.source,
        category: text(item?.category, `${label}: categoría`, 80),
        title: text(item?.title, `${label}: título`, 180),
        description: text(item?.description, `${label}: descripción`, 300),
        image: mediaRef(item?.image, `${label}: imagen`),
        year: text(item?.year, `${label}: año`, 40),
        url: httpUrl(item?.url, `${label}: enlace`),
      }
      if (flag(item?.featured)) row.featured = true
      return row
    }),
    socialWorkLead: text(input.socialWorkLead, "La entrada de labor social", 400),
    socialWork: list(input.socialWork, "Labor social", 40).map((item, index) => {
      const label = `La actividad ${index + 1}`
      const row = {
        id: idOf(item?.id, `${label}: identificador`),
        period: text(item?.period, `${label}: fecha`, 80),
        title: text(item?.title, `${label}: título`, 160),
        place: text(item?.place, `${label}: lugar`, 80),
        summary: text(item?.summary, `${label}: resumen`, 800),
        sources: list(item?.sources, `${label}: fuentes`, 6).map((source, sourceIndex) => ({
          label: text(source?.label, `${label}, fuente ${sourceIndex + 1}`, 80),
          href: siteHref(source?.href, `${label}, fuente ${sourceIndex + 1}`),
        })),
      }
      if (!row.sources.length) fail(`${label} necesita al menos una fuente.`)
      if (item?.image && typeof item.image === "object" && String(item.image.src ?? "").trim()) {
        if (!LAYOUTS.has(item.image.layout)) {
          fail(`${label}: el encuadre de la foto debe ser portrait, poster, wide o split.`)
        }
        row.image = {
          src: localImage(item.image.src, `${label}: fotografía`, true),
          width: positiveInt(item.image.width, `${label}: ancho`),
          height: positiveInt(item.image.height, `${label}: alto`),
          alt: text(item.image.alt, `${label}: texto de la fotografía`, 300),
          layout: item.image.layout,
        }
      }
      return row
    }),
  }

  unique(document.press, "slug", "notas")
  unique(document.publications, "slug", "publicaciones")
  unique(document.career, "id", "hitos")
  unique(document.projects, "id", "proyectos")
  unique(document.socialWork, "id", "actividades")
  return document
}
