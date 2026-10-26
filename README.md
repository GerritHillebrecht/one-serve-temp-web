# OneServe Website

Marketing-Website für OneServe: Landingpage, Funktionsseiten, Wissen (Ratgeber sowie Rechner & Vorlagen) und Preise.

## Start

```bash
pnpm install
cp .env.example .env.local   # URLs eintragen
pnpm dev
```

| Befehl           | Zweck                                       |
| ---------------- | ------------------------------------------- |
| `pnpm dev`       | Entwicklungsserver                          |
| `pnpm build`     | Produktions-Build (statisch vorgerendert)   |
| `pnpm lint`      | ESLint                                      |
| `pnpm typecheck` | Routen-Typen erzeugen und TypeScript prüfen |
| `pnpm test`      | Unit-Tests (Vitest)                         |

## Technik

- Next.js 16 (App Router, Cache Components), React 19, TypeScript
- Tailwind CSS 4 mit OneServe-Tokens in `src/app/globals.css`
- shadcn/ui-Konventionen (`src/components/ui`, Radix-Primitives)
- MDX für Ratgeber-Inhalte (`@next/mdx`, `src/mdx-components.tsx`)
- Schriften Geist und Geist Mono, selbst gehostet über das Paket `geist`

## Struktur

```text
src/
├── app/                    Routen: /, /funktionen, /funktionen/[slug], /preise, /wissen/…
├── components/
│   ├── ui/                 shadcn/ui-Bausteine (Button, Accordion, Navigation, Sheet)
│   ├── site/               Header, Footer, Container
│   ├── marketing/          Section, Preis-Karte, FAQ, Breadcrumbs, JSON-LD
│   ├── landing/            Sections der Startseite inkl. Feature-Timeline
│   └── product/            Produkt-Screens (App-Gerüst, Kasse, Connect, Dienstplan, Webshop, Delivery, Analytics)
├── config/site.ts          Name, URLs, CTAs, Navigation
├── content/                Module, Preise und FAQ, Wissens-Register
├── demo/fixtures.ts        Demo-Welt „Trattoria Demo“ für alle Screens
├── lib/                    Formatierung (de-DE), Motion-Tokens, Hilfsfunktionen
└── styles/product-ui.css   Gekapselte Styles der Produkt-Screens (.pui)
```

## Interaktive Teile

- **Hero:** `src/components/landing/hero-board.tsx` – Bestellsequenz, läuft einmal (< 5 s), danach stabiler Endzustand; „Ablauf erneut abspielen“. Bewegung über React `<ViewTransition>`.
- **Feature-Timeline:** `src/components/landing/feature-timeline.tsx` – ab 1024 × 760 px Sticky-Bühne mit Scroll-Aktivierung (natives Scrollen, Klick scrollt an die passende Stelle), darunter Tabs bzw. Chips.
- **Demos:** `src/components/product/*-screen.tsx` – sechs bedienbare Modul-Demos mit lokalem Zustand und „Demo zurücksetzen“. Keine Netzwerkaufrufe, keine Buchungen, keine Zahlungen.
- **Rechner:** Logik in `src/lib/calculators/` (mit Tests), Oberfläche in `src/components/calculator/`. Neue Rechner im Register `src/content/knowledge.ts` und in `src/app/wissen/rechner-vorlagen/[slug]/page.tsx` eintragen.
- **Ratgeber:** MDX unter `src/content/ratgeber/<slug>.mdx`, Metadaten und Quellen im Register `src/content/knowledge.ts`.

## Leitplanken

- **Design-Tokens:** Farben, Radien, Schatten und Motion kommen ausschließlich aus `globals.css` (CSS) bzw. `src/lib/motion.ts` (JS).
- **Demo-Daten:** Alle Produkt-Screens nutzen `src/demo/fixtures.ts`. Keine echten Mandantendaten, keine Netzwerkaufrufe, keine Zahlungen.
- **Wissen:** Ein Bereich ohne Inhalte steht auf `noindex` und fehlt in der Sitemap. Ratgeber zu Recht, Steuern und Zahlungen erst nach fachlicher Prüfung veröffentlichen.
- **Answers** ist keine eigene Rubrik: Fachfragen gehören in den Ratgeber, Produktfragen auf die Funktionsseiten, kurze Plattformfragen in die FAQ.
- **Reduzierte Bewegung:** Alle Animationen respektieren `prefers-reduced-motion`.

## Vor dem Livegang

- `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SIGNUP_URL` und `NEXT_PUBLIC_LOGIN_URL` setzen. Ohne Signup- und Login-URL führen die CTAs zum Abschluss-Abschnitt der Startseite.
- Impressum, Datenschutz und AGB ersetzen (aktuell Platzhalter auf `noindex`).
- Logo-Asset einsetzen (aktuell Wortmarke in Geist).
