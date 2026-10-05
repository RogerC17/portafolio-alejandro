import type { CareerEvent } from "@/data/career"

/**
 * Retrato de escenario: alto máximo 2400 px (pantalla Full HD a 2×).
 * El componente lo ajusta al alto de la ventana sin recortar el rostro.
 */
export type CareerFrame = {
  src: string
  width: number
  height: number
}

const stage = {
  hero: { src: "/images/career/stage/hero.webp", width: 1800, height: 2400 },
  linares: { src: "/images/career/stage/linares.webp", width: 1600, height: 2200 },
  abogado: { src: "/images/career/stage/abogado.webp", width: 1600, height: 2240 },
  alcalde: { src: "/images/career/stage/alcalde.webp", width: 1600, height: 2240 },
  camara: { src: "/images/career/stage/camara.webp", width: 1600, height: 2240 },
  maestria: { src: "/images/career/stage/maestria.webp", width: 1600, height: 2240 },
  trece: { src: "/images/career/stage/trece.webp", width: 1600, height: 2240 },
  medios: { src: "/images/career/stage/medios.webp", width: 1800, height: 1400 },
  liderazgo: { src: "/images/career/stage/liderazgo.webp", width: 1800, height: 1400 },
  forbes: { src: "/images/career/stage/forbes.webp", width: 1600, height: 1200 },
} as const satisfies Record<string, CareerFrame>

export const heroFrame: CareerFrame = stage.hero

const framesByEvent: Record<string, CareerFrame> = {
  "2003-mediaciones": stage.linares,
  "2004-corpoinfra": stage.alcalde,
  "2006-consultorio": stage.abogado,
  "2009-ascun": stage.maestria,
  "2012-alcalde": stage.alcalde,
  "2016-asuntos-municipales": stage.linares,
  "2019-idaco": stage.alcalde,
  "2020-gerente-provincial": stage.camara,
  "2020-red-ambiental": stage.linares,
  "2021-camara": stage.camara,
  "2022-canal-trece": stage.trece,
  "2024-atei": stage.medios,
  "2024-red-tal": stage.trece,

  "2008-abogado": stage.abogado,
  "2009-derecho-publico": stage.abogado,
  "2022-maestria": stage.maestria,
  "2023-doctorado": stage.hero,
  "2024-regimen-electoral": stage.maestria,
  "2024-tic": stage.hero,

  "2024-alta-gerencia": stage.hero,
  "2024-paz-total": stage.linares,
  "2025-gerente-regional": stage.trece,
  "2025-orgullo-colombia": stage.alcalde,
  "2025-cinco": stage.camara,
  "2025-gacetas": stage.medios,
  "2025-desinformacion": stage.liderazgo,
  "2025-regiones": stage.linares,
  "2026-forbes": stage.forbes,
  "2026-latam-digital": stage.medios,
}

export function frameForEvent(event: CareerEvent): CareerFrame {
  return framesByEvent[event.id] ?? stage.linares
}
