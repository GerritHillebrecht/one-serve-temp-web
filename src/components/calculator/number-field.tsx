"use client";

import { useId, useState } from "react";

import { parseGermanNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

function formatInput(v: number): string {
  return v.toLocaleString("de-DE", { maximumFractionDigits: 2, useGrouping: false });
}

/**
 * Zahlenfeld des Rechner-Kits: Beschriftung, Einheit, Hilfetext.
 * Hält den getippten Text lokal, damit „12,“ beim Tippen nicht verschwindet.
 */
export function NumberField({
  label,
  value,
  onChange,
  unit,
  help,
  step = 1,
  min = 0,
  max,
  className,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  unit?: string;
  help?: string;
  step?: number;
  min?: number;
  max?: number;
  className?: string;
}) {
  const id = useId();
  const [text, setText] = useState(formatInput(value));
  const [lastValue, setLastValue] = useState(value);

  // Wert von außen geändert (z. B. Vorlage gewählt): Text übernehmen.
  if (value !== lastValue) {
    setLastValue(value);
    if (parseGermanNumber(text) !== value) setText(formatInput(value));
  }

  const commit = (t: string) => {
    setText(t);
    const n = parseGermanNumber(t);
    setLastValue(n);
    onChange(n);
  };

  const nudge = (dir: 1 | -1) => {
    const next = Math.round((value + dir * step) * 100) / 100;
    const bounded = Math.max(min, max !== undefined ? Math.min(max, next) : next);
    setText(formatInput(bounded));
    setLastValue(bounded);
    onChange(bounded);
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="flex h-12 items-center rounded-sm border border-border bg-white transition-colors duration-base focus-within:border-gray-900">
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          value={text}
          onChange={(e) => commit(e.target.value)}
          onBlur={() => setText(formatInput(parseGermanNumber(text)))}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") {
              e.preventDefault();
              nudge(1);
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              nudge(-1);
            }
          }}
          aria-describedby={help ? `${id}-help` : undefined}
          className="tabular h-full min-w-0 flex-1 bg-transparent px-3.5 text-base outline-none"
        />
        {unit ? <span className="pr-3.5 text-sm text-gray-500">{unit}</span> : null}
      </div>
      {help ? (
        <p id={`${id}-help`} className="text-[13px] leading-snug text-gray-500">
          {help}
        </p>
      ) : null}
    </div>
  );
}
