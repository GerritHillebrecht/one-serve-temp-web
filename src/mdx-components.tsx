import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/** Kurze, direkte Antwort am Anfang eines Ratgebers. */
function Kurzantwort({ children }: { children: React.ReactNode }) {
  return (
    <aside aria-label="Kurz gesagt" className="mt-2 rounded-lg bg-gray-50 p-6 sm:p-7">
      <p className="text-sm font-medium text-gray-500">Kurz gesagt</p>
      <div className="mt-2 text-[17px] leading-relaxed text-gray-900 [&>p]:mt-0">{children}</div>
    </aside>
  );
}

/**
 * Globale MDX-Komponenten für Ratgeber-Artikel.
 * Typografie folgt den Marketing-Tokens.
 */
const components: MDXComponents = {
  Kurzantwort,
  h2: (props) => (
    <h2 className="mt-16 scroll-mt-24 text-[28px] font-semibold leading-tight tracking-[-0.03em]" {...props} />
  ),
  h3: (props) => <h3 className="mt-10 text-xl font-semibold tracking-[-0.02em]" {...props} />,
  p: (props) => <p className="mt-5 text-[17px] leading-relaxed text-gray-700" {...props} />,
  strong: (props) => <strong className="font-semibold text-gray-900" {...props} />,
  ul: (props) => (
    <ul className="mt-5 list-disc space-y-2.5 pl-6 text-[17px] leading-relaxed text-gray-700" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-5 list-decimal space-y-2.5 pl-6 text-[17px] leading-relaxed text-gray-700" {...props} />
  ),
  a: ({ href = "", ...props }) =>
    href.startsWith("/") ? (
      <Link href={href} className="font-medium text-gray-900 underline underline-offset-4" {...props} />
    ) : (
      <a href={href} className="font-medium text-gray-900 underline underline-offset-4" rel="noopener" {...props} />
    ),
  table: (props) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left text-[15px]" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-gray-900 py-2.5 pr-4 align-bottom text-[13px] font-medium text-gray-500"
      {...props}
    />
  ),
  td: (props) => <td className="tabular border-b border-border py-3 pr-4 align-top" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
