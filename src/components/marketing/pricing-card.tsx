import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { included, pricingNote } from "@/content/pricing";

export function PricingCard() {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <div className="grid overflow-hidden rounded-lg border border-border bg-white lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col items-start gap-6 border-b border-border p-7 sm:p-12 lg:border-b-0 lg:border-r">
          <p className="text-sm font-medium text-gray-500">OneServe Komplett</p>
          <p className="flex flex-wrap items-baseline gap-3.5">
            <span className="tabular text-[clamp(72px,8vw,104px)] font-semibold leading-[0.9] tracking-[-0.06em]">
              {siteConfig.price.label}
            </span>
            <span className="text-base leading-snug text-gray-600">
              netto pro Restaurant
              <br />
              und Monat
            </span>
          </p>
          <Button asChild className="mt-auto">
            <Link href={siteConfig.cta.primary.href}>{siteConfig.cta.primary.label}</Link>
          </Button>
        </div>
        <div className="flex flex-col gap-4 p-7 sm:p-12">
          <h3 className="text-base font-semibold">Enthalten</h3>
          <ul className="grid gap-x-7 sm:grid-cols-2">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 border-b border-gray-150 py-3 text-[15px]">
                <Check className="mt-1 size-4 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm leading-relaxed text-gray-600">{pricingNote}</p>
        </div>
      </div>
    </div>
  );
}
