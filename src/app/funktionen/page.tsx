import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { SectionHeader } from "@/components/marketing/section";
import { FinalCta } from "@/components/landing/final-cta";
import { Container } from "@/components/site/container";
import { featureHref, features } from "@/content/features";

export const metadata: Metadata = {
  title: "Funktionen",
  description:
    "Alle OneServe-Module im Überblick: Kassensystem, Connect, Dienstplan, Webshop, Delivery und Analytics für die Gastronomie.",
  alternates: { canonical: "/funktionen" },
};

export default function FunktionenPage() {
  return (
    <>
      <Container className="pb-24 pt-10 md:pb-34">
        <Breadcrumbs items={[{ label: "Funktionen", href: "/funktionen" }]} />
        <SectionHeader
          as="h1"
          eyebrow="Funktionen"
          title="Alles, was dein Betrieb braucht. In einer Plattform."
          lead="Sechs Module, eine gemeinsame Datenbasis: Produkte, Bestellungen und Mitarbeiter sind überall dieselben."
          className="mt-10"
        />
        <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <li key={f.slug} className="bg-white">
              <Link
                href={featureHref(f.slug)}
                className="group flex h-full flex-col gap-3 p-6 transition-colors duration-base hover:bg-gray-50 sm:p-8"
              >
                <span className="font-mono text-[13px] text-gray-500">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="text-2xl font-semibold tracking-[-0.025em]">{f.name}</h2>
                <p className="leading-relaxed text-gray-600">{f.description}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-medium">
                  Mehr erfahren
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
      <FinalCta />
    </>
  );
}
