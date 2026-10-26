import { ChevronLeft, Plus } from "lucide-react";

import { menu, restaurant } from "@/demo/fixtures";
import { formatEuro } from "@/lib/format";

const byId = (id: string) => menu.find((m) => m.id === id)!;
const cart = [
  { item: byId("margherita"), qty: 2 },
  { item: byId("burrata"), qty: 1 },
  { item: byId("limonade"), qty: 1 },
];
const cartCount = cart.reduce((s, c) => s + c.qty, 0);
const cartTotal = cart.reduce((s, c) => s + c.qty * c.item.price, 0);

/** Bestellflow im Restaurant-Webshop: Speisekarte und Bestellübersicht. */
export function WebshopScreen() {
  const listed = ["margherita", "diavola", "funghi"].map(byId);
  return (
    <div className="phones">
      <div className="phone">
        <div className="phone-in">
          <div className="ph-pad" style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 12 }}>
            <span className="ph-title">{restaurant.name}</span>
            <span className="muted" style={{ fontSize: 12 }}>
              Italienisch · {restaurant.location}
            </span>
            <div className="toggle">
              <span className="on">Abholung</span>
              <span>Lieferung</span>
            </div>
            <div className="between" style={{ fontSize: 12.5 }}>
              <span className="muted">Abholzeit</span>
              <b style={{ fontWeight: 600 }}>Heute, 19:00</b>
            </div>
          </div>
          <div className="ph-tabs">
            <span>Beliebt</span>
            <span className="on">Pizza</span>
            <span>Salate</span>
            <span>Getränke</span>
          </div>
          {listed.map((p, i) => (
            <div className="item" key={p.id} style={i === listed.length - 1 ? { borderBottom: 0 } : undefined}>
              <div>
                <b>{p.id === "margherita" ? "Pizza Margherita" : p.name}</b>
                <p>{p.description}</p>
                <div className="pr num">{formatEuro(p.price)}</div>
              </div>
              <div className="thumb">
                {p.id === "margherita" ? (
                  <span className="qty">– 2 +</span>
                ) : (
                  <span className="add">
                    <Plus size={14} strokeWidth={2.4} aria-hidden="true" />
                  </span>
                )}
              </div>
            </div>
          ))}
          <div className="ph-bar">
            <span className="row" style={{ gap: 10 }}>
              <em>{cartCount}</em>Warenkorb
            </span>
            <span className="num">{formatEuro(cartTotal)}</span>
          </div>
        </div>
      </div>
      <div className="phone second">
        <div className="phone-in">
          <div className="ph-pad row" style={{ paddingBottom: 14 }}>
            <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
            <b style={{ fontSize: 17, fontWeight: 600 }}>Bestellung prüfen</b>
          </div>
          <div className="ph-sec" style={{ borderTop: "1px solid var(--os-gray-150)" }}>
            <small>Abholung</small>
            <div className="between">
              <b style={{ fontWeight: 600 }}>Heute, 19:00</b>
              <span className="muted">Ändern</span>
            </div>
            <span className="muted" style={{ fontSize: 12 }}>
              {restaurant.name} · {restaurant.location}
            </span>
          </div>
          <div className="ph-sec">
            <small>Deine Bestellung</small>
            {cart.map((c) => (
              <div className="between" key={c.item.id}>
                <span>
                  {c.qty}× {c.item.id === "margherita" ? "Pizza Margherita" : c.item.name}
                </span>
                <span className="num">{formatEuro(c.qty * c.item.price)}</span>
              </div>
            ))}
          </div>
          <div className="ph-sec">
            <small>Hinweis für die Küche</small>
            <span>Eine Pizza bitte ohne Basilikum</span>
          </div>
          <div className="ph-sec" style={{ borderBottom: 0 }}>
            <div className="between">
              <b style={{ fontWeight: 600 }}>Gesamt</b>
              <b className="num" style={{ fontWeight: 600 }}>
                {formatEuro(cartTotal)}
              </b>
            </div>
          </div>
          <div className="ph-bar">
            <span>Jetzt bestellen</span>
            <span className="num">{formatEuro(cartTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
