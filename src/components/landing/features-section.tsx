import { Section, SectionHeader } from "@/components/marketing/section";
import { FeatureScreen } from "@/components/product/feature-screen";
import { featureHref, features } from "@/content/features";
import { FeatureTimeline } from "./feature-timeline";

export function FeaturesSection() {
  const modules = features.map((f) => ({
    slug: f.slug,
    name: f.name,
    headline: f.headline,
    description: f.description,
    points: f.points,
    href: featureHref(f.slug),
  }));
  return (
    <Section id="funktionen" aria-labelledby="funktionen-title" className="border-t border-border">
      <SectionHeader
        eyebrow="Funktionen"
        title="Sechs Module. Eine Plattform."
        titleId="funktionen-title"
        lead="Jedes Modul arbeitet mit denselben Produkten, Bestellungen und Mitarbeitern. Wähle ein Modul, um den Screen zu sehen."
        className="md:mb-12"
      />
      <FeatureTimeline
        modules={modules}
        screens={features.map((f) => (
          <FeatureScreen key={f.slug} slug={f.slug} />
        ))}
      />
    </Section>
  );
}
