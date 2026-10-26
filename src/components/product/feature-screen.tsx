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

const names: Record<FeatureSlug, string> = {
  kassensystem: "Kassensystem",
  connect: "Connect",
  dienstplan: "Dienstplan",
  webshop: "Webshop",
  delivery: "Delivery",
  analytics: "Analytics",
};

/**
 * Interaktive Demo eines Moduls. Läuft vollständig im Browser mit
 * Demo-Daten: keine Netzwerkaufrufe, keine Buchungen, keine Zahlungen.
 */
export function FeatureScreen({ slug }: { slug: FeatureSlug }) {
  const Screen = screens[slug];
  return (
    <section
      className="pui flex h-full w-full items-center justify-center"
      aria-label={`Interaktive Demo: ${names[slug]} (Demodaten)`}
    >
      <Screen />
    </section>
  );
}
