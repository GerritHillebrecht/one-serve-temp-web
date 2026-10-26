"use client";

import { startTransition, useEffect, useRef, useState, ViewTransition } from "react";
import { Check, RotateCcw } from "lucide-react";

import { AppShell } from "@/components/product/app-shell";
import { board, type BoardLane, type BoardOrder } from "@/demo/fixtures";
import { formatEuro } from "@/lib/format";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Hero-Sequenz: Eine Webshop-Bestellung trifft ein, wird angenommen,
 * geht an die Küche, wird fertig – und der Tagesumsatz steigt.
 * Läuft einmal (unter 5 s) und bleibt dann im Endzustand stehen.
 */

type Step = 0 | 1 | 2 | 3 | 4;
const END: Step = 4;

/** Zeitpunkte der Schritte in ms ab Start. */
const TIMELINE: Array<[Step, number]> = [
  [1, 500],
  [2, 1700],
  [3, 2500],
  [4, 3700],
];

const REVENUE_BEFORE = 2418;
const ORDER_TOTAL = 40.4;

const incoming: BoardOrder = {
  id: "1042",
  label: "#1042",
  channel: "Webshop",
  time: "gerade eben",
  items: "2× Margherita, Burrata-Salat, Hauslimonade",
  footLeft: "Abholung 19:00",
};

const kitchenItems = ["2× Margherita", "Burrata-Salat", "Hauslimonade"];

function lanesFor(step: Step): BoardLane[] {
  const base = board.map((l) => ({ ...l, orders: l.orders.filter((o) => o.id !== "1042") }));
  const put = (key: BoardLane["key"], order: BoardOrder) => {
    const lane = base.find((l) => l.key === key)!;
    lane.orders = [order, ...lane.orders];
  };
  if (step === 1) put("new", incoming);
  if (step === 2 || step === 3) put("cook", { ...incoming, time: step === 2 ? "00:05" : "04:30" });
  if (step === 4) put("ready", { ...incoming, time: "18:58", footRight: "Abholbereit", footRightStatus: "ready" });
  return base;
}

function useCountUp(target: number, duration: number) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now();
    const origin = from.current;
    const instant = prefersReducedMotion();
    let raf = 0;
    const tick = (now: number) => {
      const t = instant ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(origin + (target - origin) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

export function HeroBoard() {
  const [step, setStep] = useState<Step>(0);
  const [run, setRun] = useState(0);

  // Ablauf planen: Alle Zustandswechsel passieren in Timer-Callbacks.
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const plan: Array<[Step, number]> = reduced ? [[END, 0]] : TIMELINE;
    const ids = plan.map(([s, at]) => window.setTimeout(() => startTransition(() => setStep(s)), at));
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [run]);

  const replay = () => {
    setStep(0);
    setRun((r) => r + 1);
  };

  const lanes = lanesFor(step);
  const total = lanes.reduce((n, l) => n + l.orders.length, 0);
  const revenue = useCountUp(step >= END ? REVENUE_BEFORE + ORDER_TOTAL : REVENUE_BEFORE, 700);
  const kitchenOpen = step === 3;

  return (
    <div className="relative">
      <div
        role="img"
        aria-label="OneServe Restaurant Manager, Bestellübersicht mit Demodaten: Eine Webshop-Bestellung trifft ein, wird angenommen, in der Küche zubereitet und steht danach abholbereit. Der Tagesumsatz steigt um den Bestellwert."
      >
        <AppShell
          active="orders"
          title="Bestellungen"
          showLocation
          className="hero-win"
          toolbar={
            <div className="seg hide-sm">
              <span className="on">
                Alle <em>{total}</em>
              </span>
              <span>Vor Ort</span>
              <span>Webshop</span>
              <span className="hide-md">Lieferung</span>
            </div>
          }
          actions={
            <span className="chip out hide-sm num">
              Umsatz heute <b style={{ fontWeight: 600, color: "var(--os-gray-900)" }}>{formatEuro(revenue)}</b>
            </span>
          }
        >
          <div className="body" style={{ position: "relative" }}>
            <div className="board">
              {lanes.map((lane) => (
                <div className="lane" key={lane.key}>
                  <div className="lane-h">
                    <span className={cn("dot", lane.key)} />
                    {lane.title} <em>{lane.orders.length}</em>
                  </div>
                  {lane.orders.map((o) => {
                    const isIncoming = o.id === "1042";
                    return (
                      <ViewTransition key={o.id} name={`hero-order-${o.id}`} default="hero-vt">
                        <div className={cn("oc", isIncoming && step < END && "fresh")}>
                          <div className="oc-h">
                            <b className="num">{o.label}</b>
                            <span className="chip">{o.channel}</span>
                            <span className="t num">{o.time}</span>
                          </div>
                          <div className="oc-i">{o.items}</div>
                          <div className="oc-f">
                            <span className={cn(o.warn && "warn")}>{o.footLeft}</span>
                            {isIncoming && lane.key === "new" ? (
                              <span className="mbtn sm">Annehmen</span>
                            ) : isIncoming && lane.key === "cook" ? (
                              <span className="status cook">
                                <span className="dot cook" />
                                In der Küche
                              </span>
                            ) : o.footRightStatus ? (
                              <span className={cn("status", o.footRightStatus)}>{o.footRight}</span>
                            ) : (
                              <span className="num">{o.footRight}</span>
                            )}
                          </div>
                        </div>
                      </ViewTransition>
                    );
                  })}
                </div>
              ))}
            </div>

            {step === 1 ? (
              <div className="hero-toast" role="presentation">
                <span className="dot new" />
                <b>Neue Bestellung</b>
                <span className="muted">Webshop · #1042</span>
              </div>
            ) : null}

            <div className={cn("hero-kitchen", kitchenOpen && "open")} aria-hidden="true">
              <div className="between">
                <b>Küche · Bon #1042</b>
                <span className="muted num">04:30</span>
              </div>
              {kitchenItems.map((item, i) => (
                <div className="row" key={item}>
                  <span className={cn("hero-check", (i === 0 || step >= END) && "on")}>
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {item}
                </div>
              ))}
              <span className="muted" style={{ fontSize: 12 }}>
                1× ohne Basilikum
              </span>
            </div>
          </div>
        </AppShell>
      </div>

      <button
        type="button"
        onClick={replay}
        className="absolute bottom-4 right-4 z-10 inline-flex h-9 items-center gap-2 rounded-full border border-border bg-white/95 px-3.5 text-[13px] font-medium text-gray-700 shadow-xs backdrop-blur transition-colors duration-base hover:border-gray-300 md:bottom-6 md:right-6"
      >
        <RotateCcw className="size-3.5" aria-hidden="true" />
        Ablauf erneut abspielen
      </button>
    </div>
  );
}
