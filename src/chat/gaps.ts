import type { DossierGap } from "@/chat/types"

/** Temas que el archivo no puede responder. Si aparecen, se usa la negativa. */
export const dossierGaps: DossierGap[] = [
  {
    id: "libros-capitulos",
    topic: "libros",
    missing:
      "Capítulos, índice y citas internas de los tres libros. Solo existe la ficha pública de cada título.",
  },
  {
    id: "libros-precio-stock",
    topic: "libros",
    missing:
      "Precio, stock, disponibilidad y puntos de venta distintos del enlace de compra registrado.",
  },
  {
    id: "libros-editorial-liderazgo",
    topic: "libros",
    missing:
      "La editorial de Las dos caras del liderazgo no está registrada en el archivo.",
  },
  {
    id: "biografia-no-archivada",
    topic: "identidad",
    missing:
      "Cualquier cargo, fecha, premio o estudio que no tenga ficha en trayectoria o formación.",
  },
  {
    id: "vida-personal",
    topic: "identidad",
    missing: "Familia, estado civil, edad, domicilio y teléfono personal.",
  },
  {
    id: "correo",
    topic: "contacto",
    missing:
      "Correo, WhatsApp y celular. El contacto del archivo son las redes listadas, no un formulario.",
  },
  {
    id: "opiniones",
    topic: "voz",
    missing:
      "Opinión electoral, asesoría jurídica y cualquier postura que no esté escrita como frase o hecho del archivo.",
  },
  {
    id: "prensa-cuerpo",
    topic: "prensa",
    missing: "El cuerpo de las notas. Cada ficha trae medio, titular, fecha y enlace.",
  },
  {
    id: "proyectos-anio",
    topic: "proyectos",
    missing:
      "El año de cada video. En el archivo está pendiente de validar, así que no se afirma.",
  },
  {
    id: "cifras-no-escritas",
    topic: "gestion",
    missing:
      "Ventas, audiencia, rating y cualquier métrica que no aparezca ya escrita en un hecho.",
  },
]
