import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { SectionHeader } from "@/components/marketing/section";
import { Container } from "@/components/site/container";
import type { KnowledgeEntry } from "@/content/knowledge";

export function KnowledgeHub({
  crumbs,
  eyebrow,
  title,
  lead,
  entries,
  basePath,
  emptyText,
}: {
  crumbs: { label: string; href: string }[];
  eyebrow: string;
  title: string;
  lead: string;
  entries: KnowledgeEntry[];
  basePath: string;
  emptyText: string;
}) {
  return (
    <Container className="pb-24 pt-10 md:pb-34">
      <Breadcrumbs items={crumbs} />
      <SectionHeader as="h1" eyebrow={eyebrow} title={title} lead={lead} className="mt-10" />
      {entries.length === 0 ? (
        <p className="rounded-lg bg-gray-50 px-6 py-5 text-gray-600">{emptyText}</p>
      ) : (
        <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
          {entries.map((e) => (
            <li key={e.slug} className="bg-white">
              <Link href={`${basePath}/${e.slug}`} className="group flex h-full flex-col gap-2 p-7 hover:bg-gray-50">
                <span className="text-[13px] text-gray-500">{e.category}</span>
                <h2 className="text-xl font-semibold tracking-[-0.02em]">{e.title}</h2>
                <p className="leading-relaxed text-gray-600">{e.description}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-3 font-medium">
                  Lesen
                  <ArrowRight
                    className="size-4 transition-transform duration-base group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
