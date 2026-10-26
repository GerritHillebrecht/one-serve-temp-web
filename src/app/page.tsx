import type { Metadata } from "next";

import { JsonLd } from "@/components/marketing/json-ld";
import { PricingCard } from "@/components/marketing/pricing-card";
import { Section, SectionHeader } from "@/components/marketing/section";
import { FeaturesSection } from "@/components/landing/features-section";
import { FinalCta } from "@/components/landing/final-cta";
import { Hero } from "@/components/landing/hero";
import { KnowledgeSection } from "@/components/landing/knowledge-section";
import { Setup } from "@/components/landing/setup";
import { Why } from "@/components/landing/why";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          { "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
            inLanguage: "de-DE",
          },
        ]}
      />
      <Hero />
      <Why />
      <FeaturesSection />
      <Setup />
      <Section id="preise" aria-labelledby="preise-title">
        <SectionHeader
          eyebrow="Preis"
          title="Ein Preis. Alle Module."
          titleId="preise-title"
          lead="Keine Tarifstufen und keine Modulpreise. Jedes Restaurant bekommt den vollen Funktionsumfang."
        />
        <PricingCard />
      </Section>
      <KnowledgeSection />
      <FinalCta />
    </>
  );
}
