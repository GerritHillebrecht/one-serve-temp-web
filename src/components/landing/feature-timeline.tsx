"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";

import { DemoBar } from "@/components/product/demo-stage";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type TimelineModule = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  points: readonly string[];
  href: string;
  demoHint: string;
};

const HEADER_HEIGHT = 64;
/** Scroll-Strecke pro Modul im Sticky-Modus. */
const VH_PER_MODULE = 70;
const PIN_QUERY = "(min-width: 1024px) and (min-height: 760px)";

function subscribePin(cb: () => void) {
  const mq = window.matchMedia(PIN_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * Feature-Timeline (Kimi-Adaption): Lineal mit Modulnamen statt Jahreszahlen,
 * darunter Text und interaktive Demo des aktiven Moduls.
 *
 * Desktop (≥ 1024 × 760): Die Timeline bleibt sticky stehen; natives Scrollen
 * schaltet die Module weiter, das Lineal füllt sich mit dem Fortschritt.
 * Klick oder Pfeiltasten scrollen an die passende Stelle – ohne Scroll-Jacking.
 * Kleiner: direkte Auswahl über Tabs bzw. Chips, ohne lange Scroll-Strecke.
 */
export function FeatureTimeline({ modules, screens }: { modules: TimelineModule[]; screens: React.ReactNode[] }) {
  const count = modules.length;
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [resetKeys, setResetKeys] = useState<number[]>(() => modules.map(() => 0));
  const pinned = useSyncExternalStore(
    subscribePin,
    () => window.matchMedia(PIN_QUERY).matches,
    () => false,
  );

  const trackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const chipRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const suppressUntil = useRef(0);
  const mounted = useRef(false);
  const current = modules[active];

  const geometry = useCallback(() => {
    const el = trackRef.current!;
    const rect = el.getBoundingClientRect();
    const stickyHeight = window.innerHeight - HEADER_HEIGHT;
    const scrollable = Math.max(1, rect.height - stickyHeight);
    const top = window.scrollY + rect.top - HEADER_HEIGHT;
    return { rect, scrollable, top };
  }, []);

  // Sticky-Modus: Fortschritt und aktives Modul aus der Scroll-Position.
  useEffect(() => {
    if (!pinned) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const { rect, scrollable } = geometry();
      const p = Math.min(1, Math.max(0, (HEADER_HEIGHT - rect.top) / scrollable));
      setProgress(p);
      if (performance.now() > suppressUntil.current) setActive(Math.round(p * (count - 1)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onScrollEnd = () => {
      suppressUntil.current = 0;
      onScroll();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("scrollend", onScrollEnd);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
    };
  }, [pinned, count, geometry]);

  // Mobile: aktiven Chip in den sichtbaren Bereich der Chip-Reihe holen.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const chip = chipRefs.current[active];
    if (chip && chip.offsetParent !== null) chip.scrollIntoView({ inline: "nearest", block: "nearest" });
  }, [active]);

  const select = useCallback(
    (i: number, focus = false) => {
      const next = (i + count) % count;
      setActive(next);
      if (focus) tabRefs.current[next]?.focus({ preventScroll: true });
      if (pinned) {
        // Zur Stelle scrollen, an der dieses Modul aktiv ist. Bis das Scrollen
        // endet, ändert die Scroll-Position das aktive Modul nicht.
        const { scrollable, top } = geometry();
        const target = top + (next / (count - 1)) * scrollable;
        suppressUntil.current = performance.now() + 1200;
        window.scrollTo({ top: target, behavior: prefersReducedMotion() ? "auto" : "smooth" });
      }
    },
    [count, pinned, geometry],
  );

  function onKeyDown(e: React.KeyboardEvent) {
    const map: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: count - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    select(map[e.key], true);
  }

  const reset = () => setResetKeys((k) => k.map((v, i) => (i === active ? v + 1 : v)));
  const center = (i: number) => ((i + 0.5) / count) * 100;
  const fill = pinned ? center(0) + progress * (center(count - 1) - center(0)) : center(active);
  const counter = `${String(active + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;

  return (
    <div ref={trackRef} style={pinned ? { height: `${count * VH_PER_MODULE + 30}vh` } : undefined}>
      <div
        className={cn(pinned && "sticky flex flex-col justify-center")}
        style={pinned ? { top: HEADER_HEIGHT, height: `calc(100dvh - ${HEADER_HEIGHT}px)` } : undefined}
      >
        {/* Desktop: Lineal mit Modulnamen */}
        <div className="hidden md:block">
          <div className="relative mt-2 h-7" aria-hidden="true">
            <span className="absolute inset-x-0 bottom-0 h-2.5 bg-[repeating-linear-gradient(90deg,var(--os-gray-300)_0_1px,transparent_1px_10px)]" />
            <span className="absolute inset-x-0 bottom-0 h-px bg-gray-200" />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-0.5 bg-black",
                !pinned && "transition-[width] duration-slow ease-standard",
              )}
              style={{ width: `${fill}%` }}
            />
            {modules.map((m, i) => (
              <span
                key={m.slug}
                className={cn(
                  "absolute bottom-0 w-px -translate-x-1/2 transition-[height,background-color] duration-base ease-standard",
                  i === active ? "h-7 w-0.5 bg-black" : "h-4 bg-gray-300",
                )}
                style={{ left: `${center(i)}%` }}
              />
            ))}
          </div>
          <div
            role="tablist"
            aria-label="Module"
            className="grid"
            style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
            onKeyDown={onKeyDown}
          >
            {modules.map((m, i) => (
              <button
                key={m.slug}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`modul-tab-${m.slug}`}
                aria-selected={i === active}
                aria-controls="modul-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => select(i)}
                className="group flex min-h-18 flex-col items-center gap-1.5 rounded-sm px-2 pb-2 pt-3.5 text-center transition-colors duration-base ease-standard hover:bg-gray-50"
              >
                <span className={cn("font-mono text-xs", i === active ? "text-gray-900" : "text-gray-400")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "text-[17px] tracking-[-0.015em] transition-colors duration-base",
                    i === active ? "font-semibold text-black" : "font-medium text-gray-500 group-hover:text-gray-900",
                  )}
                >
                  {m.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile: Stepper mit direkter Auswahl */}
        <div className="flex flex-col gap-3.5 md:hidden">
          <div className="flex items-center gap-3">
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="whitespace-nowrap font-mono text-[13px] text-gray-500">{counter}</span>
              <span className="truncate text-xl font-semibold tracking-[-0.02em]" aria-live="polite">
                {current.name}
              </span>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                aria-label="Vorheriges Modul"
                onClick={() => select(active - 1)}
                className="grid size-11 place-items-center rounded-full border border-border bg-white"
              >
                <ChevronLeft className="size-[18px]" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Nächstes Modul"
                onClick={() => select(active + 1)}
                className="grid size-11 place-items-center rounded-full border border-border bg-white"
              >
                <ChevronRight className="size-[18px]" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div
            className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]"
            role="group"
            aria-label="Modul wählen"
          >
            {modules.map((m, i) => (
              <button
                key={m.slug}
                ref={(el) => {
                  chipRefs.current[i] = el;
                }}
                type="button"
                aria-pressed={i === active}
                onClick={() => select(i)}
                className={cn(
                  "min-h-11 shrink-0 snap-start whitespace-nowrap rounded-full px-4 text-[15px] font-medium transition-colors duration-base",
                  i === active ? "bg-black text-white" : "bg-gray-100 text-gray-700",
                )}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        <div
          id="modul-panel"
          role="tabpanel"
          aria-labelledby={`modul-tab-${current.slug}`}
          className={cn(
            "mt-8 grid items-center gap-8 md:mt-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-14",
            pinned && "lg:mt-8",
          )}
        >
          <div key={current.slug} className="order-2 flex animate-fade-up flex-col gap-5 lg:order-1">
            <span className="font-mono text-[13px] text-gray-500">
              {counter} · {current.name}
            </span>
            <h3 className="text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] md:text-4xl">
              {current.headline}
            </h3>
            <p className="text-[17px] leading-relaxed text-gray-600">{current.description}</p>
            <ul className="flex flex-col border-t border-border">
              {current.points.map((p) => (
                <li key={p} className="flex items-center gap-3 border-b border-border py-3 text-[15px]">
                  <Check className="size-4 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              href={current.href}
              className="group inline-flex min-h-11 items-center gap-1.5 self-start font-medium"
            >
              Mehr zu {current.name}
              <ArrowRight
                className="size-4 transition-transform duration-base ease-standard group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
          <div className="order-1 flex flex-col gap-3 lg:order-2">
            <div
              className="relative flex h-[540px] items-center justify-center overflow-hidden rounded-lg bg-gray-50 p-3.5 sm:h-[560px] sm:p-6 lg:rounded-xl lg:p-9"
              style={pinned ? { height: `clamp(440px, calc(100dvh - ${HEADER_HEIGHT}px - 230px), 620px)` } : undefined}
            >
              <div
                key={`${current.slug}-${resetKeys[active]}`}
                className="flex size-full animate-screen-in items-center justify-center"
              >
                {screens[active]}
              </div>
            </div>
            <DemoBar hint={current.demoHint} onReset={reset} />
          </div>
        </div>
      </div>
    </div>
  );
}
