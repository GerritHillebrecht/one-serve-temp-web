import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-sm text-[15px] font-medium transition-[background-color,border-color,color,transform] duration-base ease-standard active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-gray-800",
        secondary: "bg-secondary text-secondary-foreground hover:bg-gray-150",
        outline: "border border-border bg-background hover:border-gray-300",
        ghost: "hover:bg-gray-100",
        inverse: "bg-white text-black hover:bg-gray-150",
        "outline-inverse": "border border-white/30 text-white hover:border-white/60",
      },
      size: {
        default: "h-12 px-5",
        sm: "h-10 px-4 text-sm",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
