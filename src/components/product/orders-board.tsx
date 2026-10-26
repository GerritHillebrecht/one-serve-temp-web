import { board } from "@/demo/fixtures";
import { cn } from "@/lib/utils";
import { AppShell } from "./app-shell";

/** Bestellübersicht des Restaurant Managers mit Demo-Daten. */
export function OrdersBoard({ className }: { className?: string }) {
  return (
    <AppShell
      active="orders"
      title="Bestellungen"
      showLocation
      className={className}
      toolbar={
        <div className="seg hide-sm">
          <span className="on">
            Alle <em>8</em>
          </span>
          <span>Vor Ort</span>
          <span>Webshop</span>
          <span className="hide-md">Lieferung</span>
        </div>
      }
      actions={<span className="mbtn hide-sm">Neue Bestellung</span>}
    >
      <div className="body">
        <div className="board">
          {board.map((lane) => (
            <div className="lane" key={lane.key}>
              <div className="lane-h">
                <span className={cn("dot", lane.key)} />
                {lane.title} <em>{lane.orders.length}</em>
              </div>
              {lane.orders.map((o, i) => (
                <div key={o.id} className={cn("oc", lane.key === "new" && i === 0 && "fresh")}>
                  <div className="oc-h">
                    <b className="num">{o.label}</b>
                    <span className="chip">{o.channel}</span>
                    <span className="t num">{o.time}</span>
                  </div>
                  <div className="oc-i">{o.items}</div>
                  <div className="oc-f">
                    <span className={cn(o.warn && "warn")}>{o.footLeft}</span>
                    {lane.key === "new" && i === 0 ? (
                      <span className="mbtn sm">Annehmen</span>
                    ) : o.footRightStatus ? (
                      <span className={cn("status", o.footRightStatus)}>{o.footRight}</span>
                    ) : (
                      <span className="num">{o.footRight}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
