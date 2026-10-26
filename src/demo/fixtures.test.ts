import { describe, expect, it } from "vitest";

import { board, menu, shiftWeek, team, weekStats } from "./fixtures";

describe("Demo-Daten sind in sich stimmig", () => {
  it("Kanalumsätze ergeben den Wochenumsatz", () => {
    const sum = weekStats.channels.reduce((s, c) => s + c.revenue, 0);
    expect(sum).toBe(weekStats.revenue);
  });

  it("Tagesumsätze ergeben den Wochenumsatz (in Tausend Euro)", () => {
    const sum = weekStats.daily.reduce((s, d) => s + d, 0);
    expect(Math.round(sum * 1000)).toBe(weekStats.revenue);
  });

  it("jede Dienstplan-Zeile gehört zu einem Teammitglied und hat 7 Tage", () => {
    for (const row of shiftWeek.rows) {
      expect(team.some((m) => m.id === row.memberId)).toBe(true);
      expect(row.shifts).toHaveLength(7);
    }
    expect(shiftWeek.open).toHaveLength(7);
  });

  it("Artikel-IDs sind eindeutig", () => {
    const ids = menu.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("Bestellübersicht hat vier Spalten mit eindeutigen Bestellungen", () => {
    expect(board).toHaveLength(4);
    const ids = board.flatMap((l) => l.orders.map((o) => o.id));
    expect(new Set(ids).size).toBe(ids.length);
  });
});
