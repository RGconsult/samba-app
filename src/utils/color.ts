function hexToRgb(hex: string) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

/** True alpha transparency — only safe for elements fully contained within an opaque parent (a pill behind an icon, a chip border), never for a header/tab bar that sits over scrollable content. */
export function hexToRgba(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Blends `hex` into `base` by `ratio` (0 = pure base, 1 = pure hex) and returns an opaque hex color — use this for header/tab bar backgrounds so nothing bleeds through on scroll. */
export function mixColor(hex: string, base: string, ratio: number): string {
  const a = hexToRgb(hex);
  const b = hexToRgb(base);
  const mix = (x: number, y: number) => Math.round(x * ratio + y * (1 - ratio));
  const r = mix(a.r, b.r);
  const g = mix(a.g, b.g);
  const bl = mix(a.b, b.b);
  return `#${[r, g, bl].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

/**
 * A brand color, adjusted so it stays legible as text/icons/borders on a
 * themed surface. Some brand primaries (e.g. coffee's near-black maroon,
 * matched from the real logo) read fine on a light card but nearly vanish as
 * text on a dark one — this lightens toward white in dark mode so the same
 * `brand.colors.primary` value can be reused as page-background-adjacent
 * text everywhere without a per-brand exception. Leave solid fills (buttons,
 * pills with white text on top) on the raw brand color — contrast there
 * doesn't depend on theme.
 */
export function accentForTheme(hex: string, isDark: boolean): string {
  return isDark ? mixColor(hex, '#ffffff', 0.5) : hex;
}
