/**
 * Register für Wissensinhalte. Artikel und Rechner liegen als MDX bzw.
 * React-Module im Repository und werden hier mit ihren Metadaten eingetragen.
 *
 * Solange ein Bereich leer ist, steht seine Übersichtsseite auf noindex
 * und fehlt in der Sitemap.
 */
export type KnowledgeEntry = {
  slug: string;
  title: string;
  description: string;
  category: string;
  updatedAt: string;
  reviewedBy?: string;
  relatedFeatures?: string[];
};

export const guides: KnowledgeEntry[] = [];
export const tools: KnowledgeEntry[] = [];
