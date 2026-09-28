"""Optimize home images to HD WebP without generative face changes."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path("public/images")
MASTER = ROOT / "alejandro/alejandro-hero-master.webp"
CUTOUT = ROOT / "alejandro/alejandro-hero-cutout.webp"
DESKTOP = ROOT / "alejandro/alejandro-hero-desktop.webp"
SOURCES = Path("public/images/_sources")


def save_webp(im: Image.Image, path: Path, quality: int = 92) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGBA" if "A" in im.getbands() else "RGB")
    im.save(path, "WEBP", quality=quality, method=6)
    print(f"  -> {path.as_posix()} {im.size[0]}x{im.size[1]} {path.stat().st_size // 1024}KB")


def fit_cover(
    im: Image.Image,
    tw: int,
    th: int,
    focus: tuple[float, float] = (0.5, 0.28),
) -> Image.Image:
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


def gentle_refine(im: Image.Image) -> Image.Image:
    return im.filter(ImageFilter.UnsharpMask(radius=1.1, percent=70, threshold=2))


def upscale_max(im: Image.Image, min_long: int = 1600, max_long: int = 2000) -> Image.Image:
    w, h = im.size
    long_edge = max(w, h)
    if long_edge >= min_long:
        return im
    scale = min(max_long / long_edge, 2.75)
    out = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    return gentle_refine(out)


def main() -> None:
    print("=== HD portrait from master ===")
    master = Image.open(MASTER).convert("RGB")
    portrait = gentle_refine(fit_cover(master, 1600, 2200, focus=(0.52, 0.22)))
    save_webp(portrait, ROOT / "alejandro/alejandro-linares.webp", 93)
    save_webp(portrait, ROOT / "career/2008-abogado.webp", 93)
    save_webp(portrait, ROOT / "focus/gobernanza.webp", 93)

    print("=== Career alcalde (native upscale) ===")
    alcalde = Image.open(ROOT / "career/2012-alcalde.webp").convert("RGBA")
    bg = Image.new("RGB", alcalde.size, (16, 17, 18))
    bg.paste(alcalde, mask=alcalde.split()[-1])
    save_webp(upscale_max(bg, min_long=1400, max_long=1620), ROOT / "career/2012-alcalde.webp", 92)

    print("=== Career camara / maestria / trece ===")
    for src, dest, focus in [
        (ROOT / "career/2021-camara.jpg", ROOT / "career/2021-camara.webp", (0.45, 0.25)),
        (ROOT / "career/2022-maestria.webp", ROOT / "career/2022-maestria.webp", (0.5, 0.28)),
        (ROOT / "career/2022-trece.webp", ROOT / "career/2022-trece.webp", (0.5, 0.3)),
    ]:
        im = Image.open(src).convert("RGB")
        save_webp(gentle_refine(fit_cover(im, 1400, 1960, focus=focus)), dest, 92)

    print("=== Replace doctorado collage with clean portrait ===")
    cut = Image.open(CUTOUT).convert("RGBA")
    canvas = Image.new("RGB", cut.size, (16, 17, 18))
    canvas.paste(cut, mask=cut.split()[-1])
    save_webp(
        gentle_refine(fit_cover(canvas, 1400, 1960, focus=(0.5, 0.18))),
        ROOT / "career/2023-doctorado.webp",
        93,
    )

    print("=== Focus liderazgo / medios ===")
    for src, dest, focus in [
        (ROOT / "focus/liderazgo.webp", ROOT / "focus/liderazgo.webp", (0.5, 0.22)),
        (ROOT / "focus/medios.webp", ROOT / "focus/medios.webp", (0.42, 0.18)),
    ]:
        im = Image.open(src).convert("RGB")
        save_webp(gentle_refine(fit_cover(im, 1800, 1350, focus=focus)), dest, 92)

    print("=== Focus tecnologia from desktop master ===")
    desk = Image.open(DESKTOP).convert("RGB")
    save_webp(
        gentle_refine(fit_cover(desk, 1600, 1600, focus=(0.62, 0.28))),
        ROOT / "focus/tecnologia.webp",
        92,
    )

    print("=== Contact posters ===")
    alt_map = {
        "seguridad": "portada-seg.webp",
        "super": "portada-super.webp",
        "energia": "portada-energia.webp",
        "nubes": "portada-nubes.webp",
    }
    for name, alt_name in alt_map.items():
        alt = SOURCES / alt_name
        im = Image.open(alt if alt.exists() else ROOT / f"contact/{name}.webp").convert("RGB")
        save_webp(gentle_refine(im), ROOT / f"contact/{name}.webp", 93)

    print("=== Press / ideas / publications ===")
    for path in [
        ROOT / "press/forbes.webp",
        ROOT / "press/latam.webp",
        ROOT / "ideas/television-publica.webp",
    ]:
        save_webp(gentle_refine(Image.open(path).convert("RGB")), path, 92)

    pub = Image.open(ROOT / "publications/liderazgo.png").convert("RGB")
    save_webp(upscale_max(pub, min_long=1400, max_long=1600), ROOT / "publications/liderazgo.webp", 92)

    print("=== Hero encodes ===")
    save_webp(
        gentle_refine(Image.open(ROOT / "alejandro/alejandro-hero-mobile.webp").convert("RGB")),
        ROOT / "alejandro/alejandro-hero-mobile.webp",
        92,
    )
    save_webp(gentle_refine(Image.open(DESKTOP).convert("RGB")), DESKTOP, 90)
    cut2 = Image.open(CUTOUT).convert("RGBA")
    cut2.save(CUTOUT, "WEBP", quality=93, method=6)
    print(f"  -> cutout {cut2.size}")

    # Remove obsolete low-res jpg career files after webp exists
    for obsolete in [
        ROOT / "career/2021-camara.jpg",
        ROOT / "career/2023-doctorado.jpg",
    ]:
        if obsolete.exists() and obsolete.with_suffix(".webp").exists():
            obsolete.unlink()
            print(f"  removed {obsolete.as_posix()}")

    print("DONE")


if __name__ == "__main__":
    main()
