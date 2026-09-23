export interface FocusArea {
  id: string
  index: string
  title: string
  lead: string
  image: string
  alt: string
  register: string
  objectPosition: string
}

export const focusAreas: FocusArea[] = [
  {
    id: "eje-gobernanza",
    index: "01",
    title: "Gobernanza digital",
    lead: "Políticas públicas, transformación del Estado, regulación y ciudadanía.",
    image: "/images/alejandro/alejandro-linares.webp",
    alt: "Alejandro Linares",
    register: "Políticas públicas",
    objectPosition: "center 4%",
  },
  {
    id: "eje-liderazgo",
    index: "02",
    title: "Liderazgo",
    lead: "Gestión, equipos, dirección y transformación organizacional.",
    image: "/images/focus/liderazgo.webp",
    alt: "Alejandro Linares en las oficinas de Canal Trece",
    register: "Canal Trece",
    objectPosition: "center 12%",
  },
  {
    id: "eje-medios",
    index: "03",
    title: "Medios",
    lead: "Televisión pública, contenidos y comunicación.",
    image: "/images/focus/medios.webp",
    alt: "Alejandro Linares con chaqueta de Canal Trece",
    register: "Canal Trece · Contenidos",
    objectPosition: "42% 12%",
  },
  {
    id: "eje-tecnologia",
    index: "04",
    title: "Tecnología",
    lead: "IA, innovación, ciberseguridad y educación.",
    image: "/images/focus/tecnologia.webp",
    alt: "Alejandro Linares en una conversación en las oficinas de Google",
    register: "Especiales Enlace Trece",
    objectPosition: "center 28%",
  },
]
