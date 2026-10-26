/**
 * Die OneServe-Module. Eine Quelle für Navigation, Feature-Timeline,
 * Funktionsseiten, Footer und Sitemap.
 */
export type FeatureSlug = "kassensystem" | "connect" | "dienstplan" | "webshop" | "delivery" | "analytics";

export type Feature = {
  slug: FeatureSlug;
  name: string;
  /** Eine Zeile Nutzen für Menüs und Karten. */
  summary: string;
  /** Überschrift in Timeline und auf der Funktionsseite. */
  headline: string;
  /** Zwei Sätze Nutzen. */
  description: string;
  points: [string, string, string];
  seo: { title: string; description: string };
};

export const features: Feature[] = [
  {
    slug: "kassensystem",
    name: "POS & Kassensystem",
    summary: "Kassieren im Browser und auf dem Tablet",
    headline: "Kassieren in Sekunden.",
    description: "Tische, Bestellpositionen und Bezahlung auf einem Bildschirm – im Browser oder auf dem Tablet.",
    points: [
      "Offene Tische und Bons im Blick",
      "Positionen mit Extras und Hinweisen",
      "Bar, Karte oder Rechnung teilen",
    ],
    seo: {
      title: "Kassensystem für Restaurants",
      description:
        "Das OneServe-Kassensystem für Restaurants: Tische, Bestellpositionen und Bezahlung auf einem Bildschirm, im Browser oder auf dem Tablet.",
    },
  },
  {
    slug: "connect",
    name: "Connect",
    summary: "Der interne Messenger für dein Team",
    headline: "Das Team spricht an einem Ort.",
    description: "Nachrichten für Küche, Service und Leitung – verbunden mit dem, was gerade im Betrieb passiert.",
    points: [
      "Kanäle nach Bereichen",
      "Systemhinweise, etwa zu pausierten Artikeln",
      "Ankündigungen mit Lesebestätigung",
    ],
    seo: {
      title: "Connect – interner Messenger für die Gastronomie",
      description:
        "OneServe Connect bündelt die Kommunikation von Küche, Service und Leitung in Kanälen, verbunden mit Hinweisen aus dem Betrieb.",
    },
  },
  {
    slug: "dienstplan",
    name: "Dienstplan",
    summary: "Schichten planen ohne Tabellen",
    headline: "Schichten planen ohne Tabellen.",
    description: "Ein Wochenplan mit Rollen, Zeitfenstern und offenen Schichten – für das ganze Team sichtbar.",
    points: [
      "Rollen für Service, Küche, Bar und Fahrer",
      "Offene Schichten auf einen Blick",
      "Geplante Stunden pro Woche",
    ],
    seo: {
      title: "Dienstplan für Restaurants",
      description:
        "Der OneServe-Dienstplan: Wochenplanung mit Rollen, Zeitfenstern und offenen Schichten, für das ganze Team sichtbar.",
    },
  },
  {
    slug: "webshop",
    name: "Webshop",
    summary: "Dein eigener Online-Shop für Bestellungen",
    headline: "Dein Shop. Deine Gäste.",
    description: "Gäste bestellen direkt bei dir. Die Bestellung landet ohne Umweg in Kasse und Küche.",
    points: [
      "Gestaltung aus professionellen Vorlagen",
      "Abholung und Lieferung mit Wunschzeit",
      "Artikel und Preise aus der Kasse",
    ],
    seo: {
      title: "Restaurant-Webshop für Online-Bestellungen",
      description:
        "Mit dem OneServe-Webshop bestellen Gäste direkt bei dir. Bestellungen landen ohne Umweg in Kasse und Küche.",
    },
  },
  {
    slug: "delivery",
    name: "Delivery",
    summary: "Lieferungen, Fahrer und Status an einem Ort",
    headline: "Jede Lieferung im Blick.",
    description: "Bestellungen, Fahrer und Status in einer Übersicht – von der Küche bis an die Haustür.",
    points: [
      "Status von Zubereitung bis Zustellung",
      "Fahrer zuweisen und Touren verfolgen",
      "Eigener Shop und Lieferplattformen zusammen",
    ],
    seo: {
      title: "Liefermanagement für Restaurants",
      description:
        "OneServe Delivery zeigt Bestellungen, Fahrer und Lieferstatus in einer Übersicht, vom eigenen Shop und von Lieferplattformen.",
    },
  },
  {
    slug: "analytics",
    name: "Analytics",
    summary: "Umsatz und Trends über alle Kanäle",
    headline: "Zahlen, die du verstehst.",
    description: "Umsatz, Bestellungen und Trends über alle Kanäle und Standorte – ohne Export.",
    points: ["Vergleich mit der Vorwoche", "Umsatz nach Kanal und Standort", "Top-Artikel und starke Zeiten"],
    seo: {
      title: "Restaurant-Kennzahlen und Analytics",
      description:
        "OneServe Analytics zeigt Umsatz, Bestellungen und Trends über alle Kanäle und Standorte, ohne Export.",
    },
  },
];

export function getFeature(slug: string): Feature | undefined {
  return features.find((f) => f.slug === slug);
}

export function featureHref(slug: FeatureSlug): string {
  return `/funktionen/${slug}`;
}
