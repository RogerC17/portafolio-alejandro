from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path("public/images")
SRC = ROOT / "_sources"
MASTER = ROOT / "alejandro/alejandro-hero-master.webp"
CUTOUT = ROOT / "alejandro/alejandro-hero-cutout.webp"
DESKTOP = ROOT / "alejandro/alejandro-hero-desktop.webp"


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


def up(im: Image.Image, mn: int = 1500) -> Image.Image:
    w, h = im.size
    long_edge = max(w, h)
    if long_edge >= mn:
        return im
    scale = min(2.5, mn / long_edge)
    return refine(im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS))


def save(im: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(".tmp.webp")
    im.convert("RGB").save(tmp, "WEBP", quality=92, method=6)
    tmp.replace(path)
    print(f"{path.name} {im.size[0]}x{im.size[1]} {path.stat().st_size // 1024}KB")


def main() -> None:
    cw, ch = 1400, 1960
    fw, fh = 1800, 1400

    # Career — 6 distinct professional portraits, headroom-safe focus
    save(
        refine(fit(Image.open(MASTER).convert("RGB"), cw, ch, (0.52, 0.34))),
        ROOT / "career/2008-abogado.webp",
    )
    save(
        refine(fit(up(Image.open(SRC / "jhon.webp").convert("RGB")), 1400, 1600, (0.5, 0.34))),
        ROOT / "career/2012-alcalde.webp",
    )
    save(
        refine(fit(Image.open(SRC / "liderazgo.jpg").convert("RGB"), cw, ch, (0.5, 0.32))),
        ROOT / "career/2021-camara.webp",
    )
    save(
        refine(fit(up(Image.open(SRC / "alejandro_wp.webp").convert("RGB")), cw, ch, (0.5, 0.36))),
        ROOT / "career/2022-maestria.webp",
    )
    save(
        refine(fit(Image.open(DESKTOP).convert("RGB"), cw, ch, (0.50, 0.32))),
        ROOT / "career/2022-trece.webp",
    )
    cut = Image.open(CUTOUT).convert("RGBA")
    canvas = Image.new("RGB", cut.size, (16, 17, 18))
    canvas.paste(cut, mask=cut.split()[-1])
    save(refine(fit(canvas, cw, ch, (0.5, 0.30))), ROOT / "career/2023-doctorado.webp")

    # Focus — sources not reused as identical career files
    save(
        refine(fit(Image.open(DESKTOP).convert("RGB"), fw, fh, (0.48, 0.32))),
        ROOT / "focus/gobernanza.webp",
    )
    save(
        refine(fit(Image.open(SRC / "liderazgo.jpg").convert("RGB"), fw, fh, (0.5, 0.36))),
        ROOT / "focus/liderazgo.webp",
    )
    save(
        refine(fit(Image.open(SRC / "medios.webp").convert("RGB"), fw, fh, (0.40, 0.30))),
        ROOT / "focus/medios.webp",
    )
    save(
        refine(fit(up(Image.open(SRC / "ig.jpg").convert("RGB")), fw, fh, (0.5, 0.34))),
        ROOT / "focus/tecnologia.webp",
    )

    save(
        refine(fit(Image.open(MASTER).convert("RGB"), 1600, 2200, (0.52, 0.32))),
        ROOT / "alejandro/alejandro-linares.webp",
    )

    # Note: liderazgo source shared by career 2021 + focus liderazgo (different crop).
    # medios career vs ig focus are distinct. desktop gob vs tec are different crops.


if __name__ == "__main__":
    main()
