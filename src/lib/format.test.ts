import { describe, expect, it } from "vitest";

import { formatAmount, formatEuro, formatEuroRounded, formatNumber } from "./format";

// Intl setzt zwischen Betrag und € ein geschütztes Leerzeichen.
const nb = (s: string) => s.replace(/ /g, " ");

describe("Formatierung de-DE", () => {
  it("formatiert Euro mit Komma und zwei Nachkommastellen", () => {
    expect(nb(formatEuro(40.4))).toBe("40,40 €");
  });
  it("formatiert gerundete Euro mit Tausenderpunkt", () => {
    expect(nb(formatEuroRounded(24130))).toBe("24.130 €");
  });
  it("formatiert Zahlen und Beträge", () => {
    expect(formatNumber(1284)).toBe("1.284");
    expect(formatAmount(58.4)).toBe("58,40");
  });
});
