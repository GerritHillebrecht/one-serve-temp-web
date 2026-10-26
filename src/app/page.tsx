import type { Metadata } from "next";

import { FaqList } from "@/components/marketing/faq-list";
import { JsonLd } from "@/components/marketing/json-ld";
import { PricingCard } from "@/components/marketing/pricing-card";
import { Section, SectionHeader } from "@/components/marketing/section";
import { FeaturesSection } from "@/components/landing/features-section";
import { FinalCta } from "@/components/landing/final-cta";
import { Hero } from "@/components/landing/hero";
import { Setup } from "@/components/landing/setup";
import { Why } from "@/components/landing/why";
import { siteConfig } from "@/config/site";
import { platformFaqs } from "@/content/pricing";

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
      <Section aria-labelledby="faq-title" className="border-t border-border">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="flex flex-col items-start gap-5">
            <p className="text-sm font-medium text-gray-500">Häufige Fragen</p>
            <h2
              id="faq-title"
              className="text-balance text-[clamp(34px,4.2vw,52px)] font-semibold leading-[1.06] tracking-[-0.035em]"
            >
              Was Gastronomen vorher wissen wollen.
            </h2>
          </div>
          <FaqList items={platformFaqs} />
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
