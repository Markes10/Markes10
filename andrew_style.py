#!/usr/bin/env python3
"""
Build an Andrew6rant-style neofetch profile SVG:
  - ASCII self-portrait on the left (fully visible, static)
  - terminal info panel on the right

Generates dark_mode.svg and light_mode.svg (self-contained, SMIL).

BEFORE RUNNING:
  1. (Optional) Put your face photo next to this script, named "portrait.png"
     (tight crop, just above the hair to the shoulders).
     If not provided, the SVG will be generated without the portrait.
  2. Edit the INFO list below with your own details.
  3. python3 -m pip install --user Pillow
  4. python3 andrew_style.py
"""
import os
from typing import Any, List, Literal
from PIL import Image, ImageOps, ImageEnhance

# ---- 1. ASCII portrait ------------------------------------------------
ASCII_COLS = 56
ASCII_FS = 13
ASCII_LH = 14
ASCII_CW = 7.8
RAMP = " .'`^\",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"
PORTRAIT_FILE = "portrait.png"


def portrait_rows(path: str, cols: int = ASCII_COLS) -> List[str]:
    if not os.path.isfile(path):
        print(f"⚠️  Warning: '{path}' not found. Generating SVG without ASCII portrait.")
        print(f"    To add your portrait, save a photo as '{path}' and re-run this script.")
        return []
    
    try:
        im = Image.open(path).convert("L")
    except Exception as e:
        print(f"⚠️  Warning: could not read '{path}' as an image ({e}). "
              f"Generating SVG without ASCII portrait.")
        return []
    im = im.point(lambda v: int(((v / 255.0) ** 0.55) * 255))  # type: ignore[arg-type]  # lift shadows
    im = ImageOps.autocontrast(im, cutoff=2)
    im = ImageEnhance.Contrast(im).enhance(1.25)
    w, h = im.size
    rows = max(1, int(cols * (h / w) * (ASCII_CW / ASCII_LH)))
    im = im.resize((cols, rows))
    px = im.load()
    assert px is not None, "Image load failed"
    n = len(RAMP) - 1
    out: List[str] = []
    for y in range(rows):
        line = "".join(RAMP[int((255 - int(px[x, y]) if isinstance(px[x, y], int) else int(px[x, y][0])) / 255 * n)] for x in range(cols))  # type: ignore[index,arg-type]
        out.append(line.rstrip())
    return out


ASCII_ROWS = portrait_rows(PORTRAIT_FILE)

# ---- 2. Right-panel content --------------------------------------------
# EDIT THESE with your own details.
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
    ("kv", (["IDE"], "VS Code · PyCharm")),

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

    ("section", "Education"),

    ("kv", (["Degree"],
            "B.E. Computer Science (2023–2026)")),

    ("kv", (["College"],
            "Agnel Institute of Technology & Design")),

    ("blank", None),

    ("section", "Contact"),

    ("kv", (["Email"],
            "dweepangain11dec99@gmail.com")),

    ("kv", (["Phone"],
            "+91 8485841623")),

    ("kv", (["Location"],
            "Vasco Da Gama, Goa, India")),

    # Replace these with your actual links
    ("kv", (["GitHub"], "github.com/<your-username>")),
    ("kv", (["LinkedIn"], "linkedin.com/in/<your-profile>")),
    ("kv", (["Portfolio"], "your-portfolio.com")),

    ("blank", None),

    ("section", "GitHub Stats"),
    ("stats1", None),
    ("stats2", None),
    ("stats3", None),
]

VALUE_COL = 26
THEMES = {
    "dark": dict(bg="#161b22", text="#c9d1d9", key="#ffa657",
                 value="#a5d6ff", cc="#616e7f", add="#3fb950", dele="#f85149"),
    "light": dict(bg="#ffffff", text="#24292f", key="#953800",
                  value="#0a3069", cc="#6e7781", add="#1a7f37", dele="#cf222e"),
}


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def leader(prefix_len: int) -> int:
    return max(1, VALUE_COL - prefix_len)


def kv_line(keys: List[str], value: str) -> str:
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


CW = 10.0
INFO_X = 500
W, H = 1120, 540


def build_svg(theme_name: str) -> str:
    t = THEMES[theme_name]
    parts: List[str] = []
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
    parts.append(f"<rect width='{W}px' height='{H}px' fill='{t['bg']}' rx='15'/>")

    # ASCII portrait
    if ASCII_ROWS:
        parts.append(f"<text x='15' y='24' fill='{t['text']}' font-size='{ASCII_FS}px'>")
        y = 24
        for row in ASCII_ROWS:
            parts.append(f"<tspan x='15' y='{y}'>{esc(row)}</tspan>")
            y += ASCII_LH
        parts.append("</text>")

    # Info panel
    px = INFO_X
    y = 30
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
    prompt_y = y + 8
    parts.append(
        f"<text x='{px}' y='{prompt_y}' fill='{t['add']}'>{esc(NAME)}</text>"
        f"<text x='{px + 13 * int(CW)}' y='{prompt_y}' fill='{t['text']}'>:~$</text>")
    cur_x = px + 17 * int(CW)
    parts.append(
        f"<rect x='{cur_x}' y='{prompt_y - 13}' width='{int(CW)}' height='17' "
        f"fill='{t['add']}'>"
        f"<animate attributeName='opacity' values='1;1;0;0' dur='1.1s' "
        f"keyTimes='0;0.5;0.5;1' repeatCount='indefinite'/></rect>")
    parts.append("</svg>")
    return "\n".join(parts)


for name in ("dark", "light"):
    out = f"{name}_mode.svg"
    with open(out, "w", encoding="utf-8") as f:
        f.write(build_svg(name))
    print("wrote", out)