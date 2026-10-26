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
