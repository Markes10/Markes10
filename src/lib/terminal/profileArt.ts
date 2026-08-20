// Colorful ASCII profile art generator
// Uses a grid of color codes mapped to actual colors,
// rendered as HTML spans with block characters (█)

const COLORS: Record<string, string> = {
  // Hair
  'h': '#2C1810', // dark brown
  'H': '#6B4226', // medium brown
  // Skin
  'L': '#F5D0B0', // lightest
  '1': '#EABB94', // light
  '2': '#D4A574', // shadow
  // Eyes
  'b': '#1A0F0A', // eyebrow
  'w': '#E8E8E8', // sclera (white)
  'e': '#3498DB', // iris (blue)
  'p': '#0A1628', // pupil (dark)
  // Mouth
  'm': '#E07A6B', // lips (coral)
  // Neck / Shirt
  'n': '#D4A574', // neck
  's': '#2980B9', // shirt (blue)
  'S': '#1A3C5E', // shirt dark (navy)
};

// Each row is a string of color-code characters.
// '.' = transparent (rendered as space).
// All rows are padded to the same width for alignment.
const GRID: string[] = [
  // Hair (top)
  '..........hhhhhhhhhhhhhhhhhh..........',
  '........hhhhhhhhhhhhhhhhhhhhhh........',
  '......hhhhhHHHHHHHHHHHHHHHhhhhh......',
  '.....hhhhhHHHLLLLLLLLLLLLLHHHhhhh....',
  // Hair + forehead
  '....hhhhHLLLLLLLLLLLLLLLLLLLLLLHhhh...',
  '...hhhHLLLLLLLLLLLLLLLLLLLLLLLLLLHh...',
  '..hhHLLLLLLLLLLLLLLLLLLLLLLLLLLLLHh...',
  '..hHLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLHh..',
  '..hHLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLHh..',
  // Eyebrows
  '..hLLLLLLLLbbLLLLLLLLLLLLLbbLLLLLLh..',
  '..hLLLLLLLLLbbLLLLLLLLLLbbLLLLLLLLh..',
  // Eyes (3 rows: top white, iris+pupil, bottom white)
  '..hLLLLLLLLLwwwwwLLLLLwwwwwLLLLLLh..',
  '..hLLLLLLLLLwwepwLLLLLwwepwLLLLLLh..',
  '..hLLLLLLLLLwwwwwLLLLLwwwwwLLLLLLh..',
  // Cheeks
  '..hLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLh.',
  // Nose (bridge + tip with shadow)
  '..hLLLLLLLLLLLLL2222LLLLLLLLLLLLLLh.',
  '..hLLLLLLLLLL22222222222LLLLLLLLLLh..',
  '..hLLLLLLLLLLLLL2222LLLLLLLLLLLLLLh.',
  // Above mouth
  '..hLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLh.',
  // Mouth (top lip, full, bottom lip)
  '..hLLLLLLLLLLLLLmmmmLLLLLLLLLLLLLLh.',
  '..hLLLLLLLLLLmmmmmmmmmmLLLLLLLLLLh...',
  '..hLLLLLLLLLLLLLmmmmLLLLLLLLLLLLLLh.',
  // Chin + jaw
  '..hHLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLHh.',
  '...hhHLLLLLLLLLLLLLLLLLLLLLLLLLLHhh..',
  '....hhhHLLLLLLLLLLLLLLLLLLLLLLHhhh...',
  '.....hhhhHHHLLLLLLLLLLLLLHHHhhhh.....',
  '......hhhhhHHHHHHHHHHHHHhhhhh........',
  '........hhhhHHHHHHHHHHHHhh...........',
  // Neck
  '..........nnnnnnnnnnnnnnnnnn..........',
  // Shirt
  '..........ssssssssssssssssss..........',
  '.........ssssssssssssssssssss.........',
  '.......SSSSSSSSSSSSSSSSSSSSSSS.......',
  '.....SSSSSSSSSSSSSSSSSSSSSSSSSSSS....',
  '...SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS..',
];

// Normalize all rows to the same width
let _maxW = 0;
for (const r of GRID) { if (r.length > _maxW) _maxW = r.length; }
GRID.forEach((r, i) => { GRID[i] = r.padEnd(_maxW, '.'); });

/**
 * Generates a colorful ASCII portrait as an HTML string.
 * Each cell in the grid maps to a colored block character.
 * Consecutive same-color blocks are grouped into single <span> elements
 * for efficient DOM rendering.
 */
export function createProfileArtHTML(): string {
  return GRID.map(row => {
    let html = '';
    let currentColor: string | null = null;
    let buffer = '';

    for (const char of row) {
      if (char === '.') {
        if (currentColor !== null) {
          html += `<span style="color:${currentColor}">${buffer}</span>`;
          buffer = '';
          currentColor = null;
        }
        html += ' ';
      } else {
        const color = COLORS[char] || '#FFB000';
        if (color === currentColor) {
          buffer += '\u2588';
        } else {
          if (currentColor !== null) {
            html += `<span style="color:${currentColor}">${buffer}</span>`;
          }
          currentColor = color;
          buffer = '\u2588';
        }
      }
    }

    if (currentColor !== null) {
      html += `<span style="color:${currentColor}">${buffer}</span>`;
    }

    return html;
  }).join('\n');
}
