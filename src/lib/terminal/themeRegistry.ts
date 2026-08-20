/**
 * RETROSHELL Theme Registry
 * 
 * Manages built-in and user-created color themes.
 * Built-in themes cannot be deleted. Custom themes are
 * stored in-memory (persisted across the session).
 * 
 * Usage in Terminal.tsx:
 *   const colors = getThemeColors('amber');
 *   const names  = getAllThemeNames();
 */

import { ThemeColors } from './types';

// ── Built-in themes ──────────────────────────────────────────────────────

const BUILT_IN: Record<string, ThemeColors> = {
  amber: {
    text: '#ffb000',
    textDim: '#b37d00',
    textGhost: 'rgba(255, 176, 0, 0.35)',
    bg: '#0a0a00',
    prompt: '#ffb000',
    accent: '#ff6600',
    scanline: 'rgba(255, 176, 0, 0.03)',
    crtGlow: 'rgba(255, 176, 0, 0.04)',
  },
  green: {
    text: '#33ff00',
    textDim: '#1a8c00',
    textGhost: 'rgba(51, 255, 0, 0.3)',
    bg: '#000a00',
    prompt: '#33ff00',
    accent: '#00cc66',
    scanline: 'rgba(51, 255, 0, 0.03)',
    crtGlow: 'rgba(51, 255, 0, 0.04)',
  },
  white: {
    text: '#c0c0c0',
    textDim: '#707070',
    textGhost: 'rgba(192, 192, 192, 0.3)',
    bg: '#0a0a0a',
    prompt: '#e0e0e0',
    accent: '#ffffff',
    scanline: 'rgba(192, 192, 192, 0.03)',
    crtGlow: 'rgba(192, 192, 192, 0.04)',
  },
  cyber: {
    text: '#00ffff',
    textDim: '#008888',
    textGhost: 'rgba(0, 255, 255, 0.3)',
    bg: '#000a0a',
    prompt: '#00ffff',
    accent: '#ff00ff',
    scanline: 'rgba(0, 255, 255, 0.03)',
    crtGlow: 'rgba(0, 255, 255, 0.04)',
  },
  red: {
    text: '#ff3333',
    textDim: '#991111',
    textGhost: 'rgba(255, 51, 51, 0.3)',
    bg: '#0a0000',
    prompt: '#ff3333',
    accent: '#ff6666',
    scanline: 'rgba(255, 51, 51, 0.03)',
    crtGlow: 'rgba(255, 51, 51, 0.04)',
  },
  purple: {
    text: '#bf5fff',
    textDim: '#7b3faa',
    textGhost: 'rgba(191, 95, 255, 0.3)',
    bg: '#080012',
    prompt: '#bf5fff',
    accent: '#e040fb',
    scanline: 'rgba(191, 95, 255, 0.03)',
    crtGlow: 'rgba(191, 95, 255, 0.04)',
  },
  matrix: {
    text: '#00ff41',
    textDim: '#003b00',
    textGhost: 'rgba(0, 255, 65, 0.25)',
    bg: '#000000',
    prompt: '#00ff41',
    accent: '#008f11',
    scanline: 'rgba(0, 255, 65, 0.04)',
    crtGlow: 'rgba(0, 255, 65, 0.06)',
  },
  solarized: {
    text: '#b58900',
    textDim: '#839496',
    textGhost: 'rgba(181, 137, 0, 0.3)',
    bg: '#002b36',
    prompt: '#b58900',
    accent: '#cb4b16',
    scanline: 'rgba(181, 137, 0, 0.03)',
    crtGlow: 'rgba(181, 137, 0, 0.04)',
  },
  pink: {
    text: '#ff69b4',
    textDim: '#c2185b',
    textGhost: 'rgba(255, 105, 180, 0.3)',
    bg: '#0a0008',
    prompt: '#ff69b4',
    accent: '#ff1493',
    scanline: 'rgba(255, 105, 180, 0.03)',
    crtGlow: 'rgba(255, 105, 180, 0.04)',
  },
  blue: {
    text: '#4fc3f7',
    textDim: '#1565c0',
    textGhost: 'rgba(79, 195, 247, 0.3)',
    bg: '#000a14',
    prompt: '#4fc3f7',
    accent: '#0288d1',
    scanline: 'rgba(79, 195, 247, 0.03)',
    crtGlow: 'rgba(79, 195, 247, 0.04)',
  },
};

// ── Custom theme store (in-memory, survives until page reload) ───────────
const customThemes: Record<string, ThemeColors> = {};

// ── Public API ────────────────────────────────────────────────────────────

/** Get all theme names (built-in + custom) */
export function getAllThemeNames(): string[] {
  return [...Object.keys(BUILT_IN), ...Object.keys(customThemes)];
}

/** Check if a theme name exists */
export function hasTheme(name: string): boolean {
  return name.toLowerCase() in BUILT_IN || name.toLowerCase() in customThemes;
}

/** Check if a theme is a built-in (cannot be deleted) */
export function isBuiltin(name: string): boolean {
  return name.toLowerCase() in BUILT_IN;
}

/** Get theme colors by name. Falls back to 'amber' if not found. */
export function getThemeColors(name: string): ThemeColors {
  const key = name.toLowerCase();
  return BUILT_IN[key] ?? customThemes[key] ?? BUILT_IN['amber'];
}

/** Get the list of built-in theme names only */
export function getBuiltinNames(): string[] {
  return Object.keys(BUILT_IN);
}

/** Get the list of custom theme names only */
export function getCustomNames(): string[] {
  return Object.keys(customThemes);
}

/**
 * Add a custom theme.
 * Returns { ok: true } or { ok: false, error: string }.
 * 
 * Required keys: text, bg, prompt
 * Optional keys: textDim, textGhost, accent, scanline, crtGlow
 * Missing optional keys get smart defaults derived from `text` color.
 */
export function addTheme(
  name: string,
  colors: Partial<ThemeColors> & { text: string; bg: string; prompt: string },
): { ok: true } | { ok: false; error: string } {
  const key = name.toLowerCase();
  if (key in BUILT_IN) return { ok: false, error: `"${name}" is a built-in theme and cannot be overwritten` };
  if (key.length === 0) return { ok: false, error: 'theme name cannot be empty' };
  if (key.includes(' ')) return { ok: false, error: 'theme name cannot contain spaces' };
  if (/["<>]/.test(key)) return { ok: false, error: 'theme name contains invalid characters' };

  // Validate hex colors
  for (const field of ['text', 'bg', 'prompt'] as const) {
    if (!isValidColor(colors[field])) {
      return { ok: false, error: `invalid color for "${field}": ${colors[field]}. Use hex (#ff0000) or rgba()` };
    }
  }

  // Auto-derive optional fields from `text` if not provided
  const derived = deriveOptionalColors(colors.text, colors.bg);

  customThemes[key] = {
    text: colors.text,
    textDim: colors.textDim || derived.textDim,
    textGhost: colors.textGhost || derived.textGhost,
    bg: colors.bg,
    prompt: colors.prompt,
    accent: colors.accent || derived.accent,
    scanline: colors.scanline || derived.scanline,
    crtGlow: colors.crtGlow || derived.crtGlow,
  };

  return { ok: true };
}

/**
 * Remove a custom theme.
 * Cannot remove built-in themes.
 */
export function removeTheme(name: string): { ok: true } | { ok: false; error: string } {
  const key = name.toLowerCase();
  if (key in BUILT_IN) return { ok: false, error: `"${name}" is a built-in theme and cannot be removed` };
  if (!(key in customThemes)) return { ok: false, error: `theme "${name}" not found` };
  delete customThemes[key];
  return { ok: true };
}

// ── Color helpers ──────────────────────────────────────────────────────────

function isValidColor(c: string): boolean {
  return /^#([0-9a-fA-F]{3}){1,2}$/.test(c) || /^rgba?\(/.test(c);
}

/** Parse hex to {r, g, b} */
function parseHex(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.match(/^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

/** Darken a hex color by a factor (0-1, lower = darker) */
function darken(hex: string, factor: number): string {
  const c = parseHex(hex);
  if (!c) return hex;
  const d = (v: number) => Math.round(v * factor).toString(16).padStart(2, '0');
  return `#${d(c.r)}${d(c.g)}${d(c.b)}`;
}

/** Create rgba string from hex + alpha */
function hexToRgba(hex: string, alpha: number): string {
  const c = parseHex(hex);
  if (!c) return `rgba(200,200,200,${alpha})`;
  return `rgba(${c.r},${c.g},${c.b},${alpha})`;
}

/** Lighten a hex color toward white */
function lighten(hex: string, factor: number): string {
  const c = parseHex(hex);
  if (!c) return hex;
  const l = (v: number) => Math.min(255, Math.round(v + (255 - v) * factor)).toString(16).padStart(2, '0');
  return `#${l(c.r)}${l(c.g)}${l(c.b)}`;
}

/**
 * Auto-derive optional theme colors from the primary text color.
 * This way users only need to provide text, bg, prompt.
 */
function deriveOptionalColors(textColor: string, bgColor: string): Omit<ThemeColors, 'text' | 'bg' | 'prompt'> {
  return {
    textDim: darken(textColor, 0.55),
    textGhost: hexToRgba(textColor, 0.3),
    accent: lighten(textColor, 0.2),
    scanline: hexToRgba(textColor, 0.03),
    crtGlow: hexToRgba(textColor, 0.04),
  };
}
