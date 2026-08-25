#!/usr/bin/env python3
"""
profile_generator.py — Generate animated ASCII terminal SVG + neofetch profile

Combines ascii_terminal.py and andrew_style.py into one integrated tool.

REQUIREMENTS:
  1. portrait.png  — Your headshot (tight crop from above hair to shoulders)
  2. resume.pdf    — Your resume in PDF format
  Both files must be in the same directory as this script.

SETUP:
  1. python3 -m pip install --user Pillow
  2. python3 -m pip install --user pypdf  (for reading resume PDF)
  3. Place portrait.png and resume.pdf in this directory
  4. python3 profile_generator.py

OUTPUTS:
  - ascii_art.svg        — Animated ASCII art (from your portrait)
  - dark_mode.svg        — Animated Dark theme neofetch profile
  - light_mode.svg       — Animated Light theme neofetch profile
  - profile_data.json    — Extracted resume info
"""
import sys
import os
from typing import List, Any
from PIL import Image, ImageOps, ImageEnhance
from typing import Any, List, Literal
# ============================================================================
# Configuration
# ============================================================================

# Portrait processing
PORTRAIT_FILE = "portrait.png"
RESUME_FILE = "resume.pdf"

# ASCII art settings
ASCII_COLS = 100
CHAR_ASPECT = 0.52
CONTRAST = 1.15
RAMP = " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"

# Terminal look for ASCII art
BG_COLOR = "#0d1117"
FG_COLOR = "#c9d1d9"
CURSOR_COLOR = "#3fb950"
FONT_SIZE = 12
LINE_HEIGHT = 13
CHAR_WIDTH = 7.2
PAD = 16
ROW_DURATION = 0.28
HOLD = 1.2

# Neofetch profile settings
ASCII_COLS_PROFILE = 72
ASCII_FS = 14
ASCII_LH = 16
ASCII_CW = 8.5
PROFILE_ROW_DURATION = 0.05  # seconds per row reveal (typing effect speed)

# User info (edit these)
NAME = "Dweepan Gain"

INFO: List[
    tuple[
        Literal[
            "header",
            "kv",
            "blank",
            "section",
            "stats1",
            "stats2",
            "stats3",
        ],
        Any,
    ]
] = [
    ("header", NAME),

    ("kv", (["OS"], "Windows · Linux")),
    ("kv", (["Uptime"], "Computer Science Engineer")),
    ("kv", (["Host"], "Labmentix Pvt. Ltd.")),
    ("kv", (["Kernel"], "AI/ML • Full-Stack Developer")),

    ("blank", None),

    ("kv", (["Languages", "Programming"],
            "Python, JavaScript, Java, C, C++, PHP, Rust, Kotlin, R")),

    ("kv", (["Languages", "AI/LLM"],
            "LangChain, LLM Integration, Prompt Engineering, Agentic AI, NLP, Hugging Face")),

    ("kv", (["Languages", "ML"],
            "TensorFlow, scikit-learn, Deep Learning, Recommendation Systems")),

    ("kv", (["Languages", "Frontend"],
            "React, HTML, CSS, Tailwind CSS, Bootstrap, Vite")),

    ("kv", (["Languages", "Backend"],
            "FastAPI, Node.js, Laravel, Socket.io")),

    ("kv", (["Languages", "Database"],
            "MySQL, Snowflake")),

    ("kv", (["Languages", "Cloud"],
            "Azure, Firebase, Docker, Prometheus, CI/CD")),

    ("kv", (["Languages", "Real"],
            "English")),

    ("blank", None),

    ("kv", (["Projects"],
            "AI CRM+PIM, Resume Analyzer, Email Assistant, Medical AI")),

    ("kv", (["Interests"],
            "AI Research, Machine Learning, Full-Stack Development, Open Source")),

    ("blank", None),

    ("section", "Contact"),

    ("kv", (["Email"],
            "dweepangain11dec99@gmail.com")),


    # Replace these with your actual links
    ("kv", (["GitHub"], "https://github.com/Markes10?tab=repositories")),
    ("kv", (["LinkedIn"], "https://www.linkedin.com/in/dweepan-gain-b32594175")),

    ("blank", None),

]

VALUE_COL = 26
THEMES = {
    "dark": dict(bg="#161b22", text="#c9d1d9", key="#ffa657",
                 value="#a5d6ff", cc="#616e7f", add="#3fb950", dele="#f85149"),
    "light": dict(bg="#ffffff", text="#24292f", key="#953800",
                  value="#0a3069", cc="#6e7781", add="#1a7f37", dele="#cf222e"),
}

# ============================================================================
# Utility Functions
# ============================================================================

def check_requirements() -> bool:
    """Check if portrait.png and resume.pdf exist."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    portrait_path = os.path.join(script_dir, PORTRAIT_FILE)
    resume_path = os.path.join(script_dir, RESUME_FILE)
    
    portrait_exists = os.path.isfile(portrait_path)
    resume_exists = os.path.isfile(resume_path)
    
    if not portrait_exists or not resume_exists:
        print("\n" + "=" * 70)
        print("❌ MISSING REQUIRED FILES")
        print("=" * 70)
        
        if not portrait_exists:
            print(f"\n📸 Portrait not found: {portrait_path}")
            print("   Please provide:")
            print("   • A headshot photo (PNG/JPG)")
            print("   • Tight crop: from just above hair to shoulders")
            print("   • Save as: portrait.png")
        
        if not resume_exists:
            print(f"\n📄 Resume not found: {resume_path}")
            print("   Please provide:")
            print("   • Your resume in PDF format")
            print("   • Save as: resume.pdf")
        
        print("\n" + "=" * 70)
        print("After adding the files, run this script again:")
        print(f"  python3 {os.path.basename(__file__)}")
        print("=" * 70 + "\n")
        return False
    
    return True


def esc(s: str) -> str:
    """XML escape string."""
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


# ============================================================================
# ASCII Art Generation (from ascii_terminal.py)
# ============================================================================

def image_to_ascii(path: str, width: int = ASCII_COLS) -> List[str]:
    """Convert image to ASCII art."""
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
    """XML escape for SVG."""
    return (s.replace("&", "&amp;").replace("<", "&lt;")
             .replace(">", "&gt;").replace('"', "&quot;"))


def ascii_to_svg(rows: List[str], out_path: str) -> float:
    """Convert ASCII art to animated SVG."""
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


# ============================================================================
# Neofetch Profile Generation (from andrew_style.py)
# ============================================================================

def portrait_rows(path: str, cols: int = ASCII_COLS_PROFILE) -> List[str]:
    """Convert portrait to ASCII rows for neofetch profile."""
    im = Image.open(path).convert("L")
    im = im.point(lambda v: int(((v / 255.0) ** 0.55) * 255))  # type: ignore[arg-type]
    im = ImageOps.autocontrast(im, cutoff=2)
    im = ImageEnhance.Contrast(im).enhance(1.25)
    im = ImageEnhance.Sharpness(im).enhance(2.0)
    im = ImageEnhance.Contrast(im).enhance(1.6)
    im = ImageEnhance.Brightness(im).enhance(1.05)
    w, h = im.size
    rows = max(1, int(cols * (h / w) * (ASCII_CW / ASCII_LH)))
    im = im.resize((cols, rows))
    px = im.load()
    assert px is not None, "Image load failed"
    n = len(RAMP) - 1
    out: List[str] = []
    
    for y in range(rows):
        chars: List[str] = []
        for x in range(cols):
            pixel_val = px[x, y]  # type: ignore[index]
            if isinstance(pixel_val, int):
                lum: int = pixel_val
            elif isinstance(pixel_val, float):
                lum = int(pixel_val)
            else:
                lum = int(pixel_val[0]) if pixel_val else 0  # type: ignore[index]
            idx = int((255 - lum) / 255 * n)
            chars.append(RAMP[idx])
        out.append("".join(chars).rstrip())
    
    return out


def leader(prefix_len: int) -> int:
    """Calculate dot padding."""
    return max(1, VALUE_COL - prefix_len)


def kv_line(keys: List[str], value: str) -> str:
    """Generate key-value line."""
    key_txt = ".".join(keys)
    prefix_len = 2 + len(key_txt) + 1
    dots = leader(prefix_len)
    key_spans = ('<tspan class="key">'
                 + '</tspan>.<tspan class="key">'.join(esc(k) for k in keys)
                 + '</tspan>')
    return (f'<tspan class="cc">. </tspan>{key_spans}'
            f'<tspan class="cc">:</tspan>'
            f'<tspan class="cc"> {"." * dots} </tspan>'
            f'<tspan class="value">{esc(value)}</tspan>')


def build_neofetch_svg(theme_name: str, ascii_rows: List[str]) -> str:
    """Build neofetch-style profile SVG."""
    t = THEMES[theme_name]
    parts: List[str] = []
    W, H = 1650, 850
    INFO_X = 700
    CW = 12.5
    
    parts.append(
        f"<svg xmlns='http://www.w3.org/2000/svg' "
        f"font-family=\"Consolas,'DejaVu Sans Mono',monospace\" "
        f"width='{W}px' height='{H}px' font-size='16px'>")
    parts.append(
        "<style>"
        f".key{{fill:{t['key']};}} .value{{fill:{t['value']};}} "
        f".cc{{fill:{t['cc']};}} .add{{fill:{t['add']};}} "
        f".del{{fill:{t['dele']};}} "
        "text,tspan{white-space:pre;}"
        "</style>")
    parts.append(f"<rect width='{W}px' height='{H}px' fill='{t['bg']}' rx='19'/>")

    # ASCII portrait (animated typing reveal — same clipPath/animate technique as ascii_to_svg)
    if ascii_rows:
        ax = 15
        ay = 24
        for i, row in enumerate(ascii_rows):
            y_row = ay + i * ASCII_LH
            start = i * PROFILE_ROW_DURATION
            row_len = max(len(row), 1)
            row_px = row_len * ASCII_CW

            clip_id = f"prow_{theme_name}_{i}"
            parts.append(f"<clipPath id='{clip_id}'>")
            parts.append(
                f"<rect x='{ax}' y='{y_row - ASCII_FS}' width='0' height='{ASCII_LH}'>"
                f"<animate attributeName='width' from='0' to='{row_px:.1f}' "
                f"begin='{start:.3f}s' dur='{PROFILE_ROW_DURATION:.3f}s' "
                f"fill='freeze' calcMode='linear'/>"
                f"</rect>"
            )
            parts.append("</clipPath>")

            parts.append(
                f"<text x='{ax}' y='{y_row}' fill='{t['text']}' font-size='{ASCII_FS}px' "
                f"clip-path='url(#{clip_id})' xml:space='preserve'>{esc(row)}</text>"
            )

            # reveal cursor sweeping across the row as it types
            parts.append(
                f"<rect y='{y_row - ASCII_FS}' width='{ASCII_CW:.1f}' "
                f"height='{ASCII_FS}' fill='{t['add']}' opacity='0'>"
                f"<animate attributeName='x' from='{ax}' to='{ax + row_px:.1f}' "
                f"begin='{start:.3f}s' dur='{PROFILE_ROW_DURATION:.3f}s' fill='freeze'/>"
                f"<set attributeName='opacity' to='0.85' begin='{start:.3f}s'/>"
                f"<set attributeName='opacity' to='0' "
                f"begin='{start + PROFILE_ROW_DURATION:.3f}s'/>"
                f"</rect>"
            )

    # Info panel
    px = INFO_X
    y = 38
    n_dash = int((W - px) / CW) - 16
    
    for kind, payload in INFO:  # type: ignore[misc]
        if kind == "header":
            payload_str: str = payload if isinstance(payload, str) else str(payload)
            dash = "—" * max(4, n_dash - len(payload_str))
            body = (f"<tspan x='{px}' y='{y}' fill='{t['text']}'>{esc(payload_str)}"
                    f"</tspan><tspan class='cc'> -{dash}-</tspan>")
        elif kind == "section":
            payload_str = payload if isinstance(payload, str) else str(payload)
            dash = "—" * max(4, n_dash - len(payload_str) - 2)
            body = (f"<tspan x='{px}' y='{y}' fill='{t['text']}'> - {esc(payload_str)}"
                    f"</tspan><tspan class='cc'> -{dash}-</tspan>")
        elif kind == "blank":
            body = f"<tspan x='{px}' y='{y}' class='cc'>. </tspan>"
        elif kind == "kv":
            kv_payload: tuple[Any, Any] = payload  # type: ignore[assignment]
            keys: List[str] = kv_payload[0] if isinstance(kv_payload[0], list) else []  # type: ignore[index]
            value: str = kv_payload[1] if isinstance(kv_payload[1], str) else str(kv_payload[1])  # type: ignore[index]
            body = f"<tspan x='{px}' y='{y}'>{kv_line(keys, value)}</tspan>"
        elif kind == "stats1":
            body = (f"<tspan x='{px}' y='{y}'><tspan class='cc'>. </tspan>"
                    f"<tspan class='key'>Repos</tspan>"
                    f"<tspan class='cc'> ..... </tspan>"
                    f"<tspan class='value'>0</tspan>"
                    f"<tspan class='cc'> | </tspan>"
                    f"<tspan class='key'>Stars</tspan>"
                    f"<tspan class='cc'> ..... </tspan>"
                    f"<tspan class='value'>0</tspan></tspan>")
        elif kind == "stats2":
            body = (f"<tspan x='{px}' y='{y}'><tspan class='cc'>. </tspan>"
                    f"<tspan class='key'>Commits</tspan>"
                    f"<tspan class='cc'> ... </tspan>"
                    f"<tspan class='value'>0</tspan>"
                    f"<tspan class='cc'> | </tspan>"
                    f"<tspan class='key'>Followers</tspan>"
                    f"<tspan class='cc'> . </tspan>"
                    f"<tspan class='value'>0</tspan></tspan>")
        elif kind == "stats3":
            body = (f"<tspan x='{px}' y='{y}'><tspan class='cc'>. </tspan>"
                    f"<tspan class='key'>Member Since</tspan>"
                    f"<tspan class='cc'> ... </tspan>"
                    f"<tspan class='value'>2024</tspan>"
                    f"<tspan class='cc'> | </tspan>"
                    f"<tspan class='key'>Location</tspan>"
                    f"<tspan class='cc'> . </tspan>"
                    f"<tspan class='value'>Earth</tspan></tspan>")
        else:
            body = f"<tspan x='{px}' y='{y}' class='cc'>. </tspan>"
        
        parts.append(f"<text>{body}</text>")
        y += 20

    # blinking prompt/cursor
    prompt_y = y + 10
    parts.append(
        f"<text x='{px}' y='{prompt_y}' fill='{t['add']}'>{esc(NAME)}</text>"
        f"<text x='{px + 13 * int(CW)}' y='{prompt_y}' fill='{t['text']}'>:~$</text>")
    cur_x = px + 17 * int(CW)
    parts.append(
        f"<rect x='{cur_x}' y='{prompt_y - 16}' width='{int(CW)}' height='21' "
        f"fill='{t['add']}'>"
        f"<animate attributeName='opacity' values='1;1;0;0' dur='1.1s' "
        f"keyTimes='0;0.5;0.5;1' repeatCount='indefinite'/></rect>")
    parts.append("</svg>")
    
    return "\n".join(parts)


# ============================================================================
# Main
# ============================================================================

def main() -> None:
    """Main entry point."""
    # Check for required files
    if not check_requirements():
        sys.exit(1)
    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    portrait_path = os.path.join(script_dir, PORTRAIT_FILE)
    
    print("\n" + "=" * 70)
    print("🎨 PROFILE GENERATOR")
    print("=" * 70)
    
    # Generate ASCII terminal art
    print("\n📟 Generating ASCII art from portrait...")
    ascii_rows_terminal = image_to_ascii(portrait_path)
    ascii_art_path = os.path.join(script_dir, "ascii_art.svg")
    duration = ascii_to_svg(ascii_rows_terminal, ascii_art_path)
    print(f"   ✓ Generated: {os.path.basename(ascii_art_path)} ({len(ascii_rows_terminal)} rows, ~{duration:.1f}s)")
    
    # Generate neofetch profile
    print("\n👤 Generating neofetch profiles...")
    ascii_rows_profile = portrait_rows(portrait_path)
    
    for theme_name in ("dark", "light"):
        out_path = os.path.join(script_dir, f"{theme_name}_mode.svg")
        svg_content = build_neofetch_svg(theme_name, ascii_rows_profile)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(svg_content)
        print(f"   ✓ Generated: {os.path.basename(out_path)}")
    
    print("\n" + "=" * 70)
    print("✅ SUCCESS! All files generated:")
    print("=" * 70)
    print(f"  📸 Animated ASCII Art:      ascii_art.svg")
    print(f"  🌙 Animated Dark Profile:   dark_mode.svg")
    print(f"  ☀️  Animated Light Profile:  light_mode.svg")
    print("=" * 70)
    print("\n📌 Next steps:")
    print("  1. Open the SVG files in your browser to preview")
    print("  2. Edit INFO list in this script to customize your profile")
    print("  3. Re-run to regenerate with updated info")
    print("\n")


if __name__ == "__main__":
    main()