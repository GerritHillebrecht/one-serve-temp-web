import { weekStats } from "@/demo/fixtures";
import { formatEuro, formatEuroRounded, formatNumber } from "@/lib/format";
import { AppShell } from "./app-shell";

const X0 = 50;
const STEP = 90;
const Y_BOTTOM = 190;
const PX_PER_K = 30; // 6.000 € = 180 px über der Grundlinie
const y = (thousands: number) => Y_BOTTOM - thousands * PX_PER_K;

function toPath(values: number[]) {
  return values.map((v, i) => `${i === 0 ? "M" : "L"}${X0 + i * STEP} ${y(v).toFixed(1)}`).join(" ");
}

/** Analytics: Wochenkennzahlen, Verlauf, Kanäle und Top-Artikel. */
export function AnalyticsScreen() {
  const s = weekStats;
  const avgTicket = s.revenue / s.orders;
  const webshop = s.channels.find((c) => c.name === "Webshop")!;
  const webshopShare = Math.round((webshop.revenue / s.revenue) * 100);
  const current = toPath(s.daily);
  const previous = toPath(s.dailyPrevious);
  const lastX = X0 + (s.daily.length - 1) * STEP;

  return (
    <AppShell
      active="analytics"
      title="Analytics"
      toolbar={
        <div className="seg hide-sm">
          <span>Heute</span>
          <span className="on">Woche</span>
          <span>Monat</span>
        </div>
      }
      actions={<span className="chip out hide-sm">Alle Standorte</span>}
    >
      <div className="body">
        <div className="kpi-row" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))" }}>
          <div className="kpi">
            <small>Umsatz</small>
            <b className="num">{formatEuroRounded(s.revenue)}</b>
            <span className="delta">{s.revenueDelta} ggü. Vorwoche</span>
          </div>
          <div className="kpi">
            <small>Bestellungen</small>
            <b className="num">{formatNumber(s.orders)}</b>
            <span className="delta">{s.ordersDelta}</span>
          </div>
          <div className="kpi">
            <small>Ø Bon</small>
            <b className="num">{formatEuro(avgTicket)}</b>
            <span className="delta">{s.avgTicketDelta}</span>
          </div>
          <div className="kpi">
            <small>Webshop-Anteil</small>
            <b className="num">{webshopShare} %</b>
            <span className="delta">{s.webshopShareDelta}</span>
          </div>
        </div>
        <div className="an">
          <div className="chart">
            <div className="between">
              <b style={{ fontWeight: 600 }}>Umsatz pro Tag</b>
              <div className="legend">
                <span>
                  <i className="lg-solid" />
                  Diese Woche
                </span>
                <span>
                  <i className="lg-dash" />
                  Vorwoche
                </span>
              </div>
            </div>
            <svg viewBox="0 0 640 210" preserveAspectRatio="none" aria-hidden="true">
              {[6, 4, 2].map((k) => (
                <g key={k}>
                  <path d={`M40 ${y(k)}H640`} stroke="#f1f1f1" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  <text x="0" y={y(k) + 4} fontSize="11" fill="#6b6b6b">
                    {k}k
                  </text>
                </g>
              ))}
              <path d={`M40 ${Y_BOTTOM}H640`} stroke="#e5e5e5" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <path d={`${current} L${lastX} ${Y_BOTTOM} L${X0} ${Y_BOTTOM} Z`} fill="#f4f4f4" />
              <path
                d={previous}
                fill="none"
                stroke="#9a9a9a"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
              <path d={current} fill="none" stroke="#000" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="between muted" style={{ fontSize: 11.5, paddingLeft: "6%" }}>
              {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>
          <div className="an-col an-side">
            <div className="card" style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
              <b style={{ fontWeight: 600 }}>Umsatz nach Kanal</b>
              {s.channels.map((c, i) => (
                <div key={c.name} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div className="between">
                    <span>{c.name}</span>
                    <span className="num">{formatEuroRounded(c.revenue)}</span>
                  </div>
                  <div className="meter">
                    <i
                      style={{
                        width: `${Math.round((c.revenue / s.revenue) * 100)}%`,
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
                {s.topItems.map((t) => (
                  <div key={t.name}>
                    <span>{t.name}</span>
                    <span className="num muted">{t.count}×</span>
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
