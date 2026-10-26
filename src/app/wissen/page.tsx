import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { SectionHeader } from "@/components/marketing/section";
import { Container } from "@/components/site/container";
import { knowledgeNav } from "@/config/site";
import { guides, tools } from "@/content/knowledge";

const hasContent = guides.length + tools.length > 0;

export const metadata: Metadata = {
  title: "Wissen",
  description: "Ratgeber, Rechner und Vorlagen für Restaurantbetreiber.",
  alternates: { canonical: "/wissen" },
  robots: hasContent ? undefined : { index: false, follow: true },
};

export default function WissenPage() {
  return (
    <Container className="pb-24 pt-10 md:pb-34">
      <Breadcrumbs items={[{ label: "Wissen", href: "/wissen" }]} />
      <SectionHeader
        as="h1"
        eyebrow="Wissen"
        title="Weniger suchen. Mehr verstehen."
        lead="Praxiswissen und Werkzeuge für Restaurantbetreiber – auch ohne OneServe nützlich."
        className="mt-10"
      />
      <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
        {knowledgeNav.map((k) => (
          <li key={k.href} className="bg-white">
            <Link href={k.href} className="group flex h-full flex-col gap-2 p-8 hover:bg-gray-50">
              <h2 className="text-2xl font-semibold tracking-[-0.025em]">{k.label}</h2>
              <p className="leading-relaxed text-gray-600">{k.description}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-medium">
                Ansehen
                <ArrowRight
                  className="size-4 transition-transform duration-base group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
