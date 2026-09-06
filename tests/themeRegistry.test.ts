import {
  getThemeColors,
  getAllThemeNames,
  hasTheme,
  isBuiltin,
  getBuiltinNames,
} from '@/lib/terminal/themeRegistry';

describe('themeRegistry', () => {
  it('returns colors for a known theme', () => {
    const colors = getThemeColors('amber');
    expect(colors).toBeDefined();
    expect(colors.text).toBe('#e8c489');
    expect(colors.bg).toBe('#0b0805');
  });

  it('returns fallback for unknown theme', () => {
    const colors = getThemeColors('nonexistent');
    expect(colors).toBeDefined();
    expect(colors.text).toBeDefined();
  });

  it('lists all theme names', () => {
    const names = getAllThemeNames();
    expect(names).toContain('amber');
    expect(names).toContain('green');
    expect(names).toContain('matrix');
    expect(names.length).toBeGreaterThan(3);
  });

  it('checks theme existence', () => {
    expect(hasTheme('amber')).toBe(true);
    expect(hasTheme('nonexistent')).toBe(false);
  });

  it('identifies built-in themes', () => {
    expect(isBuiltin('amber')).toBe(true);
    expect(isBuiltin('nonexistent')).toBe(false);
  });

  it('lists built-in theme names', () => {
    const names = getBuiltinNames();
    expect(names).toContain('amber');
    expect(names).toContain('green');
  });
});
