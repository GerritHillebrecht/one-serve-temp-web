"use client";

import { useMemo, useState } from "react";

import { NumberField } from "@/components/calculator/number-field";
import { calculateCommission, defaults, type CommissionInput } from "@/lib/calculators/delivery-commission";
import { formatEuro } from "@/lib/format";
import { cn } from "@/lib/utils";

const PRESETS: { label: string; rate: number }[] = [
  { label: "Eigene Lieferung · 14 %", rate: 14 },
  { label: "Lieferung durch die Plattform · 30 %", rate: 30 },
];

const pct = (v: number) => `${v.toLocaleString("de-DE", { maximumFractionDigits: 2 })} %`;

/**
 * Lieferdienst-Provisionsrechner. Rechnet sofort, ohne Absenden.
 * `compact` zeigt eine reduzierte Variante für die Startseite.
 */
export function DeliveryCommissionCalculator({ compact = false }: { compact?: boolean }) {
  const [input, setInput] = useState<CommissionInput>(defaults);
  const r = useMemo(() => calculateCommission(input), [input]);
  const set = (k: keyof CommissionInput) => (v: number) => setInput((i) => ({ ...i, [k]: v }));

  const total = input.orderValue > 0 ? input.orderValue : 1;
  const segments = [
    { key: "remaining", label: "Verbleibt dir", value: Math.max(0, r.perOrder.remaining), cls: "bg-black" },
    { key: "commission", label: "Provision", value: r.perOrder.commission, cls: "bg-brand" },
    { key: "payment", label: "Zahlungsgebühr", value: r.perOrder.payment, cls: "bg-gray-400" },
    { key: "fixed", label: "Feste Gebühr", value: r.perOrder.fixed, cls: "bg-gray-300" },
  ].filter((s) => s.value > 0);

  return (
    <div className={cn("grid gap-6", !compact && "lg:grid-cols-[1fr_1fr] lg:gap-10")}>
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()} aria-label="Eingaben">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Vorlage für den Provisionssatz</span>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Vorlage">
            {PRESETS.map((p) => (
              <button
                key={p.rate}
                type="button"
                aria-pressed={input.commissionRate === p.rate}
                onClick={() => set("commissionRate")(p.rate)}
                className={cn(
                  "min-h-10 rounded-full px-4 text-sm font-medium transition-colors duration-base",
                  input.commissionRate === p.rate
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-150",
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
          {!compact ? (
            <p className="text-[13px] text-gray-500">
              Sätze laut Lieferando-Fact-Sheet (März 2023). Trag für ein genaues Ergebnis den Satz aus deinem Vertrag
              ein.
            </p>
          ) : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField label="Bestellwert" unit="€" step={1} value={input.orderValue} onChange={set("orderValue")} />
          <NumberField
            label="Provisionssatz"
            unit="%"
            step={0.5}
            max={100}
            value={input.commissionRate}
            onChange={set("commissionRate")}
          />
          {!compact ? (
            <>
              <NumberField
                label="Zahlungsgebühr"
                unit="%"
                step={0.1}
                max={100}
                value={input.paymentRate}
                onChange={set("paymentRate")}
                help="Nur eintragen, wenn sie zusätzlich zur Provision berechnet wird."
              />
              <NumberField
                label="Feste Gebühr pro Bestellung"
                unit="€"
                step={0.1}
                value={input.fixedFee}
                onChange={set("fixedFee")}
              />
              <NumberField
                label="Bestellungen pro Monat"
                unit="Stück"
                step={10}
                value={input.ordersPerMonth}
                onChange={set("ordersPerMonth")}
              />
              <NumberField
                label="Wareneinsatz"
                unit="%"
                step={1}
                max={100}
                value={input.foodCostRate}
                onChange={set("foodCostRate")}
                help="Optional. 0 eintragen, um ihn nicht zu berücksichtigen."
              />
            </>
          ) : null}
        </div>
      </form>

      <div className="flex flex-col gap-5 rounded-lg border border-border bg-white p-5 sm:p-7" aria-live="polite">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500">Verbleibt dir pro Bestellung</span>
          <span className="tabular text-[44px] font-semibold leading-none tracking-[-0.04em]">
            {formatEuro(r.perOrder.remaining)}
          </span>
          <span className="text-sm text-gray-600">
            Plattformkosten {formatEuro(r.perOrder.platformTotal)} · effektiv {pct(r.effectiveRate)} vom Bestellwert
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex h-3 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
            {segments.map((s) => (
              <span
                key={s.key}
                className={cn("h-full transition-[width] duration-slow ease-standard", s.cls)}
                style={{ width: `${(s.value / total) * 100}%` }}
              />
            ))}
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-gray-600">
            {segments.map((s) => (
              <li key={s.key} className="flex items-center gap-1.5">
                <span className={cn("size-2 rounded-[2px]", s.cls)} aria-hidden="true" />
                {s.label} {formatEuro(s.value)}
              </li>
            ))}
          </ul>
        </div>

        {!compact ? (
          <table className="w-full text-left text-[15px]">
            <caption className="sr-only">Ergebnis pro Bestellung und pro Monat</caption>
            <thead>
              <tr className="border-b border-gray-900 text-[13px] text-gray-500">
                <th scope="col" className="py-2 font-medium">
                  Posten
                </th>
                <th scope="col" className="py-2 text-right font-medium">
                  Pro Bestellung
                </th>
                <th scope="col" className="py-2 text-right font-medium">
                  Pro Monat
                </th>
              </tr>
            </thead>
            <tbody className="tabular">
              <tr className="border-b border-border">
                <th scope="row" className="py-2.5 font-normal">
                  Umsatz
                </th>
                <td className="text-right">{formatEuro(input.orderValue)}</td>
                <td className="text-right">{formatEuro(r.perMonth.revenue)}</td>
              </tr>
              <tr className="border-b border-border">
                <th scope="row" className="py-2.5 font-normal">
                  Plattformkosten
                </th>
                <td className="text-right">− {formatEuro(r.perOrder.platformTotal)}</td>
                <td className="text-right">− {formatEuro(r.perMonth.platformTotal)}</td>
              </tr>
              <tr className="border-b border-border font-medium">
                <th scope="row" className="py-2.5 font-medium">
                  Verbleibt vor weiteren Kosten
                </th>
                <td className="text-right">{formatEuro(r.perOrder.remaining)}</td>
                <td className="text-right">{formatEuro(r.perMonth.remaining)}</td>
              </tr>
              {input.foodCostRate > 0 ? (
                <tr>
                  <th scope="row" className="py-2.5 font-normal">
                    Nach Wareneinsatz
                  </th>
                  <td className="text-right">{formatEuro(r.perOrder.afterFoodCost)}</td>
                  <td className="text-right">{formatEuro(r.perMonth.afterFoodCost)}</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}
