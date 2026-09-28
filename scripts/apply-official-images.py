"""Apply unique portraits scraped from alejandrolinares.co with headroom-safe crops."""

from pathlib import Path

from PIL import Image, ImageFilter

SRC = Path("scripts/_official_sources")
PREV = Path("scripts/_official_preview")
PREV.mkdir(exist_ok=True)


def refine(im: Image.Image) -> Image.Image:
    return im.filter(ImageFilter.UnsharpMask(radius=1.0, percent=55, threshold=2))


def fit(im: Image.Image, tw: int, th: int, focus=(0.5, 0.32)) -> Image.Image:
    sw, sh = im.size
    target = tw / th
    cur = sw / sh
    if cur > target:
        nw = int(sh * target)
        cx = int(sw * focus[0])
        left = max(0, min(sw - nw, cx - nw // 2))
        im = im.crop((left, 0, left + nw, sh))
    else:
        nh = int(sw / target)
        cy = int(sh * focus[1])
        top = max(0, min(sh - nh, cy - nh // 2))
        im = im.crop((0, top, sw, top + nh))
    return im.resize((tw, th), Image.Resampling.LANCZOS)


def save(im: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(".tmp.webp")
    im.convert("RGB").save(tmp, "WEBP", quality=92, method=6)
    tmp.replace(path)
    print(f"OK {path.as_posix()} {im.size}")


def preview(path: Path, name: str) -> None:
    im = Image.open(path).convert("RGB")
    im.thumbnail((480, 640))
    im.save(PREV / name, "JPEG", quality=88)


def open_src(name: str) -> Image.Image:
    return Image.open(SRC / name).convert("RGB")


CW, CH = 1400, 1960  # career portrait cards
FW, FH = 1800, 1400  # focus landscape cards
HW, HH = 1600, 2200  # hero portrait

jobs = [
    # Hero portrait — never overwrite alejandro-hero-cutout.webp (HD transparent master)
    ("51_Alejandro-linares-El-realizador-de-suenos.jpg", (HW, HH), (0.50, 0.30), "public/images/alejandro/alejandro-linares.webp"),
    ("20_IMG-20260715-WA0043.jpg", (2266, 1600), (0.50, 0.28), "public/images/alejandro/alejandro-hero-desktop.webp"),
    # Career (2023-doctorado comes from HD cutout composite — not listed here)
    ("20_IMG-20260715-WA0043.jpg", (CW, CH), (0.52, 0.22), "public/images/career/2008-abogado.webp"),
    ("71_canal131.webp", (CW, CH), (0.515, 0.30), "public/images/career/2012-alcalde.webp"),
    ("18_IMG_0965.webp", (CW, CH), (0.46, 0.32), "public/images/career/2021-camara.webp"),
    ("19_IMG_3151-1-1024x683-1.jpg", (CW, CH), (0.50, 0.30), "public/images/career/2022-maestria.webp"),
    ("20_IMG-20260715-WA0043.jpg", (CW, CH), (0.52, 0.30), "public/images/career/2022-trece.webp"),
    # Focus — medios uses different crop of same master as needed
    ("51_Alejandro-linares-El-realizador-de-suenos.jpg", (FW, FH), (0.50, 0.32), "public/images/focus/gobernanza.webp"),
    ("60_Especiales-Alejandro-Linares-_-IA-en-Colombia-impactos-regulacion-y-seguridad-.png", (FW, FH), (0.50, 0.52), "public/images/focus/liderazgo.webp"),
    ("18_IMG_0965.webp", (FW, FH), (0.40, 0.30), "public/images/focus/medios.webp"),
    ("62_Acompananos-a-descubrir-los-avances-que-transforman-en-Especiales-Alejandro-Linares.png", (FW, FH), (0.58, 0.34), "public/images/focus/tecnologia.webp"),
    # Contact posters (official Portada frames)
    ("41_Alejandro-Linares-Portada-Seguridad.webp", (720, 1280), (0.50, 0.28), "public/images/contact/seguridad.webp"),
    ("42_Alejandro-Linares-Portada-Energia.webp", (720, 1280), (0.50, 0.28), "public/images/contact/energia.webp"),
    ("43_Alejandro-Linares-Portada-super.webp", (720, 1280), (0.50, 0.28), "public/images/contact/super.webp"),
    ("04_Banner-1.webp", (1920, 800), (0.50, 0.45), "public/images/contact/nubes.webp"),
    # Press / publications
    ("26_671266990_18107871830478497_7827270923443721753_n.jpg", (1200, 1200), (0.50, 0.35), "public/images/press/forbes.webp"),
    ("59_Especiales-Alejandro-Linares-_-Ciberseguridad-en-la-era-digital-.png", (1600, 900), (0.28, 0.40), "public/images/press/latam.webp"),
    ("05_Mobilke.webp", (1200, 1600), (0.50, 0.38), "public/images/publications/liderazgo.webp"),
]

for name, size, focus, out in jobs:
    im = refine(fit(open_src(name), size[0], size[1], focus))
    path = Path(out)
    save(im, path)
    preview(path, f"out_{path.stem}.jpg")

print("done", len(jobs))
