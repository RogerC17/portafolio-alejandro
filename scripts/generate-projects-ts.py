"""Generate src/data/projects.ts from extracted YouTube archives."""

from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

PLAYLIST = json.loads(Path("scripts/youtube-archive.json").read_text(encoding="utf-8"))["playlist"]
CHANNEL = json.loads(Path("scripts/youtube-channel.json").read_text(encoding="utf-8"))["videos"]

FEATURED_IDS = [
    "LpmvsQHb5Zk",
    "qKzIO1F_NpU",
    "O1-67wFIgpk",
    "U6k3eUJ_TIc",
]
TRECE_IDS = FEATURED_IDS + [
    "icA4gJdNAKY",
    "VEeSECwkxNo",
    "lYXwa-6uYnc",
    "1rrVwOOh7SE",
    "lDxsOJUb2H4",
    "pRSwkNVT97c",
    "Zq6v2NIgEt8",
    "Fiatpoz0bqM",
    "5SS4JiYYdww",
    "HTWKNsGl6qg",
    "NL6Dh9BdChA",
    "36BIsP7nPH0",
    "V0XQi2HVlF0",
    "G9sNFBgGX34",
    "qHdP8F3OpkM",
    "Sf0QRDhVR9g",
    "mLOlbYGPupM",
    "PwMLh2swZjg",
]


def nfc(value: str) -> str:
    return unicodedata.normalize("NFC", value).strip()


PREFIX = re.compile(
    r"^(?:Especiales(?: Enlace Trece)?(?: Jhon)? Alejandro Linares|Especiales Enlace Trece)\s*\|\s*",
    re.IGNORECASE,
)


def display_title(raw: str) -> str:
    return PREFIX.sub("", nfc(raw)).strip()


def folded(value: str) -> str:
    decomposed = unicodedata.normalize("NFD", value)
    return "".join(ch for ch in decomposed if unicodedata.category(ch) != "Mn").lower()


def category_for(title: str) -> str:
    t = folded(title)
    if re.search(
        r"ciber|privacidad|tiktok|estafa|policia|denuncia|whatsapp",
        t,
    ):
        return "Ciberseguridad"
    if re.search(
        r"inteligencia artificial|\bia\b|\bai\b|#ia",
        t,
    ):
        return "Inteligencia artificial"
    if re.search(r"democracia|elecciones|\bmoe\b", t):
        return "Democracia"
    if re.search(
        r"desinformacion|educomunicacion|alfabetizacion|criterio digital|controla el internet|comunidades|verdad digital",
        t,
    ):
        return "Ciudadanía digital"
    if "empleabilidad" in t:
        return "Empleabilidad / sostenibilidad"
    if re.search(
        r"transformacion digital|conectividad|\b5g\b|telecomunicaciones|gobierno electronico|gobierno inteligente|brecha digital|big data",
        t,
    ):
        return "Transformación digital"
    if re.search(r"enlace digital|audiovisual", t):
        return "Medios"
    return "Tecnología"


def ts_str(value: str) -> str:
    return json.dumps(nfc(value), ensure_ascii=False)


def project_block(
    *,
    video_id: str,
    title: str,
    source: str,
    featured: bool,
) -> str:
    shown = display_title(title)
    category = category_for(shown)
    description = (
        "Especiales Enlace Trece. Canal Trece Colombia."
        if source == "enlace-trece"
        else "Canal oficial SoyAlejo4.0."
    )
    featured_line = "\n    featured: true," if featured else ""
    return f"""  {{
    id: {ts_str(video_id)},
    source: "{source}",
    category: {ts_str(category)},
    title: {ts_str(shown)},
    description: {ts_str(description)},
    image: youtubeThumb({ts_str(video_id)}),
    year: PENDING_COPY,
    url: {ts_str(f"https://www.youtube.com/watch?v={video_id}")},{featured_line}
  }}"""


def main() -> None:
    by_id = {item["id"]: item["title"] for item in PLAYLIST}
    missing = [vid for vid in TRECE_IDS if vid not in by_id]
    if missing:
        raise SystemExit(f"missing playlist ids: {missing}")

    blocks = [
        project_block(
            video_id=vid,
            title=by_id[vid],
            source="enlace-trece",
            featured=vid in FEATURED_IDS,
        )
        for vid in TRECE_IDS
    ]
    seen = set(TRECE_IDS)
    for item in CHANNEL:
        if item["id"] in seen:
            continue
        seen.add(item["id"])
        blocks.append(
            project_block(
                video_id=item["id"],
                title=item["title"],
                source="soyalejo",
                featured=False,
            )
        )

    contents = f"""import {{ PENDING_COPY }} from "@/lib/content"

export type ProjectSource = "enlace-trece" | "soyalejo"

export interface Project {{
  id: string
  source: ProjectSource
  category: string
  title: string
  description: string
  image: string
  year: string
  url: string
  featured?: boolean
}}

export const PROJECTS_FILTER_ALL = "todos"

export const projectSourceLabels: Record<ProjectSource, string> = {{
  "enlace-trece": "Enlace Trece",
  soyalejo: "SoyAlejo4.0",
}}

export const projectsLead =
  "Especiales Enlace Trece — los episodios más cercanos a gobernanza digital, tecnología y ciudadanía — y el archivo completo del canal SoyAlejo4.0."

export function youtubeThumb(videoId: string) {{
  return `https://i.ytimg.com/vi/${{videoId}}/hqdefault.jpg`
}}

export const projects: Project[] = [
{",\n".join(blocks)},
]

export const featuredProjects = projects.filter((project) => project.featured).slice(0, 4)

const CATEGORY_ORDER = [
  "Ciberseguridad",
  "Inteligencia artificial",
  "Transformación digital",
  "Ciudadanía digital",
  "Democracia",
  "Empleabilidad / sostenibilidad",
  "Medios",
  "Tecnología",
]

export const projectCategories = CATEGORY_ORDER.filter((category) =>
  projects.some((project) => project.category === category),
)

export function projectMatchesFilter(project: Project, selected: string) {{
  if (selected === PROJECTS_FILTER_ALL) {{
    return true
  }}

  if (selected === project.source) {{
    return true
  }}

  return projectCategoryId(project.category) === selected
}}

export function projectCategoryId(category: string) {{
  return category
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}}

export function projectLinkLabel(url: string) {{
  if (url.includes("youtube.com") || url.includes("youtu.be")) {{
    return "Ver en YouTube"
  }}

  return "Ver proyecto"
}}
"""
    Path("src/data/projects.ts").write_text(contents, encoding="utf-8")
    print("wrote", len(blocks), "projects")


if __name__ == "__main__":
    main()
