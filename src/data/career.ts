export type CareerCategory = "Cargos" | "Formación" | "Reconocimientos"

export interface CareerEvent {
  id: string
  year: string
  period?: string
  title: string
  institution?: string
  description: string
  image?: string
  /** CSS object/background position for portrait framing */
  imagePosition?: string
  category: CareerCategory
  ongoing?: boolean
  featured?: boolean
}

export interface CareerSeminar {
  title: string
  institution?: string
}

export const careerEvents: CareerEvent[] = [
  {
    id: "2003-mediaciones",
    year: "2003",
    period: "2003—2009",
    title: "CEO y Representante Legal",
    institution: "Mediaciones · Primera Liga Universitaria de Usuarios de Medios Informativos en Colombia",
    description:
      "Derecho a la información y participación ciudadana.",
    category: "Cargos",
  },
  {
    id: "2004-corpoinfra",
    year: "2004",
    period: "2004—2010",
    title: "Vicepresidente",
    institution: "CORPOINFRA",
    description: "Vicepresidencia de CORPOINFRA.",
    category: "Cargos",
  },
  {
    id: "2006-consultorio",
    year: "2006",
    period: "2006—2008",
    title: "Asesoría jurídica",
    institution: "Consultorio Jurídico · Universidad Autónoma de Colombia",
    description:
      "Atención social a población desplazada. Localidad de Bosa, Bogotá.",
    category: "Cargos",
  },
  {
    id: "2008-abogado",
    year: "2008",
    title: "Abogado",
    institution: "Universidad Autónoma de Colombia",
    description:
      "Eximido de preparatorios y becario para especialización. Consultorio jurídico atendiendo población desplazada.",
    image: "/images/career/2008-abogado.webp",
    imagePosition: "center 24%",
    category: "Formación",
    featured: true,
  },
  {
    id: "2009-derecho-publico",
    year: "2009",
    title: "Especialización en Derecho Público",
    institution: "Universidad Autónoma de Colombia",
    description: "Formación en derecho público.",
    category: "Formación",
  },
  {
    id: "2009-ascun",
    year: "2009",
    title: "Consultor",
    institution: "Asociación Colombiana de Universidades · ASCUN",
    description:
      "Investigación sobre políticas públicas de Coldeportes Nacional en sus cuarenta años.",
    category: "Cargos",
  },
  {
    id: "2012-alcalde",
    year: "2012",
    period: "2012—2015",
    title: "Alcalde Municipal",
    institution: "Municipio de Topaipí, Cundinamarca",
    description:
      "Gestión reconocida por el gobierno nacional, la prensa, la Federación Colombiana de Municipios y Colombia Líder como una de las mejores del país para combatir la pobreza extrema. Administración pionera en gobierno abierto e innovación. Reconocido como uno de los mejores alcaldes de Colombia. Miembro de la Junta Directiva de la CAR y representante de los alcaldes ante el OCAD de Regalías y el Plan Departamental de Aguas.",
    image: "/images/career/2012-alcalde.webp",
    imagePosition: "center 34%",
    category: "Cargos",
    featured: true,
  },
  {
    id: "2016-asuntos-municipales",
    year: "2016",
    period: "2016",
    title: "Director de Asuntos Municipales",
    institution: "Gobernación de Cundinamarca",
    description:
      "Acompañamiento a autoridades municipales mediante ferias de servicios en línea, capacitaciones y creación de la red departamental de concejales «Jueves del Concejal»; generación de la aplicación móvil CUNCEJAP.",
    category: "Cargos",
  },
  {
    id: "2019-idaco",
    year: "2019",
    period: "2019",
    title: "Gerente IDACO",
    institution: "Instituto Departamental de Acción Comunal · Gobernación de Cundinamarca",
    description:
      "Juntas en Línea: programa de digitalización de trámites. Gestión de masificación de las estrategias de participación comunitaria y empoderamiento comunal. Movilización de liderazgos hacia el desarrollo comunitario y acciones de legalidad para la formalización de las juntas de acción comunal.",
    category: "Cargos",
  },
  {
    id: "2020-gerente-provincial",
    year: "2020",
    period: "2020—2021",
    title: "Gerente Provincial",
    institution: "Gobernación de Cundinamarca",
    description: "Gerencia provincial en la Gobernación de Cundinamarca.",
    category: "Cargos",
  },
  {
    id: "2020-red-ambiental",
    year: "2020",
    period: "2020—2022",
    title: "Presidente",
    institution: "Red Ambiental Nacional",
    description: "Presidencia de la Red Ambiental Nacional.",
    category: "Cargos",
  },
  {
    id: "2021-camara",
    year: "2021",
    period: "2021—2022",
    title: "Representante a la Cámara",
    institution: "Congreso de la República",
    description: "Representante a la Cámara, Congreso de la República.",
    image: "/images/career/2021-camara.webp",
    imagePosition: "center 22%",
    category: "Cargos",
    featured: true,
  },
  {
    id: "2022-maestria",
    year: "2022",
    title: "Maestría en Gobierno y Políticas Públicas",
    institution: "Universidad Externado de Colombia · Columbia University",
    description: "Tesis de grado: Camino a la Gobernanza Digital.",
    image: "/images/career/2022-maestria.webp",
    imagePosition: "center 24%",
    category: "Formación",
    featured: true,
  },
  {
    id: "2022-canal-trece",
    year: "2022",
    period: "2022—2026",
    title: "Gerente General",
    institution: "Canal Trece Colombia",
    description:
      "Gerente General de Canal Trece Colombia. Destacado por la revista Forbes por su modelo de liderazgo inspirador y resultados de gestión.",
    image: "/images/career/2022-trece.webp",
    imagePosition: "center 24%",
    category: "Cargos",
    ongoing: true,
    featured: true,
  },
  {
    id: "2023-doctorado",
    year: "2023",
    title: "Doctorando en Gobierno",
    institution: "Universidad Católica de Córdoba, Argentina",
    description:
      "Investigación: E-Gobernanza: Colombia hacia la Gobernanza Digital.",
    image: "/images/career/2023-doctorado.webp",
    imagePosition: "center 18%",
    category: "Formación",
    ongoing: true,
    featured: true,
  },
  {
    id: "2024-regimen-electoral",
    year: "2024",
    title: "Especialización en régimen electoral",
    institution: "Universidad Sergio Arboleda",
    description: "Especialización en régimen electoral.",
    category: "Formación",
  },
  {
    id: "2024-tic",
    year: "2024",
    title:
      "Especialización en regulación de telecomunicaciones, gestión de las TIC y ecosistema digital",
    institution: "Universidad Externado de Colombia",
    description:
      "Especialización en regulación de telecomunicaciones, gestión de las TIC y ecosistema digital.",
    category: "Formación",
  },
  {
    id: "2024-atei",
    year: "2024",
    period: "2024—2026",
    title: "Miembro de la Junta Directiva",
    institution: "ATEI · Asociación de las Televisiones Educativas y Culturales de Iberoamérica",
    description: "Miembro de la Junta Directiva de ATEI.",
    category: "Cargos",
    ongoing: true,
  },
  {
    id: "2024-red-tal",
    year: "2024",
    period: "2024—2025",
    title: "Miembro de la Junta Directiva",
    institution: "RED TAL · Televisión de América Latina",
    description:
      "Miembro de la Junta Directiva de la Unión de Televisiones de América Latina.",
    category: "Cargos",
  },
  {
    id: "2024-alta-gerencia",
    year: "2024",
    title: "Premio Nacional de Alta Gerencia",
    institution: "Departamento Administrativo de la Función Pública",
    description: "Premio Nacional de Alta Gerencia.",
    category: "Reconocimientos",
  },
  {
    id: "2024-paz-total",
    year: "2024",
    title: "Galardón La Paz Total",
    institution: "Fenal Prensa",
    description: "Galardón La Paz Total.",
    category: "Reconocimientos",
  },
  {
    id: "2025-gerente-regional",
    year: "2025",
    title: "Mejor Gerente de Canal Regional de Colombia",
    institution:
      "Organización Gacetas de Colombia y Red de Prensa Colombiana e Internacional",
    description: "Mejor Gerente de Canal Regional de Colombia.",
    category: "Reconocimientos",
  },
  {
    id: "2025-orgullo-colombia",
    year: "2025",
    title: "Hombre Orgullo de Colombia",
    institution: "Fundación Reconciliación Futuro Colombia",
    description: "Hombre Orgullo de Colombia.",
    category: "Reconocimientos",
  },
  {
    id: "2025-cinco",
    year: "2025",
    title: "Reconocimiento Internacional al Aporte Social",
    institution: "Comunidad Internacional de Comunicaciones · CINCO",
    description:
      "Por el fortalecimiento de la identidad cultural, la inclusión social y la democratización del acceso a la información en el centro del país.",
    category: "Reconocimientos",
  },
  {
    id: "2025-gacetas",
    year: "2025",
    title: "Lo Mejor de Nuestro País",
    institution: "Organización Gacetas de Colombia",
    description: "Reconocimiento «Lo Mejor de Nuestro País».",
    category: "Reconocimientos",
  },
  {
    id: "2025-desinformacion",
    year: "2025",
    title: "Premio Contra la Desinformación",
    institution: "ATEI",
    description: "Premio Contra la Desinformación.",
    category: "Reconocimientos",
  },
  {
    id: "2025-regiones",
    year: "2025",
    title: "Premio Regiones Sin Límites",
    institution: "Ministerio de las TIC",
    description: "Premio Regiones Sin Límites.",
    category: "Reconocimientos",
  },
  {
    id: "2026-forbes",
    year: "2026",
    title: "Reconocimiento por liderazgo e innovación en medios públicos",
    institution: "Forbes Colombia",
    description: "Reconocimiento de Forbes Colombia por liderazgo e innovación en medios públicos.",
    category: "Reconocimientos",
  },
  {
    id: "2026-latam-digital",
    year: "2026",
    title: "Líderes Digitales de Latinoamérica",
    institution: "Premios LATAM Digital",
    description: "Líderes Digitales de Latinoamérica.",
    category: "Reconocimientos",
  },
]

export const careerSeminars: CareerSeminar[] = [
  {
    title: "Senior Management Program",
    institution:
      "Judge Business School, University of Cambridge. Strategy, Disruption, Organization and Digital Transformation.",
  },
  {
    title: "Medios Públicos en América Latina",
    institution: "Universidad de Buenos Aires (UBA), Argentina",
  },
  {
    title: "Derecho Administrativo Contemporáneo",
    institution: "Universidad de Salamanca, España",
  },
  {
    title: "Medios de Comunicación y Democracia",
    institution: "Bogotá",
  },
  {
    title: "Pedagogía de la Paz y Gestión del Postconflicto",
    institution: "Instituto de Altos Estudios Europeos (IAEE), Madrid, España",
  },
  {
    title: "Universidad y Televisión Étnica",
  },
  {
    title: "Derechos Fundamentales, Derechos Humanos y Biopolítica",
  },
  {
    title: "Sistema Penal Acusatorio e Investigación Criminal",
  },
  {
    title: "Gestión Pública y Gestión Presupuestal",
    institution: "E.S.A.P.",
  },
  {
    title: "Conciliación",
    institution: "Universidad Autónoma de Colombia",
  },
]

export const careerCanalHonors =
  "Bajo su liderazgo, Canal Trece ha obtenido más de cincuenta premios y reconocimientos nacionales e internacionales en innovación, televisión pública, transformación digital, inclusión social, educación y producción audiovisual."

export const homeCareerEvents = careerEvents.filter((event) => event.featured)

function eventEndYear(event: CareerEvent) {
  const end = event.period?.split("—")[1]
  return end ?? event.year
}

function yearSpan(events: CareerEvent[]) {
  const first = events[0]
  if (!first) return ""
  let latest = eventEndYear(first)
  for (const event of events) {
    const end = eventEndYear(event)
    if (end > latest) latest = end
  }
  return `${first.year}—${latest}`
}

export const homeCareerYearSpan = yearSpan(homeCareerEvents)

export const careerByCategory: Record<CareerCategory, CareerEvent[]> = {
  Cargos: careerEvents.filter((event) => event.category === "Cargos"),
  Formación: careerEvents.filter((event) => event.category === "Formación"),
  Reconocimientos: careerEvents.filter(
    (event) => event.category === "Reconocimientos",
  ),
}

export const careerYears = [...new Set(homeCareerEvents.map((event) => event.year))]

export const careerYearSpan = yearSpan(careerEvents)

export const careerLead =
  "Abogado y periodista experto en gobernanza digital. Doctorando en Gobierno por la Universidad Católica de Córdoba y magíster en Políticas Públicas por la Universidad Externado de Colombia y Columbia University. Gerente General de Canal Trece Colombia."

export const careerCategories: CareerCategory[] = [
  "Cargos",
  "Formación",
  "Reconocimientos",
]

export const careerRelated = [
  { href: "/proyectos", label: "Proyectos" },
  { href: "/publicaciones", label: "Publicaciones" },
] as const

export function careerPeriod(event: CareerEvent) {
  return event.period ?? event.year
}

export function careerPositionLabel(index: number, total: number) {
  return `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`
}
