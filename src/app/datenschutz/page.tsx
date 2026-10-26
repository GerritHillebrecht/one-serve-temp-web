import type { Metadata } from "next";

import { LegalPlaceholder } from "@/components/marketing/legal-placeholder";

export const metadata: Metadata = {
  title: "Datenschutz",
  alternates: { canonical: "/datenschutz" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LegalPlaceholder title="Datenschutz" />;
}
