const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
const euroRounded = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const number = new Intl.NumberFormat("de-DE");

/** 40.4 → "40,40 €" */
export function formatEuro(value: number): string {
  return euro.format(value);
}

/** 24130 → "24.130 €" */
export function formatEuroRounded(value: number): string {
  return euroRounded.format(value);
}

/** 1284 → "1.284" */
export function formatNumber(value: number): string {
  return number.format(value);
}

/** 40.4 → "40,40" (ohne Währungszeichen, z. B. für Bons) */
export function formatAmount(value: number): string {
  return value.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Liest eine deutsch eingegebene Zahl: „12,5“ → 12.5, „1.500“ → 1500, „12.5“ → 12.5.
 * Ungültige Eingaben ergeben 0.
 */
export function parseGermanNumber(text: string): number {
  const cleaned = text
    .replace(/\s/g, "")
    .replace(/\.(?=\d{3}(\D|$))/g, "")
    .replace(",", ".");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}
