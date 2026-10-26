import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { JsonLd } from "@/components/marketing/json-ld";
import { FinalCta } from "@/components/landing/final-cta";
import { FeatureScreen } from "@/components/product/feature-screen";
import { Container } from "@/components/site/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { featureHref, features, getFeature } from "@/content/features";

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/funktionen/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) return {};
  return {
    title: feature.seo.title,
    description: feature.seo.description,
    alternates: { canonical: featureHref(feature.slug) },
    openGraph: { title: feature.seo.title, description: feature.seo.description, url: featureHref(feature.slug) },
  };
}

export default async function FeaturePage({ params }: PageProps<"/funktionen/[slug]">) {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) notFound();

  const related = features.filter((f) => f.slug !== feature.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: `${siteConfig.name} ${feature.name}`,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: feature.seo.description,
          url: new URL(featureHref(feature.slug), siteConfig.url).toString(),
        }}
      />
      <Container className="pt-10">
        <Breadcrumbs
          items={[
            { label: "Funktionen", href: "/funktionen" },
            { label: feature.name, href: featureHref(feature.slug) },
          ]}
        />
        <div className="mt-10 grid items-end gap-x-16 gap-y-7 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col gap-5">
            <p className="text-sm font-medium text-gray-500">{feature.name}</p>
            <h1 className="text-balance text-[clamp(40px,5.4vw,72px)] font-semibold leading-[1.02] tracking-[-0.045em]">
              {feature.headline}
            </h1>
          </div>
          <div className="flex flex-col gap-6 pb-1.5">
            <p className="text-pretty text-lg leading-relaxed text-gray-600">{feature.description}</p>
            <div className="flex flex-wrap gap-2.5">
              <Button asChild>
                <Link href={siteConfig.cta.primary.href}>{siteConfig.cta.primary.label}</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/preise">Preise ansehen</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 flex h-[520px] items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-3.5 sm:h-[600px] sm:p-6 lg:h-[680px] lg:p-10">
          <FeatureScreen slug={feature.slug} />
        </div>
      </Container>

      <section aria-labelledby="faehigkeiten-title" className="py-24 md:py-34">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2
            id="faehigkeiten-title"
            className="text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.08] tracking-[-0.035em]"
          >
            Was {feature.name} kann
          </h2>
          <ul className="flex flex-col border-t border-border">
            {feature.points.map((p) => (
              <li key={p} className="flex items-center gap-3 border-b border-border py-5 text-lg">
                <Check className="size-4 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="verbunden-title" className="border-t border-border bg-gray-50 py-24 md:py-34">
        <Container>
          <h2
            id="verbunden-title"
            className="mb-10 text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.08] tracking-[-0.035em]"
          >
            Verbunden mit dem Rest von OneServe
          </h2>
          <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug} className="bg-white">
                <Link
                  href={featureHref(r.slug)}
                  className="group flex h-full flex-col gap-2 p-7 transition-colors duration-base hover:bg-gray-50"
                >
                  <h3 className="text-xl font-semibold tracking-[-0.02em]">{r.name}</h3>
                  <p className="leading-relaxed text-gray-600">{r.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-3 font-medium">
                    Mehr erfahren
                    <ArrowRight
                      className="size-4 transition-transform duration-base group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
