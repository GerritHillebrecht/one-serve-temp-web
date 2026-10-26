import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { siteConfig } from "@/config/site";
import { JsonLd } from "./json-ld";

type Crumb = { label: string; href: string };

/** Sichtbare Breadcrumbs plus BreadcrumbList; die Startseite steht immer vorn. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Start", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Brotkrumen">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-gray-900">
                    {c.label}
                  </span>
                ) : (
                  <Link href={c.href} className="hover:text-gray-900">
                    {c.label}
                  </Link>
                )}
                {!last ? <ChevronRight className="size-3.5" aria-hidden="true" /> : null}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: new URL(c.href, siteConfig.url).toString(),
          })),
        }}
      />
    </>
  );
}
