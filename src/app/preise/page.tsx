import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { FaqList } from "@/components/marketing/faq-list";
import { PricingCard } from "@/components/marketing/pricing-card";
import { SectionHeader } from "@/components/marketing/section";
import { FinalCta } from "@/components/landing/final-cta";
import { Container } from "@/components/site/container";
import { platformFaqs } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Preise",
  description:
    "OneServe kostet 69 € netto pro Restaurant und Monat – mit allen Modulen, ohne Tarifstufen und ohne Modulpreise.",
  alternates: { canonical: "/preise" },
};

export default function PreisePage() {
  return (
    <>
      <Container className="pb-24 pt-10 md:pb-34">
        <Breadcrumbs items={[{ label: "Preise", href: "/preise" }]} />
        <SectionHeader
          as="h1"
          eyebrow="Preise"
          title="Ein Preis. Alle Module."
          lead="Keine Tarifstufen und keine Modulpreise. Jedes Restaurant bekommt den vollen Funktionsumfang."
          className="mt-10"
        />
        <PricingCard />
        <div className="mt-24 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.08] tracking-[-0.035em]">
            Fragen zu Preis und Start
          </h2>
          <FaqList items={platformFaqs} />
        </div>
      </Container>
      <FinalCta />
    </>
  );
}
