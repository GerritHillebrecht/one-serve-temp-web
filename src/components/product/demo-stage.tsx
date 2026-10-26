"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Bühne für eine interaktive Demo: graue Fläche, darunter Hinweis und
 * „Zurücksetzen“. Zurücksetzen montiert die Demo neu (Ausgangszustand).
 */
export function DemoStage({
  children,
  hint,
  className,
}: {
  children: React.ReactNode;
  hint: string;
  className?: string;
}) {
  const [resetKey, setResetKey] = useState(0);
  return (
    <div className="flex flex-col gap-3">
      <div className={cn("flex items-center justify-center overflow-hidden rounded-xl bg-gray-50", className)}>
        <div key={resetKey} className="flex size-full items-center justify-center">
          {children}
        </div>
      </div>
      <DemoBar hint={hint} onReset={() => setResetKey((k) => k + 1)} />
    </div>
  );
}

export function DemoBar({ hint, onReset }: { hint: string; onReset: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm text-gray-600">
      <p>
        <span className="font-medium text-gray-900">Probier es aus:</span> {hint}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex h-9 items-center gap-2 rounded-full border border-border px-3.5 font-medium text-gray-700 transition-colors duration-base hover:border-gray-300"
      >
        <RotateCcw className="size-3.5" aria-hidden="true" />
        Demo zurücksetzen
      </button>
    </div>
  );
}
