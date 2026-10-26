import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Globale MDX-Komponenten für Ratgeber-Artikel.
 * Typografie folgt den Marketing-Tokens; Phase 4 ergänzt Antwortbox,
 * Quellenangabe und eingebettete Rechner.
 */
const components: MDXComponents = {
  h2: (props) => <h2 className="mt-14 text-3xl font-semibold leading-tight tracking-[-0.03em]" {...props} />,
  h3: (props) => <h3 className="mt-10 text-xl font-semibold tracking-[-0.02em]" {...props} />,
  p: (props) => <p className="mt-5 text-[17px] leading-relaxed text-gray-700" {...props} />,
  ul: (props) => <ul className="mt-5 list-disc space-y-2 pl-6 text-[17px] leading-relaxed text-gray-700" {...props} />,
  ol: (props) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-[17px] leading-relaxed text-gray-700" {...props} />
  ),
  a: ({ href = "", ...props }) =>
    href.startsWith("/") ? (
      <Link href={href} className="underline underline-offset-4" {...props} />
    ) : (
      <a href={href} className="underline underline-offset-4" rel="noopener" {...props} />
    ),
  table: (props) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-[15px]" {...props} />
    </div>
  ),
  th: (props) => <th className="border-b border-gray-900 py-2.5 pr-4 font-medium" {...props} />,
  td: (props) => <td className="border-b border-border py-2.5 pr-4" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
