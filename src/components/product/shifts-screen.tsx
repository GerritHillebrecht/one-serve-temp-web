"use client";

import { useMemo, useState } from "react";

import { shiftWeek, team, type ShiftKind } from "@/demo/fixtures";
import { cn } from "@/lib/utils";
import { AppShell } from "./app-shell";

type Shift = { time: string; kind: ShiftKind; role?: string };
type Source = { type: "member"; memberId: string; day: number } | { type: "open"; day: number };

const ROLE_KIND: Record<string, ShiftKind> = { Service: "service", Küche: "kitchen", Bar: "bar", Fahrer: "driver" };

function initialAssigned(): Record<string, Shift> {
  const out: Record<string, Shift> = {};
  for (const row of shiftWeek.rows) {
    row.shifts.forEach((t, day) => {
      if (t) out[`${row.memberId}:${day}`] = { time: t, kind: row.kind };
    });
  }
  return out;
}

function initialOpen(): Record<number, Shift> {
  const out: Record<number, Shift> = {};
  shiftWeek.open.forEach((o, day) => {
    if (o) out[day] = { time: o.time, kind: ROLE_KIND[o.role] ?? "open", role: o.role };
  });
  return out;
}

function hours(time: string): number {
  const [a, b] = time.split("–").map(Number);
  return (b > a ? b : b + 24) - a;
}

/**
 * Dienstplan-Demo: Schicht auswählen und auf einen freien Platz verschieben
 * (Klick, Tastatur oder Ziehen). Offene Schichten lassen sich so besetzen.
 */
export function ShiftsScreen() {
  const [assigned, setAssigned] = useState(initialAssigned);
  const [open, setOpen] = useState(initialOpen);
  const [selected, setSelected] = useState<Source | null>(null);
  const [notice, setNotice] = useState("");

  const planned = useMemo(() => Object.values(assigned).reduce((s, sh) => s + hours(sh.time), 0), [assigned]);
  const openCount = Object.keys(open).length;

  const shiftOf = (src: Source): Shift | undefined =>
    src.type === "member" ? assigned[`${src.memberId}:${src.day}`] : open[src.day];

  const select = (src: Source) => {
    const same =
      selected &&
      selected.type === src.type &&
      selected.day === src.day &&
      (src.type === "open" || (selected.type === "member" && selected.memberId === src.memberId));
    setSelected(same ? null : src);
    setNotice(same ? "" : "Schicht ausgewählt. Wähle ein freies Feld als neues Ziel.");
  };

  const moveTo = (memberId: string, day: number) => {
    if (!selected) return;
    const shift = shiftOf(selected);
    if (!shift) return;
    const member = team.find((m) => m.id === memberId)!;
    setAssigned((a) => {
      const next = { ...a };
      if (selected.type === "member") delete next[`${selected.memberId}:${selected.day}`];
      next[`${memberId}:${day}`] = {
        time: shift.time,
        kind: shift.kind === "open" ? ROLE_KIND[member.role] : shift.kind,
      };
      return next;
    });
    if (selected.type === "open") {
      setOpen((o) => {
        const next = { ...o };
        delete next[selected.day];
        return next;
      });
    }
    setNotice(`${shift.time} an ${member.name}, ${shiftWeek.days[day]} vergeben.`);
    setSelected(null);
  };

  const isSelected = (src: Source) =>
    !!selected &&
    selected.type === src.type &&
    selected.day === src.day &&
    (src.type === "open" || (selected.type === "member" && selected.memberId === src.memberId));

  return (
    <AppShell
      active="shifts"
      title="Dienstplan"
      toolbar={<span className="chip out hide-sm">{shiftWeek.label}</span>}
      actions={<span className="mbtn hide-sm">Veröffentlichen</span>}
    >
      <div
        className="body"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setSelected(null);
            setNotice("");
          }
        }}
      >
        <div className="kpi-row">
          <div className="kpi">
            <small>Geplante Stunden</small>
            <b className="num">{planned} h</b>
          </div>
          <div className="kpi">
            <small>Offene Schichten</small>
            <b className="num">{openCount}</b>
          </div>
          <div className="kpi hide-sm">
            <small>Im Plan</small>
            <b className="num">{team.length} Personen</b>
          </div>
        </div>
        <p className="sr-only" role="status">
          {notice}
        </p>
        <div className="plan-wrap">
          <div className={cn("plan", selected && "picking")}>
            <div className="ph">Team</div>
            {shiftWeek.days.map((d, i) => (
              <div key={d} className={cn("ph", i === 0 && "today")}>
                {d}
              </div>
            ))}
            {team.map((m) => [
              <div className="pp" key={`${m.id}-name`}>
                <span className="av">{m.initials}</span>
                <div>
                  <b>{m.name}</b>
                  <span>{m.role}</span>
                </div>
              </div>,
              ...shiftWeek.days.map((dayLabel, day) => {
                const sh = assigned[`${m.id}:${day}`];
                const src: Source = { type: "member", memberId: m.id, day };
                return (
                  <div key={`${m.id}-${day}`}>
                    {sh ? (
                      <button
                        type="button"
                        draggable
                        onDragStart={() => select(src)}
                        className={cn("sh", sh.kind, isSelected(src) && "selected")}
                        aria-pressed={isSelected(src)}
                        aria-label={`${m.name}, ${dayLabel}, ${sh.time}${isSelected(src) ? ", ausgewählt" : ""}`}
                        onClick={() => select(src)}
                      >
                        {sh.time}
                      </button>
                    ) : selected ? (
                      <button
                        type="button"
                        className="sh-target"
                        aria-label={`Schicht hierher verschieben: ${m.name}, ${dayLabel}`}
                        onClick={() => moveTo(m.id, day)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          moveTo(m.id, day);
                        }}
                      />
                    ) : null}
                  </div>
                );
              }),
            ])}
            <div className="pp">
              <span className="av" style={{ background: "#fff", boxShadow: "inset 0 0 0 1.5px #9a9a9a" }} />
              <div>
                <b>Offen</b>
                <span>{openCount} Schichten</span>
              </div>
            </div>
            {shiftWeek.days.map((dayLabel, day) => {
              const o = open[day];
              const src: Source = { type: "open", day };
              return (
                <div key={`open-${day}`}>
                  {o ? (
                    <button
                      type="button"
                      draggable
                      onDragStart={() => select(src)}
                      className={cn("sh open", isSelected(src) && "selected")}
                      aria-pressed={isSelected(src)}
                      aria-label={`Offene Schicht ${o.role}, ${dayLabel}, ${o.time}`}
                      onClick={() => select(src)}
                    >
                      {o.time}
                      <small>{o.role}</small>
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
