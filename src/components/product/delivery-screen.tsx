import { Check } from "lucide-react";

import { AppShell } from "./app-shell";

const steps = [
  { label: "Angenommen", time: "18:31", done: true },
  { label: "Zubereitet", time: "18:46", done: true },
  { label: "Abgeholt · Jonas W.", time: "18:49", done: true },
  { label: "Zugestellt", time: "~18:58", done: false },
];

/** Liefermanagement: aktive Lieferungen, Fahrer und Route. */
export function DeliveryScreen() {
  return (
    <AppShell
      active="delivery"
      title="Delivery"
      toolbar={
        <div className="seg hide-sm">
          <span className="on">
            Aktiv <em>5</em>
          </span>
          <span>
            Erledigt <em>38</em>
          </span>
        </div>
      }
    >
      <div className="dv">
        <div className="dv-list">
          <div className="dv-o">
            <div className="between">
              <b className="num">#3381 · Lieferplattform</b>
              <span className="status cook">
                <span className="dot cook" />
                In Zubereitung
              </span>
            </div>
            <span className="muted">Funghi, Tiramisu · Abholung durch Fahrer 19:05</span>
          </div>
          <div className="dv-o">
            <div className="between">
              <b className="num">#1044 · Webshop</b>
              <span className="status ready">
                <span className="dot ready" />
                Bereit
              </span>
            </div>
            <div className="between">
              <span className="muted">Lindenallee 7 · 2,1 km</span>
              <span className="mbtn sm">Fahrer zuweisen</span>
            </div>
          </div>
          <div className="dv-o sel">
            <div className="between">
              <b className="num">#1040 · Webshop</b>
              <span className="status away">Unterwegs</span>
            </div>
            <span className="muted">Am Markt 12 · Jonas W. · ca. 6 Min.</span>
          </div>
          <div className="dv-o">
            <div className="between">
              <b className="num">#1037 · Webshop</b>
              <span className="status">Zugestellt</span>
            </div>
            <span className="muted">Musterweg 4 · 18:52</span>
          </div>
          <div className="dv-drivers">
            <div className="between">
              <span className="row">
                <span className="av">JW</span>Jonas W.
              </span>
              <span className="muted">unterwegs · 1</span>
            </div>
            <div className="between">
              <span className="row">
                <span className="av">SK</span>Sara K.
              </span>
              <span style={{ color: "var(--os-positive)", fontWeight: 500 }}>frei</span>
            </div>
          </div>
        </div>
        <div className="map" aria-hidden="true">
          <svg viewBox="0 0 600 460" preserveAspectRatio="xMidYMid slice">
            <path
              d="M0 90H600M0 210H600M0 330H600M0 420H600M90 0V460M230 0V460M360 0V460M500 0V460"
              stroke="#fff"
              strokeWidth="12"
              fill="none"
            />
            <path d="M0 40L600 400M160 460L600 140" stroke="#fff" strokeWidth="7" fill="none" />
            <path d="M300 0Q290 120 320 230T300 460" stroke="#dce6ee" strokeWidth="22" fill="none" />
            <path
              d="M90 330V210H230V90H360"
              stroke="#141414"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M360 90H500"
              stroke="#141414"
              strokeWidth="4"
              fill="none"
              strokeDasharray="2 9"
              strokeLinecap="round"
            />
            <rect x="78" y="318" width="24" height="24" rx="6" fill="#141414" />
            <circle cx="360" cy="90" r="11" fill="#fff" stroke="#141414" strokeWidth="4" />
            <circle cx="500" cy="90" r="9" fill="var(--accent)" stroke="#fff" strokeWidth="4" />
          </svg>
          <div className="map-card">
            <div className="between">
              <b style={{ fontWeight: 600 }}>#1040 · Am Markt 12</b>
              <span className="muted num">ca. 6 Min.</span>
            </div>
            <div className="steps-mini">
              {steps.map((s) => (
                <div key={s.label}>
                  <i className={s.done ? undefined : "next"}>{s.done ? <Check size={9} strokeWidth={4} /> : null}</i>
                  <span>{s.label}</span>
                  <span className="muted num">{s.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
