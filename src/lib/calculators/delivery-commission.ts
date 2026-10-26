/**
 * Lieferdienst-Provisionsrechner – reine Berechnungslogik.
 *
 * Annahmen (auf der Rechnerseite offen ausgewiesen):
 * - Provision und Zahlungsgebühr werden als Prozentsatz vom Bestellwert berechnet.
 * - Der Bestellwert ist der Betrag, den die Plattform als Bemessungsgrundlage nimmt
 *   (meist der Bruttobestellwert des Gastes ohne Trinkgeld).
 * - Feste Gebühren fallen pro Bestellung an.
 * - Der Wareneinsatz ist optional und als Prozentsatz vom Bestellwert angegeben.
 * Steuern, Verpackung und Personalkosten sind nicht enthalten.
 */

export type CommissionInput = {
  /** Bestellwert in Euro. */
  orderValue: number;
  /** Provisionssatz in Prozent (z. B. 14). */
  commissionRate: number;
  /** Zahlungs- bzw. Transaktionsgebühr in Prozent. */
  paymentRate: number;
  /** Feste Gebühr pro Bestellung in Euro. */
  fixedFee: number;
  /** Bestellungen pro Monat über diese Plattform. */
  ordersPerMonth: number;
  /** Wareneinsatz in Prozent vom Bestellwert (optional, 0 = nicht berücksichtigen). */
  foodCostRate: number;
};

export type CommissionResult = {
  perOrder: {
    commission: number;
    payment: number;
    fixed: number;
    platformTotal: number;
    remaining: number;
    foodCost: number;
    afterFoodCost: number;
  };
  perMonth: {
    revenue: number;
    platformTotal: number;
    remaining: number;
    afterFoodCost: number;
  };
  /** Plattformkosten in Prozent vom Bestellwert. */
  effectiveRate: number;
};

export const defaults: CommissionInput = {
  orderValue: 30,
  commissionRate: 14,
  paymentRate: 0,
  fixedFee: 0,
  ordersPerMonth: 300,
  foodCostRate: 30,
};

const round2 = (v: number) => Math.round((v + Number.EPSILON) * 100) / 100;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, Number.isFinite(v) ? v : min));

/** Begrenzt Eingaben auf sinnvolle Bereiche, statt mit unsinnigen Werten zu rechnen. */
export function sanitize(input: CommissionInput): CommissionInput {
  return {
    orderValue: clamp(input.orderValue, 0, 100_000),
    commissionRate: clamp(input.commissionRate, 0, 100),
    paymentRate: clamp(input.paymentRate, 0, 100),
    fixedFee: clamp(input.fixedFee, 0, 10_000),
    ordersPerMonth: Math.round(clamp(input.ordersPerMonth, 0, 1_000_000)),
    foodCostRate: clamp(input.foodCostRate, 0, 100),
  };
}

export function calculateCommission(raw: CommissionInput): CommissionResult {
  const i = sanitize(raw);
  const commission = (i.orderValue * i.commissionRate) / 100;
  const payment = (i.orderValue * i.paymentRate) / 100;
  const fixed = i.fixedFee;
  const platformTotal = commission + payment + fixed;
  const remaining = i.orderValue - platformTotal;
  const foodCost = (i.orderValue * i.foodCostRate) / 100;
  const afterFoodCost = remaining - foodCost;

  return {
    perOrder: {
      commission: round2(commission),
      payment: round2(payment),
      fixed: round2(fixed),
      platformTotal: round2(platformTotal),
      remaining: round2(remaining),
      foodCost: round2(foodCost),
      afterFoodCost: round2(afterFoodCost),
    },
    perMonth: {
      revenue: round2(i.orderValue * i.ordersPerMonth),
      platformTotal: round2(platformTotal * i.ordersPerMonth),
      remaining: round2(remaining * i.ordersPerMonth),
      afterFoodCost: round2(afterFoodCost * i.ordersPerMonth),
    },
    effectiveRate: i.orderValue > 0 ? round2((platformTotal / i.orderValue) * 100) : 0,
  };
}
