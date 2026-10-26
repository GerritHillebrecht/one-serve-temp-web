import Link from "next/link";
import { Check } from "lucide-react";

import { Container } from "@/components/site/container";
import { Button } from "@/components/ui/button";
import { HeroBoard } from "@/components/landing/hero-board";
import { siteConfig } from "@/config/site";

const meta = [
  `${siteConfig.price.label} ${siteConfig.price.unit}`,
  "Alle Funktionen, keine Modulpreise",
  "Im Browser und auf dem Tablet",
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-14 md:pt-24">
      <Container>
        <div className="grid items-end gap-x-18 gap-y-8 lg:grid-cols-[1.25fr_0.75fr]">
          <h1
            id="hero-title"
            className="text-balance text-[clamp(46px,6.4vw,88px)] font-semibold leading-none tracking-[-0.045em]"
          >
            Dein Restaurant.
            <br />
            Ein System.
          </h1>
          <div className="flex flex-col gap-7 pb-2">
            <p className="text-pretty text-lg leading-relaxed text-gray-600">
              Kasse, Bestellungen, Reservierungen, Webshop und Management – miteinander verbunden, statt auf mehrere
              Programme verteilt.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Button asChild>
                <Link href={siteConfig.cta.primary.href}>{siteConfig.cta.primary.label}</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/#funktionen">Funktionen ansehen</Link>
              </Button>
            </div>
          </div>
        </div>
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-5 text-sm text-gray-600">
          {meta.map((m) => (
            <li key={m} className="flex items-center gap-2">
              <Check className="size-4 text-gray-900" strokeWidth={2} aria-hidden="true" />
              {m}
            </li>
          ))}
        </ul>
        <div className="mt-10 overflow-hidden rounded-t-xl bg-gray-50 pl-5 pt-5 md:mt-14 md:px-10 md:pt-10">
          <figure className="pui m-0">
            <HeroBoard />
          </figure>
        </div>
      </Container>
    </section>
  );
}
