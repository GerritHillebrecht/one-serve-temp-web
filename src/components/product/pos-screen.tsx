"use client";

import { useMemo, useState } from "react";
import { Check, Minus } from "lucide-react";

import { menu, type MenuItem } from "@/demo/fixtures";
import { formatAmount, formatEuro } from "@/lib/format";
import { cn } from "@/lib/utils";

type Line = { id: string; qty: number; note?: string };
type PayMethod = "Bar" | "Karte" | "Teilen";

const CATEGORIES: { key: MenuItem["category"]; label: string }[] = [
  { key: "pizza", label: "Pizza" },
  { key: "salate", label: "Salate" },
  { key: "getraenke", label: "Getränke" },
  { key: "desserts", label: "Desserts" },
];

const START: Line[] = [
  { id: "margherita", qty: 2, note: "1× ohne Basilikum" },
  { id: "diavola", qty: 1, note: "extra scharf" },
  { id: "burrata", qty: 1 },
  { id: "limonade", qty: 2 },
];

const byId = (id: string) => menu.find((m) => m.id === id)!;

/**
 * Kassen-Demo: Produkte antippen, Bon aktualisiert sich, Zahlart wählen,
 * Bezahlvorgang simulieren. Es wird nichts gebucht, keine Zahlung, keine TSE.
 */
export function PosScreen() {
  const [category, setCategory] = useState<MenuItem["category"]>("pizza");
  const [lines, setLines] = useState<Line[]>(START);
  const [method, setMethod] = useState<PayMethod>("Karte");
  const [paid, setPaid] = useState(false);

  const total = useMemo(() => lines.reduce((s, l) => s + l.qty * byId(l.id).price, 0), [lines]);
  const qtyOf = (id: string) => lines.find((l) => l.id === id)?.qty ?? 0;

  const add = (id: string) => {
    setPaid(false);
    setLines((ls) =>
      ls.some((l) => l.id === id)
        ? ls.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
        : [...ls, { id, qty: 1 }],
    );
  };
  const remove = (id: string) =>
    setLines((ls) => ls.flatMap((l) => (l.id !== id ? [l] : l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : [])));

  return (
    <div className="tablet">
      <div className="win">
        <div className="pos">
          <div className="pos-cats" role="group" aria-label="Kategorien">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                type="button"
                aria-pressed={c.key === category}
                className={cn(c.key === category && "on")}
                onClick={() => setCategory(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="pos-mid">
            <div className="top">
              <h4>Tisch 12</h4>
              <span className="muted">2 Gäste · seit 19:04</span>
              <div className="top-r">
                <span className="chip">Lena · Service</span>
              </div>
            </div>
            <div className="seg hide-cats-alt" role="group" aria-label="Kategorien" style={{ margin: "12px 14px 0" }}>
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  aria-pressed={c.key === category}
                  className={cn(c.key === category && "on")}
                  onClick={() => setCategory(c.key)}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="pos-grid">
              {menu
                .filter((m) => m.category === category)
                .map((p) => {
                  const qty = qtyOf(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      className={cn("pt", qty > 0 && "sel")}
                      onClick={() => add(p.id)}
                      aria-label={`${p.name}, ${formatEuro(p.price)}, auf den Bon${qty ? ` (bereits ${qty})` : ""}`}
                    >
                      <b>{p.name}</b>
                      <span className="num">{formatEuro(p.price)}</span>
                      {qty ? <em>{qty}</em> : null}
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="pos-bon">
            <div className="bon-h">
              <b style={{ fontSize: 15 }}>Bon · Tisch 12</b>
              <span className="demo">Demodaten</span>
            </div>
            {paid ? (
              <div className="pos-paid" role="status">
                <span className="pos-paid-ic">
                  <Check size={18} strokeWidth={3} aria-hidden="true" />
                </span>
                <b>Bezahlt · {method}</b>
                <span className="num">{formatEuro(total)}</span>
                <span className="muted" style={{ fontSize: 12, textAlign: "center" }}>
                  Demo: Es wurde nichts gebucht.
                </span>
                <button
                  type="button"
                  className="mbtn ghost"
                  onClick={() => {
                    setLines([]);
                    setPaid(false);
                  }}
                >
                  Neuer Bon
                </button>
              </div>
            ) : (
              <>
                <div className="bon-l" aria-live="polite">
                  {lines.length === 0 ? (
                    <p className="muted" style={{ padding: "14px 0" }}>
                      Tippe auf ein Produkt, um es auf den Bon zu legen.
                    </p>
                  ) : null}
                  {lines.map((l) => {
                    const item = byId(l.id);
                    return (
                      <div className="bon-r" key={l.id}>
                        <span>
                          {l.qty}× {item.name}
                        </span>
                        <span className="row" style={{ gap: 6 }}>
                          <span className="num">{formatAmount(l.qty * item.price)}</span>
                          <button
                            type="button"
                            className="bon-minus"
                            onClick={() => remove(l.id)}
                            aria-label={`Ein ${item.name} entfernen`}
                          >
                            <Minus size={12} strokeWidth={2.4} aria-hidden="true" />
                          </button>
                        </span>
                        {l.note ? <small>{l.note}</small> : null}
                      </div>
                    );
                  })}
                </div>
                <div className="bon-f">
                  <div className="between">
                    <span className="muted">Summe</span>
                    <b className="num" style={{ fontSize: 16 }}>
                      {formatEuro(total)}
                    </b>
                  </div>
                  <div className="toggle" role="group" aria-label="Zahlart">
                    {(["Bar", "Karte", "Teilen"] as PayMethod[]).map((m) => (
                      <button
                        key={m}
                        type="button"
                        aria-pressed={m === method}
                        className={cn(m === method && "on")}
                        onClick={() => setMethod(m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                  <button type="button" className="pay" disabled={lines.length === 0} onClick={() => setPaid(true)}>
                    <span>Bezahlen</span>
                    <span className="num">{formatEuro(total)}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
