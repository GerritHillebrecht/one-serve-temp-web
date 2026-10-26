import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { DeliveryCommissionCalculator } from "@/components/calculator/delivery-commission-calculator";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { Container } from "@/components/site/container";
import { formatDateDe, getGuide, getTool, tools } from "@/content/knowledge";

/** Werkzeuge nach Slug. Neue Rechner hier und im Register eintragen. */
const toolComponents: Record<string, { component: React.ComponentType; assumptions: string[] }> = {
  "lieferdienst-provisionsrechner": {
    component: DeliveryCommissionCalculator,
    assumptions: [
      "Provision und Zahlungsgebühr werden als Prozentsatz vom Bestellwert berechnet.",
      "Als Bestellwert gilt der Betrag, den die Plattform als Grundlage nimmt – meist der Bruttobestellwert ohne Trinkgeld. Prüfe das in deinem Vertrag.",
      "Feste Gebühren fallen pro Bestellung an.",
      "Der Wareneinsatz ist optional und als Prozentsatz vom Bestellwert angegeben.",
      "Nicht enthalten sind Steuern, Verpackung, Personal- und eigene Lieferkosten.",
      "Die Vorlagen 14 % und 30 % stammen aus dem Lieferando-Fact-Sheet vom März 2023. Für Wolt, Uber Eats und deinen aktuellen Vertrag trägst du den vereinbarten Satz ein.",
    ],
  },
};

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/wissen/rechner-vorlagen/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  const url = `/wissen/rechner-vorlagen/${tool.slug}`;
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: url },
    openGraph: { title: tool.title, description: tool.description, url },
  };
}

export default async function ToolPage({ params }: PageProps<"/wissen/rechner-vorlagen/[slug]">) {
  const { slug } = await params;
  const tool = getTool(slug);
  const impl = tool ? toolComponents[tool.slug] : undefined;
  if (!tool || !impl) notFound();
  const Tool = impl.component;
  const related = (tool.relatedGuides ?? []).map(getGuide).filter((g) => g !== undefined);

  return (
    <Container className="pb-24 pt-10 md:pb-34">
      <Breadcrumbs
        items={[
          { label: "Wissen", href: "/wissen" },
          { label: "Rechner & Vorlagen", href: "/wissen/rechner-vorlagen" },
          { label: tool.title, href: `/wissen/rechner-vorlagen/${tool.slug}` },
        ]}
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
        <div>
          <p className="text-sm font-medium text-gray-500">{tool.category}</p>
          <h1 className="mt-4 text-balance text-[clamp(36px,4.6vw,56px)] font-semibold leading-[1.05] tracking-[-0.04em]">
            {tool.title}
          </h1>
        </div>
        <p className="text-pretty text-lg leading-relaxed text-gray-600">{tool.description}</p>
      </div>

      <div className="mt-12 rounded-xl bg-gray-50 p-4 sm:p-8">
        <Tool />
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.025em]">So rechnet der Rechner</h2>
          <p className="mt-3 text-sm text-gray-500">
            Stand <time dateTime={tool.updatedAt}>{formatDateDe(tool.updatedAt)}</time>
          </p>
        </div>
        <ul className="flex flex-col border-t border-border">
          {impl.assumptions.map((a) => (
            <li key={a} className="border-b border-border py-4 text-[16px] leading-relaxed text-gray-700">
              {a}
            </li>
          ))}
        </ul>
      </div>

      {related.length ? (
        <div className="mt-16 grid gap-3">
          {related.map((g) => (
            <Link
              key={g.slug}
              href={`/wissen/ratgeber/${g.slug}`}
              className="group flex items-center justify-between gap-6 rounded-lg border border-border p-6 transition-colors duration-base hover:bg-gray-50"
            >
              <span className="flex flex-col gap-1">
                <span className="text-[13px] text-gray-500">Ratgeber</span>
                <span className="text-lg font-semibold tracking-[-0.015em]">{g.title}</span>
              </span>
              <ArrowRight
                className="size-5 shrink-0 transition-transform duration-base group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      ) : null}
    </Container>
  );
}
