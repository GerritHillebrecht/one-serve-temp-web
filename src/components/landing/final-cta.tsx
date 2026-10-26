import Link from "next/link";

import { Container } from "@/components/site/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function FinalCta() {
  return (
    <section id="ausprobieren" aria-labelledby="final-title" className="bg-black py-24 text-white md:pb-28 md:pt-32">
      <Container className="grid items-end gap-x-16 gap-y-10 lg:grid-cols-[1.2fr_0.8fr]">
        <h2 id="final-title" className="text-[clamp(42px,6vw,80px)] font-semibold leading-none tracking-[-0.045em]">
          Weniger Programme.
          <br />
          Mehr Überblick.
        </h2>
        <div className="flex flex-col items-start gap-7">
          <p className="text-lg leading-relaxed text-[#b4b4b4]">
            Probier aus, wie OneServe deinen Betrieb verbindet – mit deinen Abläufen und deiner Speisekarte.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Button asChild variant="inverse">
              <Link href={siteConfig.cta.primary.href}>{siteConfig.cta.primary.label}</Link>
            </Button>
            <Button asChild variant="outline-inverse">
              <Link href={siteConfig.cta.login.href}>{siteConfig.cta.login.label}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
