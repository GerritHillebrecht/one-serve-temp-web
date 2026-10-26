import { menu } from "@/demo/fixtures";
import { formatAmount, formatEuro } from "@/lib/format";
import { cn } from "@/lib/utils";

const ticket = [
  { qty: 2, name: "Pizza Margherita", price: 11.5, note: "1× ohne Basilikum" },
  { qty: 1, name: "Diavola", price: 13.5, note: "extra scharf" },
  { qty: 1, name: "Burrata-Salat", price: 12.9 },
  { qty: 2, name: "Hauslimonade", price: 4.5 },
];
const selected: Record<string, number> = { margherita: 2, diavola: 1 };
const total = ticket.reduce((sum, t) => sum + t.qty * t.price, 0);

/** Kassen-Screen auf dem Tablet: Tisch, Produktkacheln, Bon und Bezahlung. */
export function PosScreen() {
  const pizzas = menu.filter((m) => m.category === "pizza");
  return (
    <div className="tablet">
      <div className="win">
        <div className="pos">
          <div className="pos-cats">
            {["Vorspeisen", "Pizza", "Pasta", "Hauptgerichte", "Desserts", "Getränke", "Wein"].map((c) => (
              <span key={c} className={cn(c === "Pizza" && "on")}>
                {c}
              </span>
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
            <div className="pos-grid">
              {pizzas.map((p) => (
                <div key={p.id} className={cn("pt", selected[p.id] && "sel")}>
                  <b>{p.name}</b>
                  <span className="num">{formatEuro(p.price)}</span>
                  {selected[p.id] ? <em>{selected[p.id]}</em> : null}
                </div>
              ))}
            </div>
          </div>
          <div className="pos-bon">
            <div className="bon-h">
              <b style={{ fontSize: 15 }}>Bon · Tisch 12</b>
              <span className="demo">Demodaten</span>
            </div>
            <div className="bon-l">
              {ticket.map((t) => (
                <div className="bon-r" key={t.name}>
                  <span>
                    {t.qty}× {t.name}
                  </span>
                  <span className="num">{formatAmount(t.qty * t.price)}</span>
                  {t.note ? <small>{t.note}</small> : null}
                </div>
              ))}
            </div>
            <div className="bon-f">
              <div className="between">
                <span className="muted">Summe</span>
                <b className="num" style={{ fontSize: 16 }}>
                  {formatEuro(total)}
                </b>
              </div>
              <div className="toggle">
                <span>Bar</span>
                <span className="on">Karte</span>
                <span>Teilen</span>
              </div>
              <div className="pay">
                <span>Bezahlen</span>
                <span className="num">{formatEuro(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
