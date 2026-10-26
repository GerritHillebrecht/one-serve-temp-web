/**
 * Motion-Tokens für JavaScript-gesteuerte Animationen.
 * Spiegeln die CSS-Variablen in globals.css (--os-duration-*, --os-ease-*).
 */
export const duration = {
  fast: 160,
  base: 240,
  slow: 420,
} as const;

export const ease = {
  standard: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  exit: "cubic-bezier(0.4, 0, 1, 1)",
} as const;

export const distance = {
  sm: 6,
  md: 12,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
