import type { Metadata } from "next";

import { KnowledgeHub } from "@/components/marketing/knowledge-hub";
import { tools } from "@/content/knowledge";

export const metadata: Metadata = {
  title: "Rechner & Vorlagen für die Gastronomie",
  description: "Kostenlose Rechner und Vorlagen für Kalkulation und Planung im Restaurant.",
  alternates: { canonical: "/wissen/rechner-vorlagen" },
  robots: tools.length ? undefined : { index: false, follow: true },
};

export default function RechnerVorlagenPage() {
  return (
    <KnowledgeHub
      crumbs={[
        { label: "Wissen", href: "/wissen" },
        { label: "Rechner & Vorlagen", href: "/wissen/rechner-vorlagen" },
      ]}
      eyebrow="Rechner & Vorlagen"
      title="Werkzeuge, die mit echten Zahlen rechnen."
      lead="Kostenlose Rechner und Vorlagen mit offen gelegten Annahmen – für Kalkulation, Planung und Vergleiche."
      entries={tools}
      basePath="/wissen/rechner-vorlagen"
      emptyText="Der erste Rechner ist in Arbeit: der Lieferdienst-Provisionsrechner."
    />
  );
}
