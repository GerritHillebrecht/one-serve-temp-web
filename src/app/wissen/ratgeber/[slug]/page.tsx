import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { JsonLd } from "@/components/marketing/json-ld";
import { Container } from "@/components/site/container";
import { siteConfig } from "@/config/site";
import { featureHref, getFeature } from "@/content/features";
import { formatDateDe, getGuide, getTool, guides } from "@/content/knowledge";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/wissen/ratgeber/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const url = `/wissen/ratgeber/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.description,
      url,
      modifiedTime: guide.updatedAt,
    },
  };
}

export default async function GuidePage({ params }: PageProps<"/wissen/ratgeber/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const { default: Content } = await import(`@/content/ratgeber/${guide.slug}.mdx`);
  const url = new URL(`/wissen/ratgeber/${guide.slug}`, siteConfig.url).toString();
  const tools = (guide.relatedTools ?? []).map(getTool).filter((t) => t !== undefined);
  const features = (guide.relatedFeatures ?? []).map(getFeature).filter((f) => f !== undefined);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          inLanguage: "de-DE",
          dateModified: guide.updatedAt,
          mainEntityOfPage: url,
          publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
        }}
      />
      <Container className="pb-24 pt-10 md:pb-34">
        <Breadcrumbs
          items={[
            { label: "Wissen", href: "/wissen" },
            { label: "Ratgeber", href: "/wissen/ratgeber" },
            { label: guide.shortTitle ?? guide.title, href: `/wissen/ratgeber/${guide.slug}` },
          ]}
        />
        <div className="mx-auto mt-12 max-w-[720px]">
          <p className="text-sm font-medium text-gray-500">{guide.category}</p>
          <h1 className="mt-4 text-balance text-[clamp(36px,4.6vw,56px)] font-semibold leading-[1.05] tracking-[-0.04em]">
            {guide.title}
          </h1>
          <p className="mt-5 text-sm text-gray-500">
            Aktualisiert am <time dateTime={guide.updatedAt}>{formatDateDe(guide.updatedAt)}</time>
            {guide.reviewedBy ? ` · fachlich geprüft von ${guide.reviewedBy}` : ""}
          </p>

          <article className="mt-10">
            <Content />
          </article>

          {guide.sources?.length ? (
            <section aria-labelledby="quellen" className="mt-16 border-t border-border pt-8">
              <h2 id="quellen" className="text-base font-semibold">
                Quellen
              </h2>
              <ol className="mt-4 flex flex-col gap-2 text-[15px] text-gray-600">
                {guide.sources.map((s) => (
                  <li key={s.url}>
                    {s.publisher}:{" "}
                    <a href={s.url} rel="noopener" className="text-gray-900 underline underline-offset-4">
                      {s.title}
                    </a>
                    {s.date ? `, ${s.date}` : ""}
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {tools.length || features.length ? (
            <section aria-labelledby="weiter" className="mt-16 grid gap-3">
              <h2 id="weiter" className="sr-only">
                Weiterführend
              </h2>
              {tools.map((t) => (
                <Link
                  key={t.slug}
                  href={`/wissen/rechner-vorlagen/${t.slug}`}
                  className="group flex items-center justify-between gap-6 rounded-lg bg-gray-50 p-6 transition-colors duration-base hover:bg-gray-100"
                >
                  <span className="flex flex-col gap-1">
                    <span className="text-[13px] text-gray-500">Rechner</span>
                    <span className="text-lg font-semibold tracking-[-0.015em]">{t.title}</span>
                    <span className="text-[15px] text-gray-600">{t.description}</span>
                  </span>
                  <ArrowRight
                    className="size-5 shrink-0 transition-transform duration-base group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              ))}
              {features.length ? (
                <p className="mt-4 text-[15px] text-gray-600">
                  Passend in OneServe:{" "}
                  {features.map((f, i) => (
                    <span key={f.slug}>
                      {i ? " und " : ""}
                      <Link
                        href={featureHref(f.slug)}
                        className="font-medium text-gray-900 underline underline-offset-4"
                      >
                        {f.name}
                      </Link>
                    </span>
                  ))}
                  .
                </p>
              ) : null}
            </section>
          ) : null}
        </div>
      </Container>
    </>
  );
}
