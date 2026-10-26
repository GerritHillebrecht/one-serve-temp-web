import { Check } from "lucide-react";

import { Section, SectionHeader } from "@/components/marketing/section";

const rows = [
  { area: "Bestellungen", before: "Kasse plus ein Tablet je Lieferplattform", after: "Alle Kanäle in einer Übersicht" },
  { area: "Speisekarte", before: "In jedem System einzeln gepflegt", after: "Einmal gepflegt, für Kasse und Webshop" },
  {
    area: "Team",
    before: "Dienstplan in Tabellen, Absprachen im Gruppenchat",
    after: "Dienstplan und Nachrichten im selben System",
  },
  { area: "Zahlen", before: "Exporte aus jedem System zusammentragen", after: "Umsatz und Kanäle auf einen Blick" },
];

export function Why() {
  return (
    <Section aria-labelledby="why-title">
      <SectionHeader
        eyebrow="Warum OneServe"
        title="Weniger Programme. Weniger Abstimmung."
        titleId="why-title"
        lead="In vielen Betrieben hat jede Aufgabe ihre eigene Software. OneServe führt sie zusammen – mit einer gemeinsamen Datenbasis für Kasse, Bestellungen, Team und Zahlen."
      />
      <table className="w-full border-collapse border-t border-gray-900 text-left">
        <caption className="sr-only">Vergleich: getrennte Systeme und OneServe</caption>
        <thead className="hidden md:table-header-group">
          <tr className="border-b border-border text-[13px] font-medium text-gray-500">
            <th scope="col" className="w-[26%] py-3.5 font-medium">
              Bereich
            </th>
            <th scope="col" className="py-3.5 font-medium">
              Mit getrennten Systemen
            </th>
            <th scope="col" className="py-3.5 font-medium">
              Mit OneServe
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.area} className="flex flex-col gap-2 border-b border-border py-6 md:table-row md:py-0">
              <th scope="row" className="text-[19px] font-semibold tracking-[-0.015em] md:py-6.5">
                {r.area}
              </th>
              <td className="text-gray-500 md:py-6.5 md:pr-8">
                <span className="font-medium md:hidden">Heute: </span>
                {r.before}
              </td>
              <td className="md:py-6.5">
                <span className="flex items-baseline gap-2.5">
                  <Check className="size-4 shrink-0 translate-y-0.5" strokeWidth={2.2} aria-hidden="true" />
                  {r.after}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}
