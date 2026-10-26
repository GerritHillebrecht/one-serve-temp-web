import { Check } from "lucide-react";

import { Container } from "@/components/site/container";
import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
  tone = "default",
  ...props
}: React.ComponentProps<"section"> & { tone?: "default" | "muted" }) {
  return (
    <section className={cn("py-24 md:py-34", tone === "muted" && "bg-gray-50", className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  titleId,
  className,
  as: Heading = "h2",
}: {
  eyebrow: string;
  title: string;
  lead?: React.ReactNode;
  titleId?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("mb-11 grid gap-x-16 gap-y-6 md:mb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end", className)}>
      <p className="text-sm font-medium text-gray-500 lg:col-span-2">{eyebrow}</p>
      <Heading
        id={titleId}
        className="text-balance text-[clamp(34px,4.2vw,52px)] font-semibold leading-[1.06] tracking-[-0.035em]"
      >
        {title}
      </Heading>
      {lead ? <p className="text-pretty text-lg leading-relaxed text-gray-600">{lead}</p> : null}
    </div>
  );
}

export function CheckItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <li className={cn("flex items-center gap-3", className)}>
      <Check className="size-4 shrink-0" strokeWidth={2.4} aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}
