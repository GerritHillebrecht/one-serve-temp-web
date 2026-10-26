/**
 * Zentrale Website-Konfiguration.
 * Ziel-URLs für Registrierung und Login kommen aus Umgebungsvariablen,
 * damit die CTAs nie ins Leere zeigen, sobald die App-URLs feststehen.
 */
export const siteConfig = {
  name: "OneServe",
  description: "Kasse, Bestellungen, Reservierungen, Webshop und Management für die Gastronomie – in einem System.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "de_DE",
  price: {
    amount: 69,
    label: "69 €",
    unit: "netto pro Restaurant und Monat",
  },
  cta: {
    primary: {
      label: "Ausprobieren",
      href: process.env.NEXT_PUBLIC_SIGNUP_URL ?? "/#ausprobieren",
    },
    login: {
      label: "Anmelden",
      href: process.env.NEXT_PUBLIC_LOGIN_URL ?? "/#ausprobieren",
    },
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const knowledgeNav: NavItem[] = [
  {
    label: "Ratgeber",
    href: "/wissen/ratgeber",
    description: "Fachartikel, Anleitungen und Kostenvergleiche für die Gastronomie",
  },
  {
    label: "Rechner & Vorlagen",
    href: "/wissen/rechner-vorlagen",
    description: "Kostenlose Werkzeuge für Kalkulation und Planung",
  },
];

export const legalNav: NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
];
