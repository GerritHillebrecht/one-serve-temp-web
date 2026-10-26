"use client";

import { useState } from "react";

import { analytics, type AnalyticsRange } from "@/demo/fixtures";
import { formatEuro, formatEuroRounded, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { AppShell } from "./app-shell";

const W = 640;
const X0 = 44;
const X1 = 620;
const Y_TOP = 12;
const Y_BOTTOM = 190;

/** Eine „runde“ Obergrenze für die Achse: 2,6 → 3; 24,1 → 25; 0,42 → 0,5. */
function niceMax(v: number) {
  const exp = Math.pow(10, Math.floor(Math.log10(v)));
  for (const step of [1, 2, 2.5, 5, 10]) if (v <= step * exp) return step * exp;
  return 10 * exp;
}

function formatK(v: number) {
  return v >= 1 ? `${v.toLocaleString("de-DE", { maximumFractionDigits: 1 })}k` : `${Math.round(v * 1000)}`;
}

/** Analytics-Demo: Zeitraum wechseln, Diagramm und Kennzahlen aktualisieren sich; Punkte zeigen Werte. */
export function AnalyticsScreen() {
  const [range, setRange] = useState<AnalyticsRange>("woche");
  const [hover, setHover] = useState<number | null>(null);
  const d = analytics[range];

  const max = niceMax(Math.max(...d.series, ...d.seriesPrevious));
  const n = d.series.length;
  const x = (i: number) => X0 + (n === 1 ? 0 : (i * (X1 - X0)) / (n - 1));
  const y = (v: number) => Y_BOTTOM - (v / max) * (Y_BOTTOM - Y_TOP);
  const path = (vals: number[]) =>
    vals.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const current = path(d.series);
  const grid = [max, max / 2];

  const avg = d.revenue / d.orders;
  const webshop = d.channels.find((c) => c.name === "Webshop")!;
  const share = Math.round((webshop.revenue / d.revenue) * 100);

  return (
    <AppShell
      active="analytics"
      title="Analytics"
      toolbar={
        <div className="seg" role="group" aria-label="Zeitraum">
          {(Object.keys(analytics) as AnalyticsRange[]).map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={r === range}
              className={cn(r === range && "on")}
              onClick={() => {
                setRange(r);
                setHover(null);
              }}
            >
              {analytics[r].label}
            </button>
          ))}
        </div>
      }
      actions={<span className="chip out hide-md">Alle Standorte</span>}
    >
      <div className="body">
        <div className="kpi-row an-kpis" aria-live="polite">
          <div className="kpi">
            <small>Umsatz</small>
            <b className="num">{formatEuroRounded(d.revenue)}</b>
            <span className="delta">
              {d.deltas.revenue} ggü. {d.compareLabel}
            </span>
          </div>
          <div className="kpi">
            <small>Bestellungen</small>
            <b className="num">{formatNumber(d.orders)}</b>
            <span className="delta">{d.deltas.orders}</span>
          </div>
          <div className="kpi">
            <small>Ø Bon</small>
            <b className="num">{formatEuro(avg)}</b>
            <span className="delta">{d.deltas.avgTicket}</span>
          </div>
          <div className="kpi">
            <small>Webshop-Anteil</small>
            <b className="num">{share} %</b>
            <span className="delta">{d.deltas.webshopShare}</span>
          </div>
        </div>
        <div className="an">
          <div className="chart">
            <div className="between">
              <b style={{ fontWeight: 600 }}>
                Umsatz {range === "heute" ? "pro Stunde" : range === "woche" ? "pro Tag" : "pro Woche"}
              </b>
              <div className="legend">
                <span>
                  <i className="lg-solid" />
                  {d.label === "Heute" ? "Heute" : `Diese ${d.label}`}
                </span>
                <span>
                  <i className="lg-dash" />
                  {d.compareLabel}
                </span>
              </div>
            </div>
            <div className="chart-box">
              <svg
                viewBox={`0 0 ${W} 210`}
                preserveAspectRatio="none"
                role="img"
                aria-label={`Umsatzverlauf ${d.label}. Werte erscheinen beim Überfahren der Punkte.`}
              >
                {grid.map((g) => (
                  <g key={g}>
                    <path d={`M${X0} ${y(g)}H${W}`} stroke="#f1f1f1" vectorEffect="non-scaling-stroke" />
                    <text x="0" y={y(g) + 4} fontSize="11" fill="#6b6b6b">
                      {formatK(g)}
                    </text>
                  </g>
                ))}
                <path d={`M${X0} ${Y_BOTTOM}H${W}`} stroke="#e5e5e5" vectorEffect="non-scaling-stroke" />
                <path
                  className="an-path"
                  d={`${current} L${x(n - 1)} ${Y_BOTTOM} L${X0} ${Y_BOTTOM} Z`}
                  fill="#f4f4f4"
                />
                <path
                  className="an-path"
                  d={path(d.seriesPrevious)}
                  fill="none"
                  stroke="#9a9a9a"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  className="an-path"
                  d={current}
                  fill="none"
                  stroke="#000"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                {hover !== null ? (
                  <path
                    d={`M${x(hover)} ${Y_TOP}V${Y_BOTTOM}`}
                    stroke="#141414"
                    strokeDasharray="2 3"
                    vectorEffect="non-scaling-stroke"
                  />
                ) : null}
              </svg>
              <div className="an-hits">
                {d.series.map((v, i) => (
                  <button
                    key={`${range}-${i}`}
                    type="button"
                    className="an-hit"
                    style={{ left: `${(x(i) / W) * 100}%`, width: `${((X1 - X0) / Math.max(1, n - 1) / W) * 100}%` }}
                    onMouseEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    onBlur={() => setHover(null)}
                    aria-label={`${d.xLabels[i]}: ${formatEuroRounded(v * 1000)}, ${d.compareLabel} ${formatEuroRounded(d.seriesPrevious[i] * 1000)}`}
                  />
                ))}
              </div>
              {hover !== null ? (
                <div className="an-tip" style={{ left: `${(x(hover) / W) * 100}%` }}>
                  <b className="num">{formatEuroRounded(d.series[hover] * 1000)}</b>
                  <span className="muted num">
                    {d.xLabels[hover]} · vorher {formatEuroRounded(d.seriesPrevious[hover] * 1000)}
                  </span>
                </div>
              ) : null}
            </div>
            <div className="an-x muted">
              {d.xLabels.map((l, i) => (
                <span
                  key={l}
                  className={cn(n > 8 && i % 2 === 1 && "hide-sm")}
                  style={{ left: `${(x(i) / W) * 100}%` }}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div className="an-col an-side">
            <div className="card" style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
              <b style={{ fontWeight: 600 }}>Umsatz nach Kanal</b>
              {d.channels.map((c, i) => (
                <div key={c.name} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div className="between">
                    <span>{c.name}</span>
                    <span className="num">{formatEuroRounded(c.revenue)}</span>
                  </div>
                  <div className="meter">
                    <i
                      style={{
                        width: `${Math.round((c.revenue / d.revenue) * 100)}%`,
                        background: i === 1 ? "var(--accent)" : i === 2 ? "#9a9a9a" : undefined,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 14, display: "flex", flexDirection: "column", gap: 4 }}>
              <b style={{ fontWeight: 600 }}>Top-Artikel</b>
              <div className="tbl">
                {d.topItems.map((t) => (
                  <div key={t.name}>
                    <span>{t.name}</span>
                    <span className="num muted">{formatNumber(t.count)}×</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
