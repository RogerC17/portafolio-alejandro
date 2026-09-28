from pathlib import Path

from PIL import Image, ImageFilter

SRC = Path("public/images/_sources")
DESKTOP = Path("public/images/alejandro/alejandro-hero-desktop.webp")
OUT = Path("public/images/_preview")
OUT.mkdir(exist_ok=True)


def refine(im: Image.Image) -> Image.Image:
    return im.filter(ImageFilter.UnsharpMask(radius=1.0, percent=60, threshold=2))


def fit(im: Image.Image, tw: int, th: int, focus=(0.5, 0.36)) -> Image.Image:
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
    tmp = path.with_suffix(".tmp.webp")
    im.convert("RGB").save(tmp, "WEBP", quality=92, method=6)
    tmp.replace(path)
    print(path.name, im.size)


cw, ch, fw, fh = 1400, 1960, 1800, 1400
desk = Image.open(DESKTOP).convert("RGB")

save(refine(fit(desk, cw, ch, (0.72, 0.30))), Path("public/images/career/2022-trece.webp"))
save(
    refine(fit(Image.open(SRC / "medios.webp").convert("RGB"), fw, fh, (0.40, 0.40))),
    Path("public/images/focus/medios.webp"),
)

ig = Image.open(SRC / "ig.jpg").convert("RGB")
w, h = ig.size
panel = ig.crop((int(w * 0.48), int(h * 0.02), int(w * 0.98), int(h * 0.52)))
pw, ph = panel.size
scale = max(1600 / max(pw, ph), 1.0)
panel = panel.resize((int(pw * scale), int(ph * scale)), Image.Resampling.LANCZOS)
save(refine(fit(panel, fw, fh, (0.55, 0.40))), Path("public/images/focus/tecnologia.webp"))
save(refine(fit(desk, fw, fh, (0.38, 0.34))), Path("public/images/focus/gobernanza.webp"))

for rel in [
    "career/2022-trece.webp",
    "focus/medios.webp",
    "focus/tecnologia.webp",
    "focus/gobernanza.webp",
]:
    im = Image.open(f"public/images/{rel}").convert("RGB")
    im.thumbnail((400, 520))
    im.save(OUT / f"{Path(rel).stem}.jpg", "JPEG", quality=85)

print("done")
