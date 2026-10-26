/**
 * Register für Wissensinhalte. Ratgeber liegen als MDX unter
 * src/content/ratgeber/<slug>.mdx, Rechner als React-Komponenten.
 * Dieses Register ist die einzige Quelle für Titel, Beschreibung,
 * Datum, Quellen und Verknüpfungen.
 *
 * Solange ein Bereich leer ist, steht seine Übersichtsseite auf noindex
 * und fehlt in der Sitemap.
 */
import type { FeatureSlug } from "./features";

export type Source = { title: string; publisher: string; url: string; date?: string };

export type KnowledgeEntry = {
  slug: string;
  title: string;
  /** Kurzer Titel für Karten und Breadcrumbs. */
  shortTitle?: string;
  description: string;
  category: string;
  /** ISO-Datum der letzten inhaltlichen Aktualisierung. */
  updatedAt: string;
  reviewedBy?: string;
  sources?: Source[];
  relatedFeatures?: FeatureSlug[];
  relatedTools?: string[];
  relatedGuides?: string[];
};

export const guides: KnowledgeEntry[] = [
  {
    slug: "lieferplattform-kosten",
    title: "Was kosten Lieferplattformen für Restaurants?",
    shortTitle: "Kosten von Lieferplattformen",
    description:
      "Welche Kosten bei Lieferando, Wolt und Uber Eats entstehen, wovon die Provision abhängt und wie du deine Kosten pro Bestellung berechnest.",
    category: "Verkaufskanäle",
    updatedAt: "2026-10-26",
    sources: [
      {
        title: "Fact Sheet Lieferando Restaurant-Services",
        publisher: "Lieferando",
        url: "https://d21buns5ku92am.cloudfront.net/69464/documents/51522-1678118733-Fact%20Sheet%20Restaurant-Services%20DE-29deac.pdf",
        date: "März 2023",
      },
    ],
    relatedFeatures: ["webshop", "delivery"],
    relatedTools: ["lieferdienst-provisionsrechner"],
  },
];

export const tools: KnowledgeEntry[] = [
  {
    slug: "lieferdienst-provisionsrechner",
    title: "Lieferdienst-Provisionsrechner",
    description:
      "Berechne, wie viel von einer Bestellung über Lieferando, Wolt oder Uber Eats nach Provision und Gebühren bei dir bleibt – pro Bestellung und pro Monat.",
    category: "Rechner",
    updatedAt: "2026-10-26",
    relatedFeatures: ["webshop", "delivery"],
    relatedGuides: ["lieferplattform-kosten"],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
export const getTool = (slug: string) => tools.find((t) => t.slug === slug);

export function formatDateDe(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}
