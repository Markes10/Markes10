#!/usr/bin/env python3
"""
ascii_terminal.py — Turn any image into ASCII art that types itself out
like a terminal, saved as a self-contained animated SVG.

Usage:
    Drop an image into this folder and run with no arguments:
        python3 ascii_terminal.py
    It auto-detects the newest image in the folder, converts it to ASCII,
    and writes an animated .svg next to it. Uses SMIL animation so it
    plays in a browser AND inside a GitHub README.

    Optional: pass an image path explicitly:
        python3 ascii_terminal.py path/to/photo.png

Dependencies: Pillow only.
"""
import sys
import os
import glob
from typing import List
from PIL import Image

# ----------------------------------------------------------------------------
# Tunables
# ----------------------------------------------------------------------------
WIDTH = 100          # target width in characters (~100 wide)
CHAR_ASPECT = 0.52   # monospace glyphs are ~2x taller than wide
CONTRAST = 1.15      # >1 boosts contrast, <1 flattens it

# Bright -> blank, dark -> dense. This makes bright backgrounds wash out.
RAMP = " .'`^\",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"

# Terminal look
BG_COLOR = "#0d1117"      # dark background (GitHub dark)
FG_COLOR = "#c9d1d9"      # light monospace text
CURSOR_COLOR = "#3fb950"  # green terminal cursor
FONT_SIZE = 12       # px
LINE_HEIGHT = 13     # px per row
CHAR_WIDTH = 7.2     # px per glyph (monospace advance)
PAD = 16             # px padding around the art
ROW_DURATION = 0.28  # seconds to type one row
HOLD = 1.2           # seconds frozen at the end before it settles

IMAGE_EXTS = ("*.jpg", "*.jpeg", "*.png", "*.gif", "*.bmp", "*.webp",
              "*.tif", "*.tiff", "*.JPG", "*.JPEG", "*.PNG")


def image_to_ascii(path: str, width: int = WIDTH) -> List[str]:
    from PIL import ImageOps, ImageEnhance
    img = Image.open(path).convert("L")
    img = ImageOps.autocontrast(img, cutoff=1)
    if CONTRAST != 1.0:
        img = ImageEnhance.Contrast(img).enhance(CONTRAST)
    w, h = img.size
    new_w = width
    new_h = max(1, int(width * (h / w) * CHAR_ASPECT))
    img = img.resize((new_w, new_h))
    px = img.load()
    assert px is not None
    n = len(RAMP) - 1
    rows: List[str] = []
    for y in range(new_h):
        chars: List[str] = []
        for x in range(new_w):
            pixel_val = px[x, y]  # type: ignore[index]
            if isinstance(pixel_val, int):
                lum: int = pixel_val
            elif isinstance(pixel_val, float):
                lum = int(pixel_val)
            else:
                lum = int(pixel_val[0]) if pixel_val else 0  # type: ignore[index]
            idx = int((255 - lum) / 255 * n)
            chars.append(RAMP[idx])
        rows.append("".join(chars).rstrip())
    return rows


def _xml_escape(s: str) -> str:
    return (s.replace("&", "&amp;").replace("<", "&lt;")
             .replace(">", "&gt;").replace('"', "&quot;"))


def ascii_to_svg(rows: List[str], out_path: str) -> float:
    n_rows = len(rows)
    max_cols = max((len(r) for r in rows), default=1)
    art_w = max_cols * CHAR_WIDTH
    art_h = n_rows * LINE_HEIGHT
    svg_w = int(art_w + PAD * 2)
    svg_h = int(art_h + PAD * 2)
    total = n_rows * ROW_DURATION + HOLD

    parts: List[str] = []
    parts.append(
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{svg_w}" '
        f'height="{svg_h}" viewBox="0 0 {svg_w} {svg_h}" '
        f'font-family="monospace">'
    )
    parts.append(f'<rect width="100%" height="100%" fill="{BG_COLOR}"/>')
    parts.append(
        f'<style>text{{font-family:Menlo,Consolas,"DejaVu Sans Mono",'
        f'monospace;font-size:{FONT_SIZE}px;white-space:pre;'
        f'dominant-baseline:hanging;}}</style>'
    )

    for i, row in enumerate(rows):
        y = PAD + i * LINE_HEIGHT
        start = i * ROW_DURATION
        row_len = max(len(row), 1)
        row_px = row_len * CHAR_WIDTH

        clip_id = f"c{i}"
        parts.append(f'<clipPath id="{clip_id}">')
        parts.append(
            f'<rect x="{PAD}" y="{y}" width="0" height="{LINE_HEIGHT}">'
            f'<animate attributeName="width" from="0" to="{row_px:.1f}" '
            f'begin="{start:.3f}s" dur="{ROW_DURATION:.3f}s" '
            f'fill="freeze" calcMode="linear"/>'
            f'</rect>'
        )
        parts.append('</clipPath>')

        parts.append(
            f'<text x="{PAD}" y="{y}" fill="{FG_COLOR}" '
            f'clip-path="url(#{clip_id})" '
            f'xml:space="preserve">{_xml_escape(row)}</text>'
        )

        parts.append(
            f'<rect y="{y}" width="{CHAR_WIDTH:.1f}" '
            f'height="{FONT_SIZE}" fill="{CURSOR_COLOR}" opacity="0">'
            f'<animate attributeName="x" from="{PAD}" '
            f'to="{PAD + row_px:.1f}" begin="{start:.3f}s" '
            f'dur="{ROW_DURATION:.3f}s" fill="freeze"/>'
            f'<set attributeName="opacity" to="0.85" begin="{start:.3f}s"/>'
            f'<set attributeName="opacity" to="0" '
            f'begin="{start + ROW_DURATION:.3f}s"/>'
            f'</rect>'
        )

    parts.append('</svg>')
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(parts))
    return total


def find_image(folder: str) -> str | None:
    candidates: List[str] = []
    for pat in IMAGE_EXTS:
        candidates.extend(glob.glob(os.path.join(folder, pat)))
    candidates = [c for c in set(candidates) if not c.lower().endswith(".svg")]
    if not candidates:
        return None
    return max(candidates, key=os.path.getmtime)


def main() -> None:
    folder = os.path.dirname(os.path.abspath(__file__))
    img_path: str | None
    if len(sys.argv) > 1:
        img_path = os.path.abspath(sys.argv[1])
        if not os.path.exists(img_path):
            print(f"! Not found: {img_path}")
            sys.exit(1)
    else:
        img_path = find_image(folder)
        if not img_path:
            print("! No image found. Drop a .jpg/.png into this folder and run again.")
            sys.exit(1)

    # Type narrowing: img_path cannot be None after the checks above
    final_img_path: str = img_path  # type: ignore[assignment]
    print(f"→ Reading {os.path.basename(final_img_path)}")
    rows = image_to_ascii(final_img_path)
    out_path = os.path.splitext(final_img_path)[0] + ".svg"
    duration = ascii_to_svg(rows, out_path)
    print(f"✓ Wrote {os.path.basename(out_path)} "
          f"({len(rows)} rows, ~{duration:.1f}s animation)")
    print(f"  Open it in a browser: open \"{out_path}\"")


if __name__ == "__main__":
    main()
