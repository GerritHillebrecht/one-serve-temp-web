import { features } from "./features";

export const included: string[] = [
  ...features.map((f) => f.name),
  "Tischplan und Reservierungen",
  "Bestellübersicht und Küchenansicht",
  "Anbindung von Lieferplattformen",
  "Mehrere Standorte und Marken",
  "KI-gestützte Telefonie",
];

export const pricingNote =
  "Kosten für Zahlungsabwicklung, Hardware und externe Plattformen werden separat ausgewiesen.";

export type Faq = { question: string; answer: string };

/** Kurze Plattformfragen. Fachfragen gehören in den Ratgeber, nicht hierher. */
export const platformFaqs: Faq[] = [
  {
    question: "Welche Hardware benötige ich?",
    answer: "OneServe läuft im Browser und auf Tablets. Für Bons und Küchenzettel kommt ein Drucker hinzu.",
  },
  {
    question: "Wie funktioniert das Onboarding?",
    answer:
      "Nach der Registrierung führt dich die Ersteinrichtung durch Betrieb, Produkte und Team. Das Setup-Center zeigt jederzeit, was noch offen ist.",
  },
  {
    question: "Welche Verkaufskanäle können angebunden werden?",
    answer:
      "Vor Ort, dein eigener Webshop und Lieferplattformen – alle Bestellungen laufen in einer Übersicht zusammen.",
  },
  {
    question: "Wie funktioniert der Wechsel von einem anderen Kassensystem?",
    answer: "Produkte, Tische und Team richtest du in der geführten Ersteinrichtung an.",
  },
  {
    question: "Welche Gebühren fallen an?",
    answer: `69 € netto pro Restaurant und Monat für den vollen Funktionsumfang. ${pricingNote}`,
  },
];
