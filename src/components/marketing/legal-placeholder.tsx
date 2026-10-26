import { Container } from "@/components/site/container";

/**
 * Platzhalter für Rechtsseiten, bis die verbindlichen Texte vorliegen.
 * Die Seiten stehen auf noindex. Vor dem Livegang ersetzen.
 */
export function LegalPlaceholder({ title }: { title: string }) {
  return (
    <Container className="max-w-3xl pb-24 pt-16 md:pb-34">
      <h1 className="text-4xl font-semibold tracking-[-0.035em]">{title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-gray-600">
        Der verbindliche Text wird vor der Veröffentlichung ergänzt.
      </p>
    </Container>
  );
}
