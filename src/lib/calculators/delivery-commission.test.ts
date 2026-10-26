import { describe, expect, it } from "vitest";

import { calculateCommission, defaults, sanitize } from "./delivery-commission";

describe("Lieferdienst-Provisionsrechner", () => {
  it("rechnet 30 % Provision auf 30 € Bestellwert", () => {
    const r = calculateCommission({ ...defaults, commissionRate: 30, foodCostRate: 0 });
    expect(r.perOrder.commission).toBe(9);
    expect(r.perOrder.remaining).toBe(21);
    expect(r.effectiveRate).toBe(30);
  });

  it("rechnet 14 % Provision auf 30 € Bestellwert", () => {
    const r = calculateCommission({ ...defaults, commissionRate: 14 });
    expect(r.perOrder.commission).toBe(4.2);
    expect(r.perOrder.remaining).toBe(25.8);
  });

  it("addiert Zahlungsgebühr und feste Gebühr zu den Plattformkosten", () => {
    const r = calculateCommission({ ...defaults, commissionRate: 14, paymentRate: 1.5, fixedFee: 0.5 });
    // 4,20 + 0,45 + 0,50 = 5,15
    expect(r.perOrder.platformTotal).toBe(5.15);
    expect(r.perOrder.remaining).toBe(24.85);
    expect(r.effectiveRate).toBe(17.17);
  });

  it("berücksichtigt den Wareneinsatz optional", () => {
    const r = calculateCommission({ ...defaults, commissionRate: 30, foodCostRate: 30 });
    expect(r.perOrder.foodCost).toBe(9);
    expect(r.perOrder.afterFoodCost).toBe(12);
  });

  it("hochrechnet auf den Monat", () => {
    const r = calculateCommission({ ...defaults, commissionRate: 30, ordersPerMonth: 300, foodCostRate: 0 });
    expect(r.perMonth.revenue).toBe(9000);
    expect(r.perMonth.platformTotal).toBe(2700);
    expect(r.perMonth.remaining).toBe(6300);
  });

  it("liefert bei Bestellwert 0 keine Division durch null", () => {
    const r = calculateCommission({ ...defaults, orderValue: 0 });
    expect(r.effectiveRate).toBe(0);
    expect(r.perOrder.remaining).toBe(0);
  });

  it("begrenzt unsinnige Eingaben", () => {
    const s = sanitize({
      ...defaults,
      commissionRate: 140,
      paymentRate: -3,
      ordersPerMonth: 12.7,
      orderValue: Number.NaN,
    });
    expect(s.commissionRate).toBe(100);
    expect(s.paymentRate).toBe(0);
    expect(s.ordersPerMonth).toBe(13);
    expect(s.orderValue).toBe(0);
  });
});
