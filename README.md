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
