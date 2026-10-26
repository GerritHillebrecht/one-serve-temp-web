import type { FeatureSlug } from "@/content/features";
import { AnalyticsScreen } from "./analytics-screen";
import { ConnectScreen } from "./connect-screen";
import { DeliveryScreen } from "./delivery-screen";
import { PosScreen } from "./pos-screen";
import { ShiftsScreen } from "./shifts-screen";
import { WebshopScreen } from "./webshop-screen";

const screens: Record<FeatureSlug, () => React.JSX.Element> = {
  kassensystem: PosScreen,
  connect: ConnectScreen,
  dienstplan: ShiftsScreen,
  webshop: WebshopScreen,
  delivery: DeliveryScreen,
  analytics: AnalyticsScreen,
};

export const screenLabels: Record<FeatureSlug, string> = {
  kassensystem: "Kassen-Screen auf dem Tablet: Tisch 12 mit Bon, Produktkacheln und Bezahlabschluss. Demodaten.",
  connect:
    "OneServe Connect: Kanal Küche mit Nachrichten, einem Systemhinweis zu einem pausierten Artikel und einer Ankündigung mit Lesebestätigung. Demodaten.",
  dienstplan:
    "Dienstplan der Kalenderwoche 44 mit Mitarbeitern, Rollen, Schichtzeiten und offenen Schichten. Demodaten.",
  webshop:
    "Bestellflow im Restaurant-Webshop auf dem Smartphone: Speisekarte mit Warenkorb und Bestellübersicht. Demodaten.",
  delivery: "Delivery-Übersicht mit aktiven Lieferungen, Fahrern und einer Karte mit Route. Demodaten.",
  analytics: "Analytics mit Wochenumsatz, Bestellungen, Umsatzverlauf, Umsatz nach Kanal und Top-Artikeln. Demodaten.",
};

/**
 * Produkt-Screen eines Moduls. Bis die interaktiven Demos stehen (Phase 3),
 * ist der Screen ein statisches, beschriftetes Bild für Screenreader.
 */
export function FeatureScreen({ slug }: { slug: FeatureSlug }) {
  const Screen = screens[slug];
  return (
    <div className="pui flex h-full w-full items-center justify-center" role="img" aria-label={screenLabels[slug]}>
      <Screen />
    </div>
  );
}
