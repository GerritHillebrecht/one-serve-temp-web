import { shiftWeek, team } from "@/demo/fixtures";
import { cn } from "@/lib/utils";
import { AppShell } from "./app-shell";

/** Dienstplan einer Woche mit Rollen, Schichten und offenen Schichten. */
export function ShiftsScreen() {
  const openCount = shiftWeek.open.filter(Boolean).length;
  return (
    <AppShell
      active="shifts"
      title="Dienstplan"
      toolbar={<span className="chip out">{shiftWeek.label}</span>}
      actions={<span className="mbtn">Veröffentlichen</span>}
    >
      <div className="body">
        <div className="kpi-row">
          <div className="kpi">
            <small>Geplante Stunden</small>
            <b className="num">{shiftWeek.plannedHours} h</b>
          </div>
          <div className="kpi">
            <small>Offene Schichten</small>
            <b className="num">{openCount}</b>
          </div>
          <div className="kpi hide-sm">
            <small>Mitarbeiter</small>
            <b className="num">{shiftWeek.staffCount}</b>
          </div>
        </div>
        <div className="plan-wrap">
          <div className="plan">
            <div className="ph">Team</div>
            {shiftWeek.days.map((d, i) => (
              <div key={d} className={cn("ph", i === 0 && "today")}>
                {d}
              </div>
            ))}
            {shiftWeek.rows.map((row) => {
              const m = team.find((t) => t.id === row.memberId)!;
              return [
                <div className="pp" key={`${row.memberId}-name`}>
                  <span className="av">{m.initials}</span>
                  <div>
                    <b>{m.name}</b>
                    <span>{m.role}</span>
                  </div>
                </div>,
                ...row.shifts.map((s, i) => (
                  <div key={`${row.memberId}-${i}`}>{s ? <span className={cn("sh", row.kind)}>{s}</span> : null}</div>
                )),
              ];
            })}
            <div className="pp">
              <span className="av" style={{ background: "#fff", boxShadow: "inset 0 0 0 1.5px #9a9a9a" }} />
              <div>
                <b>Offen</b>
                <span>{openCount} Schichten</span>
              </div>
            </div>
            {shiftWeek.open.map((o, i) => (
              <div key={`open-${i}`}>
                {o ? (
                  <span className="sh open">
                    {o.time}
                    <small>{o.role}</small>
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
