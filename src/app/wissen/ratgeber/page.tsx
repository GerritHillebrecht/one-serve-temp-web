import type { Metadata } from "next";

import { KnowledgeHub } from "@/components/marketing/knowledge-hub";
import { guides } from "@/content/knowledge";

export const metadata: Metadata = {
  title: "Ratgeber für die Gastronomie",
  description: "Fachartikel, Anleitungen und Kostenvergleiche für Restaurantbetreiber.",
  alternates: { canonical: "/wissen/ratgeber" },
  robots: guides.length ? undefined : { index: false, follow: true },
};

export default function RatgeberPage() {
  return (
    <KnowledgeHub
      crumbs={[
        { label: "Wissen", href: "/wissen" },
        { label: "Ratgeber", href: "/wissen/ratgeber" },
      ]}
      eyebrow="Ratgeber"
      title="Antworten auf die Fragen aus dem Betrieb."
      lead="Fachartikel, Schritt-für-Schritt-Anleitungen und Kostenvergleiche – geprüft und mit Quellen."
      entries={guides}
      basePath="/wissen/ratgeber"
      emptyText="Die ersten Ratgeber sind in Vorbereitung und erscheinen nach fachlicher Prüfung."
    />
  );
}
