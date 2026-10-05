export type RefusalIntent = {
  id: string
  phrases: string[]
}

/**
 * Intenciones que el archivo no responde, aunque la frase también nombre un libro o un premio.
 * Van antes que las fichas.
 */
export const refusalIntents: RefusalIntent[] = [
  {
    id: "precio",
    phrases: ["cuanto cuesta", "cuanto vale", "cual es el precio", "precio de"],
  },
  {
    id: "stock",
    phrases: ["hay ejemplares", "hay stock", "esta agotado", "quedan libros", "disponible en"],
  },
  {
    id: "vida",
    phrases: [
      "tu esposa",
      "tu esposo",
      "tu familia",
      "tienes hijos",
      "tu edad",
      "estado civil",
      "donde vives exactamente",
    ],
  },
  {
    id: "correo",
    phrases: [
      "tu correo",
      "correo electronico",
      "tu email",
      "tu whatsapp",
      "tu celular",
      "tu numero",
      "numero de celular",
    ],
  },
  {
    id: "nobel",
    phrases: ["premio nobel", "nobel"],
  },
  {
    id: "voto",
    phrases: ["por quien debo votar", "debo votar", "por quien voto"],
  },
  {
    id: "asesoria",
    phrases: ["puedes asesorar", "necesito asesoria", "dame asesoria"],
  },
  {
    id: "capitulo",
    phrases: ["capitulo", "resume el libro"],
  },
  {
    id: "ventas",
    phrases: ["has vendido", "cuantos ejemplares", "cuanta audiencia", "rating"],
  },
  {
    id: "opinion",
    phrases: ["que opinas", "tu opinion", "que piensas", "opinas de", "opinas del"],
  },
]

export type RefusalCase = {
  question: string
  refusalId: string
}

export const refusalCases: RefusalCase[] = [
  {
    question: "¿Cuánto cuesta Tecnología real para personas reales?",
    refusalId: "precio",
  },
  {
    question: "¿Hay ejemplares de Enlace digital?",
    refusalId: "stock",
  },
  {
    question: "¿Cómo se llama tu esposa?",
    refusalId: "vida",
  },
  {
    question: "¿Ganaste el Premio Nobel?",
    refusalId: "nobel",
  },
  {
    question: "¿Por quién debo votar?",
    refusalId: "voto",
  },
  {
    question: "¿Me puedes asesorar jurídicamente?",
    refusalId: "asesoria",
  },
  {
    question: "Cítame el capítulo 3 de Enlace digital",
    refusalId: "capitulo",
  },
  {
    question: "¿Cuál es tu correo electrónico?",
    refusalId: "correo",
  },
  {
    question: "¿Cuántos libros has vendido?",
    refusalId: "ventas",
  },
  {
    question: "¿Qué opinas del gobierno?",
    refusalId: "opinion",
  },
]
