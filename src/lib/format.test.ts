import { describe, expect, it } from "vitest";

import { formatAmount, formatEuro, formatEuroRounded, formatNumber, parseGermanNumber } from "./format";

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

describe("Zahleneingabe de-DE", () => {
  it("liest Komma, Punkt und Tausenderpunkt", () => {
    expect(parseGermanNumber("12,5")).toBe(12.5);
    expect(parseGermanNumber("12.5")).toBe(12.5);
    expect(parseGermanNumber("1.500")).toBe(1500);
    expect(parseGermanNumber("1.500,75")).toBe(1500.75);
    expect(parseGermanNumber("")).toBe(0);
    expect(parseGermanNumber("abc")).toBe(0);
  });
});
