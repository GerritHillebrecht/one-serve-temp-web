"use client";

import { useMemo, useState } from "react";
import { Check, ChevronLeft, Minus, Plus } from "lucide-react";

import { menu, restaurant, type MenuItem } from "@/demo/fixtures";
import { formatEuro } from "@/lib/format";
import { cn } from "@/lib/utils";

type View = "menu" | "checkout" | "done";
type Mode = "Abholung" | "Lieferung";

const TABS: { key: MenuItem["category"]; label: string }[] = [
  { key: "pizza", label: "Pizza" },
  { key: "salate", label: "Salate" },
  { key: "getraenke", label: "Getränke" },
  { key: "desserts", label: "Desserts" },
];
const TIMES = ["18:45", "19:00", "19:15", "19:30"];
const byId = (id: string) => menu.find((m) => m.id === id)!;
const displayName = (m: MenuItem) => (m.category === "pizza" && m.id !== "calzone" ? `Pizza ${m.name}` : m.name);

/**
 * Webshop-Demo: Gast stellt Warenkorb zusammen und bestellt. Die Bestellung
 * erscheint rechts sofort in der Bestellübersicht des Restaurants.
 */
export function WebshopScreen() {
  const [view, setView] = useState<View>("menu");
  const [tab, setTab] = useState<MenuItem["category"]>("pizza");
  const [cart, setCart] = useState<Record<string, number>>({ margherita: 2, burrata: 1, limonade: 1 });
  const [mode, setMode] = useState<Mode>("Abholung");
  const [time, setTime] = useState("19:00");

  const lines = useMemo(() => Object.entries(cart).filter(([, q]) => q > 0), [cart]);
  const count = lines.reduce((s, [, q]) => s + q, 0);
  const total = lines.reduce((s, [id, q]) => s + q * byId(id).price, 0);

  const change = (id: string, d: number) => setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + d) }));

  return (
    <div className="phones">
      <div className="phone">
        <div className="phone-in">
          {view === "menu" ? (
            <>
              <div className="ph-pad" style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 12 }}>
                <span className="ph-title">{restaurant.name}</span>
                <span className="muted" style={{ fontSize: 12 }}>
                  Italienisch · {restaurant.location}
                </span>
                <div className="toggle" role="group" aria-label="Bestellart">
                  {(["Abholung", "Lieferung"] as Mode[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      aria-pressed={m === mode}
                      className={cn(m === mode && "on")}
                      onClick={() => setMode(m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className="ph-tabs" role="group" aria-label="Kategorien">
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    aria-pressed={t.key === tab}
                    className={cn(t.key === tab && "on")}
                    onClick={() => setTab(t.key)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="ph-scroll">
                {menu
                  .filter((m) => m.category === tab)
                  .slice(0, 5)
                  .map((p) => {
                    const q = cart[p.id] ?? 0;
                    return (
                      <div className="item" key={p.id}>
                        <div>
                          <b>{displayName(p)}</b>
                          {p.description ? <p>{p.description}</p> : null}
                          <div className="pr num">{formatEuro(p.price)}</div>
                        </div>
                        <div className="thumb">
                          {q > 0 ? (
                            <span className="qty">
                              <button
                                type="button"
                                onClick={() => change(p.id, -1)}
                                aria-label={`${p.name} verringern`}
                              >
                                <Minus size={12} strokeWidth={2.6} aria-hidden="true" />
                              </button>
                              <span aria-live="polite">{q}</span>
                              <button type="button" onClick={() => change(p.id, 1)} aria-label={`${p.name} erhöhen`}>
                                <Plus size={12} strokeWidth={2.6} aria-hidden="true" />
                              </button>
                            </span>
                          ) : (
                            <button
                              type="button"
                              className="add"
                              onClick={() => change(p.id, 1)}
                              aria-label={`${p.name} in den Warenkorb`}
                            >
                              <Plus size={14} strokeWidth={2.4} aria-hidden="true" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
              <button type="button" className="ph-bar" disabled={count === 0} onClick={() => setView("checkout")}>
                <span className="row" style={{ gap: 10 }}>
                  <em>{count}</em>Warenkorb
                </span>
                <span className="num">{formatEuro(total)}</span>
              </button>
            </>
          ) : view === "checkout" ? (
            <>
              <div className="ph-pad row" style={{ paddingBottom: 14 }}>
                <button
                  type="button"
                  className="ph-back"
                  onClick={() => setView("menu")}
                  aria-label="Zurück zur Speisekarte"
                >
                  <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
                </button>
                <b style={{ fontSize: 17, fontWeight: 600 }}>Bestellung prüfen</b>
              </div>
              <div className="ph-scroll">
                <div className="ph-sec" style={{ borderTop: "1px solid var(--os-gray-150)" }}>
                  <small>{mode}, heute</small>
                  <div className="time-pills" role="group" aria-label="Uhrzeit">
                    {TIMES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={t === time}
                        className={cn("chip", t === time ? "on" : "out")}
                        onClick={() => setTime(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="ph-sec">
                  <small>Deine Bestellung</small>
                  {lines.map(([id, q]) => (
                    <div className="between" key={id}>
                      <span>
                        {q}× {displayName(byId(id))}
                      </span>
                      <span className="num">{formatEuro(q * byId(id).price)}</span>
                    </div>
                  ))}
                </div>
                <div className="ph-sec" style={{ borderBottom: 0 }}>
                  <div className="between">
                    <b style={{ fontWeight: 600 }}>Gesamt</b>
                    <b className="num" style={{ fontWeight: 600 }}>
                      {formatEuro(total)}
                    </b>
                  </div>
                </div>
              </div>
              <button type="button" className="ph-bar" onClick={() => setView("done")}>
                <span>Jetzt bestellen</span>
                <span className="num">{formatEuro(total)}</span>
              </button>
            </>
          ) : (
            <div className="ph-done" role="status">
              <span className="pos-paid-ic">
                <Check size={18} strokeWidth={3} aria-hidden="true" />
              </span>
              <b>Danke für deine Bestellung</b>
              <span className="muted">
                #1043 · {mode} heute {time}
              </span>
              <span className="muted" style={{ fontSize: 12 }}>
                Demo: Es wurde nichts bestellt.
              </span>
              <button
                type="button"
                className="mbtn ghost"
                onClick={() => {
                  setCart({});
                  setView("menu");
                }}
              >
                Neue Bestellung
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="shop-feed win" aria-live="polite">
        <div className="top">
          <h4>Bestellungen</h4>
          <span className="demo" style={{ marginLeft: "auto" }}>
            Restaurant
          </span>
        </div>
        <div className="body" style={{ gap: 8 }}>
          {view === "done" ? (
            <div className="oc fresh shop-new">
              <div className="oc-h">
                <b className="num">#1043</b>
                <span className="chip">Webshop</span>
                <span className="t">gerade eben</span>
              </div>
              <div className="oc-i">{lines.map(([id, q]) => `${q}× ${byId(id).name}`).join(", ")}</div>
              <div className="oc-f">
                <span>
                  {mode} {time}
                </span>
                <span className="num">{formatEuro(total)}</span>
              </div>
            </div>
          ) : (
            <p className="muted" style={{ fontSize: 12.5 }}>
              Bestellungen aus dem Webshop erscheinen hier ohne Umweg.
            </p>
          )}
          <div className="oc">
            <div className="oc-h">
              <b className="num">#1039</b>
              <span className="chip">Webshop</span>
              <span className="t num">09:40</span>
            </div>
            <div className="oc-i">Quattro Formaggi, Insalata mista</div>
          </div>
          <div className="oc">
            <div className="oc-h">
              <b>Tisch 7</b>
              <span className="chip">Vor Ort</span>
              <span className="t num">06:12</span>
            </div>
            <div className="oc-i">Antipasti, Diavola, Lasagne</div>
          </div>
        </div>
      </div>
    </div>
  );
}
