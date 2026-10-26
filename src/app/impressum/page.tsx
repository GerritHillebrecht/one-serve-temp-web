import type { Metadata } from "next";

import { LegalPlaceholder } from "@/components/marketing/legal-placeholder";

export const metadata: Metadata = {
  title: "Impressum",
  alternates: { canonical: "/impressum" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LegalPlaceholder title="Impressum" />;
}
