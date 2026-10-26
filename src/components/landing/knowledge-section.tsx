import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DeliveryCommissionCalculator } from "@/components/calculator/delivery-commission-calculator";
import { FaqList } from "@/components/marketing/faq-list";
import { Section, SectionHeader } from "@/components/marketing/section";
import { guides, tools } from "@/content/knowledge";
import { platformFaqs } from "@/content/pricing";

/**
 * Der eine Wissensabschnitt der Startseite: ein Ratgeber, ein funktionierender
 * Rechner und drei kurze Plattformfragen – mit Verweisen auf beide Wissensbereiche.
 */
export function KnowledgeSection() {
  const guide = guides[0];
  const tool = tools[0];
  const faqs = platformFaqs.filter((f) =>
    ["Welche Hardware benötige ich?", "Wie funktioniert das Onboarding?", "Welche Gebühren fallen an?"].includes(
      f.question,
    ),
  );

  return (
    <Section id="wissen" tone="muted" aria-labelledby="wissen-title">
      <SectionHeader
        eyebrow="Wissen"
        title="Weniger suchen. Mehr verstehen."
        titleId="wissen-title"
        lead="Praxiswissen und Werkzeuge für Restaurantbetreiber – auch ohne OneServe nützlich."
      />
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        {guide ? (
          <Link
            href={`/wissen/ratgeber/${guide.slug}`}
            className="group flex flex-col gap-3 rounded-lg border border-border bg-white p-7 transition-[border-color,transform] duration-base ease-standard hover:-translate-y-0.5 hover:border-gray-300 sm:p-8"
          >
            <span className="text-[13px] font-medium text-gray-500">Ratgeber · {guide.category}</span>
            <h3 className="text-balance text-2xl font-semibold leading-tight tracking-[-0.025em]">{guide.title}</h3>
            <p className="leading-relaxed text-gray-600">{guide.description}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-medium">
              Artikel lesen
              <ArrowRight
                className="size-4 transition-transform duration-base group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>
        ) : null}
        {tool ? (
          <div className="flex flex-col gap-5 rounded-lg border border-border bg-white p-5 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="text-[13px] font-medium text-gray-500">Rechner</span>
                <h3 className="mt-1 text-2xl font-semibold leading-tight tracking-[-0.025em]">{tool.title}</h3>
              </div>
              <Link
                href={`/wissen/rechner-vorlagen/${tool.slug}`}
                className="group inline-flex min-h-11 items-center gap-1.5 font-medium"
              >
                Alle Eingaben
                <ArrowRight
                  className="size-4 transition-transform duration-base group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
            <DeliveryCommissionCalculator compact />
          </div>
        ) : null}
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="flex flex-col items-start gap-5">
          <h3 className="text-[28px] font-semibold leading-tight tracking-[-0.03em]">Kurze Fragen zu OneServe</h3>
          <div className="flex flex-col gap-1">
            <Link href="/wissen/ratgeber" className="group inline-flex min-h-11 items-center gap-1.5 font-medium">
              Alle Ratgeber
              <ArrowRight
                className="size-4 transition-transform duration-base group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/wissen/rechner-vorlagen"
              className="group inline-flex min-h-11 items-center gap-1.5 font-medium"
            >
              Alle Rechner & Vorlagen
              <ArrowRight
                className="size-4 transition-transform duration-base group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
        <FaqList items={faqs} />
      </div>
    </Section>
  );
}
