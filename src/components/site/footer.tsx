import Link from "next/link";

import { Container } from "@/components/site/container";
import { knowledgeNav, legalNav, siteConfig } from "@/config/site";
import { featureHref, features } from "@/content/features";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title} className="flex flex-col gap-0.5">
      <h2 className="mb-2.5 text-sm font-semibold text-white">{title}</h2>
      {links.map((l) => (
        <Link
          key={l.href + l.label}
          href={l.href}
          className="inline-flex min-h-9 items-center text-[#b4b4b4] hover:text-white"
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-black pb-10 text-[14.5px] text-[#b4b4b4]">
      <Container>
        <div className="grid grid-cols-2 gap-10 border-t border-[#2a2a2a] pt-14 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="col-span-2 flex flex-col gap-3.5 md:col-span-1">
            <span className="text-xl font-bold tracking-[-0.03em] text-white">OneServe</span>
            <p className="max-w-[300px] leading-relaxed">{siteConfig.description}</p>
          </div>
          <FooterColumn
            title="Funktionen"
            links={features.map((f) => ({ label: f.name, href: featureHref(f.slug) }))}
          />
          <FooterColumn
            title="Wissen"
            links={[
              ...knowledgeNav.map((k) => ({ label: k.label, href: k.href })),
              { label: "Preise", href: "/preise" },
            ]}
          />
          <FooterColumn title="Rechtliches" links={legalNav} />
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#2a2a2a] pt-6 text-[13.5px]">
          <span>© 2026 OneServe</span>
        </div>
      </Container>
    </footer>
  );
}
