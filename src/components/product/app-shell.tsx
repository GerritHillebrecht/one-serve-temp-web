import {
  CalendarDays,
  ChartColumn,
  MapPin,
  MessageSquare,
  Monitor,
  ReceiptText,
  Settings,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

import { restaurant } from "@/demo/fixtures";
import { cn } from "@/lib/utils";

export type AppSection = "orders" | "pos" | "connect" | "shifts" | "shop" | "delivery" | "analytics" | "settings";

const NAV: { key: AppSection; label: string; icon: LucideIcon }[] = [
  { key: "orders", label: "Bestellungen", icon: ReceiptText },
  { key: "pos", label: "Kasse", icon: Monitor },
  { key: "connect", label: "Connect", icon: MessageSquare },
  { key: "shifts", label: "Dienstplan", icon: CalendarDays },
  { key: "shop", label: "Webshop", icon: ShoppingBag },
  { key: "delivery", label: "Delivery", icon: MapPin },
  { key: "analytics", label: "Analytics", icon: ChartColumn },
  { key: "settings", label: "Einstellungen", icon: Settings },
];

/**
 * Gemeinsames Gerüst der Produkt-Screens: Seitenleiste mit Modulen,
 * Kopfzeile und Inhaltsbereich. Rein darstellend, ohne Navigation.
 */
export function AppShell({
  active,
  title,
  toolbar,
  actions,
  children,
  showLocation = false,
  className,
}: {
  active: AppSection;
  title: React.ReactNode;
  toolbar?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  showLocation?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("win", className)}>
      <div className="app">
        <div className="side" aria-hidden="true">
          <div className="side-brand">OneServe</div>
          {NAV.map(({ key, label, icon: Icon }) => (
            <span key={key} className={cn("side-i", key === active && "on")}>
              <Icon size={16} strokeWidth={1.8} />
              {label}
            </span>
          ))}
          {showLocation ? (
            <div className="side-foot">
              <span className="av">{restaurant.initials}</span>
              <div style={{ lineHeight: 1.3 }}>
                <b style={{ fontWeight: 600 }}>{restaurant.name}</b>
                <div className="muted" style={{ fontSize: 12 }}>
                  {restaurant.location}
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="main">
          <div className="top">
            <h4>{title}</h4>
            {toolbar}
            <div className="top-r">
              {actions}
              <span className="demo">Demodaten</span>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
