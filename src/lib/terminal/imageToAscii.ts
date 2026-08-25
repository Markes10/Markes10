/**
 * Converts an image (by URL or path) into colorful ASCII art HTML.
 * Uses a hidden <canvas> to sample pixels, then maps each pixel
 * to a block character (█/▓/▒/░) colored with the original RGB value.
 * Consecutive same-color blocks are grouped into single <span> elements.
 */

// ── Public API ────────────────────────────────────────────────────────────

/** Cached results keyed by targetWidth */
const profileCache: Record<number, string> = {};

/**
 * Returns a cached colorful ASCII rendering of /profile.jpg.
 * On first call it generates and caches; subsequent calls return instantly.
 */
export async function getProfileAscii(
  targetWidth: number = 40,
): Promise<string> {
  if (profileCache[targetWidth]) return profileCache[targetWidth];
  profileCache[targetWidth] = await convertImageToAscii(
    '/profile.jpg',
    targetWidth,
  );
  return profileCache[targetWidth];
}

/**
 * Convert any image URL to colorful ASCII HTML.
 * Set crossOrigin=true for external URLs (e.g. GitHub avatars).
 */
export async function convertImageToAscii(
  src: string,
  targetWidth: number = 40,
  crossOrigin: boolean = false,
): Promise<string> {
  if (typeof document === 'undefined') return '';

  return new Promise((resolve, reject) => {
    const img = new Image();
    if (crossOrigin) img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const html = renderAscii(img, targetWidth);
        resolve(html);
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

// ── Core rendering ───────────────────────────────────────────────────────

const Q = 34; // color quantisation step (0-255 → ~8 levels per channel)

/**
 * Brightness → block character. Using 4 density levels + empty.
 */
function charForBrightness(b: number): string {
  if (b > 0.92) return ' ';
  if (b > 0.72) return '░';
  if (b > 0.45) return '▒';
  if (b > 0.2) return '▓';
  return '█';
}

/** Round to nearest quantisation step */
function q(v: number): number {
  return Math.round(v / Q) * Q;
}

function renderAscii(img: HTMLImageElement, targetCols: number): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  const cols = targetCols;
  const scale = img.width / cols;
  const rows = Math.max(1, Math.floor(img.height / scale));

  canvas.width = cols;
  canvas.height = rows;

  // Disable image smoothing for sharper pixels
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, cols, rows);

  const { data } = ctx.getImageData(0, 0, cols, rows);

  // Build rows of HTML, grouping consecutive same-color characters
  const rowParts: string[] = [];

  for (let y = 0; y < rows; y++) {
    let html = '';
    let curColor: string | null = null;
    let buf = '';

    for (let x = 0; x < cols; x++) {
      const i = (y * cols + x) * 4;
      const r = data[i],
        g = data[i + 1],
        b = data[i + 2],
        a = data[i + 3];

      // Transparent or near-white → empty space
      if (a < 25) {
        flush();
        html += ' ';
        continue;
      }

      const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      const ch = charForBrightness(brightness);

      if (ch === ' ') {
        flush();
        html += ' ';
        continue;
      }

      // Quantise color for grouping efficiency
      const qr = q(r),
        qg = q(g),
        qb = q(b);
      const color = `rgb(${qr},${qg},${qb})`;

      if (color === curColor) {
        buf += ch;
      } else {
        flush();
        curColor = color;
        buf = ch;
      }
    }
    flush();
    rowParts.push(html);

    function flush() {
      if (curColor !== null && buf) {
        html += `<span style="color:${curColor}">${buf}</span>`;
        buf = '';
        curColor = null;
      }
    }
  }

  return rowParts.join('\n');
}
