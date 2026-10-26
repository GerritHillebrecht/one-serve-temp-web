import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section, SectionHeader } from "@/components/marketing/section";
import { siteConfig } from "@/config/site";

const steps = [
  { title: "Restaurant anlegen", text: "Registrieren, Betriebsdaten und Öffnungszeiten eintragen." },
  {
    title: "Produkte und Betrieb einrichten",
    text: "Speisekarte, Tische und Drucker anlegen – Schritt für Schritt geführt.",
  },
  { title: "Team und Kanäle verbinden", text: "Mitarbeiter einladen, Webshop aktivieren, weitere Kanäle verbinden." },
  { title: "Betrieb starten", text: "Die erste Bestellung annehmen und loslegen." },
];

export function Setup() {
  return (
    <Section id="einstieg" tone="muted" aria-labelledby="setup-title">
      <SectionHeader
        eyebrow="Einstieg"
        title="In vier Schritten startklar."
        titleId="setup-title"
        lead="Die Ersteinrichtung führt dich durch alles, was dein Restaurant braucht – und du kannst jederzeit unterbrechen."
      />
      <ol className="grid border-t border-border sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-0">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="relative flex flex-col gap-3 border-b border-border py-6 sm:border-b-0 sm:pb-7 sm:pr-7 sm:pt-7"
          >
            {i === 0 ? (
              <span aria-hidden="true" className="absolute -top-px left-0 hidden h-0.5 w-full bg-black sm:block" />
            ) : null}
            <span className="font-mono text-[13px] text-gray-500">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-xl font-semibold tracking-[-0.02em]">{s.title}</h3>
            <p className="text-[15.5px] leading-relaxed text-gray-600">{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-md bg-white px-6 py-5">
        <span className="text-[15.5px]">Das Setup-Center zeigt jederzeit, was noch offen ist.</span>
        <Link
          href={siteConfig.cta.primary.href}
          className="group inline-flex min-h-11 items-center gap-1.5 font-medium"
        >
          {siteConfig.cta.primary.label}
          <ArrowRight
            className="size-4 transition-transform duration-base group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </Section>
  );
}
