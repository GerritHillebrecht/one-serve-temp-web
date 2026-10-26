"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { deliveries as initial, drivers, type Delivery, type DeliveryStatus } from "@/demo/fixtures";
import { cn } from "@/lib/utils";
import { AppShell } from "./app-shell";

const STATUS: Record<DeliveryStatus, { label: string; cls: string }> = {
  cooking: { label: "In Zubereitung", cls: "cook" },
  ready: { label: "Bereit", cls: "ready" },
  onroute: { label: "Unterwegs", cls: "away" },
  delivered: { label: "Zugestellt", cls: "" },
};
const ORDER: DeliveryStatus[] = ["cooking", "ready", "onroute", "delivered"];
const STEP_LABELS = ["Angenommen", "Zubereitet", "Abgeholt", "Zugestellt"];

/**
 * Delivery-Demo: Status weiterschalten, Fahrer zuweisen, Zustellung bestätigen.
 * Die Karte zeigt die Route der ausgewählten Lieferung.
 */
export function DeliveryScreen() {
  const [list, setList] = useState<Delivery[]>(initial);
  const [selectedId, setSelectedId] = useState("1040");
  const [assigning, setAssigning] = useState<string | null>(null);

  const selected = list.find((d) => d.id === selectedId)!;
  const busy = new Set(list.filter((d) => d.status === "onroute").map((d) => d.driverId));
  const update = (id: string, patch: Partial<Delivery>) =>
    setList((l) => l.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  const active = list.filter((d) => d.status !== "delivered").length;
  const stepIndex = ORDER.indexOf(selected.status);

  return (
    <AppShell
      active="delivery"
      title="Delivery"
      toolbar={
        <div className="seg hide-sm">
          <span className="on">
            Aktiv <em>{active}</em>
          </span>
          <span>
            Erledigt <em>{38 + list.length - active - 1}</em>
          </span>
        </div>
      }
    >
      <div className="dv">
        <div className="dv-list">
          {list.map((d) => {
            const st = STATUS[d.status];
            const driver = drivers.find((x) => x.id === d.driverId);
            return (
              <div key={d.id} className={cn("dv-o", d.id === selectedId && "sel")}>
                <button
                  type="button"
                  className="dv-pick"
                  onClick={() => setSelectedId(d.id)}
                  aria-pressed={d.id === selectedId}
                >
                  <span className="between">
                    <b className="num">
                      {d.label} · {d.source}
                    </b>
                    <span className={cn("status", st.cls)}>
                      {st.cls === "cook" || st.cls === "ready" ? <span className={cn("dot", st.cls)} /> : null}
                      {st.label}
                    </span>
                  </span>
                  <span className="muted">
                    {d.address}
                    {driver ? ` · ${driver.name}` : ""}
                    {d.status === "onroute" && d.eta ? ` · ${d.eta}` : ""}
                  </span>
                </button>
                {d.status === "cooking" ? (
                  <button type="button" className="mbtn ghost sm" onClick={() => update(d.id, { status: "ready" })}>
                    Als fertig melden
                  </button>
                ) : null}
                {d.status === "ready" && assigning !== d.id ? (
                  <button type="button" className="mbtn sm" onClick={() => setAssigning(d.id)}>
                    Fahrer zuweisen
                  </button>
                ) : null}
                {d.status === "ready" && assigning === d.id ? (
                  <div className="row" role="group" aria-label="Fahrer wählen" style={{ flexWrap: "wrap", gap: 6 }}>
                    {drivers.map((x) => (
                      <button
                        key={x.id}
                        type="button"
                        className="chip out"
                        disabled={busy.has(x.id)}
                        onClick={() => {
                          update(d.id, { status: "onroute", driverId: x.id, eta: "ca. 12 Min." });
                          setAssigning(null);
                          setSelectedId(d.id);
                        }}
                      >
                        {x.name}
                        {busy.has(x.id) ? " · unterwegs" : ""}
                      </button>
                    ))}
                  </div>
                ) : null}
                {d.status === "onroute" ? (
                  <button type="button" className="mbtn ghost sm" onClick={() => update(d.id, { status: "delivered" })}>
                    Zustellung bestätigen
                  </button>
                ) : null}
              </div>
            );
          })}
          <div className="dv-drivers">
            {drivers.map((x) => (
              <div className="between" key={x.id}>
                <span className="row">
                  <span className="av">{x.initials}</span>
                  {x.name}
                </span>
                {busy.has(x.id) ? (
                  <span className="muted">unterwegs</span>
                ) : (
                  <span style={{ color: "var(--os-positive)", fontWeight: 500 }}>frei</span>
                )}
              </div>
            ))}
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
            <rect x="78" y="318" width="24" height="24" rx="6" fill="#141414" />
            {selected.status === "onroute" || selected.status === "delivered" ? (
              <>
                <path
                  className="route"
                  d="M90 330V210H230V90H500"
                  stroke="#141414"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={selected.status === "delivered" ? undefined : "2 9"}
                />
                <circle
                  cx={selected.status === "delivered" ? 500 : 360}
                  cy="90"
                  r="11"
                  fill="#fff"
                  stroke="#141414"
                  strokeWidth="4"
                  className="driver-dot"
                />
              </>
            ) : null}
            <circle cx="500" cy="90" r="9" fill="var(--accent)" stroke="#fff" strokeWidth="4" />
          </svg>
          <div className="map-card">
            <div className="between">
              <b style={{ fontWeight: 600 }}>
                {selected.label} · {selected.address}
              </b>
              <span className="muted num">{selected.status === "onroute" ? selected.eta : ""}</span>
            </div>
            <div className="steps-mini">
              {STEP_LABELS.map((label, i) => {
                const done = i <= stepIndex;
                const isNext = i === stepIndex + 1;
                return (
                  <div key={label}>
                    <i className={done ? undefined : isNext ? "next" : "todo"}>
                      {done ? <Check size={9} strokeWidth={4} /> : null}
                    </i>
                    <span className={cn(!done && "muted")}>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
