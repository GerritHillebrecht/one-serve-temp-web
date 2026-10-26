"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;

function SheetContent({
  className,
  children,
  title,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & { title: string }) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/20 data-[state=open]:animate-[fade-up_var(--os-duration-base)_var(--os-ease-standard)]" />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "fixed inset-x-0 top-0 z-50 max-h-dvh overflow-y-auto border-b border-border bg-background px-4 pb-6 pt-3 shadow-frame data-[state=open]:animate-fade-up",
          className,
        )}
        {...props}
      >
        <SheetPrimitive.Title className="sr-only">{title}</SheetPrimitive.Title>
        <SheetPrimitive.Description className="sr-only">Navigation der OneServe-Website</SheetPrimitive.Description>
        {children}
        <SheetPrimitive.Close
          className="absolute right-4 top-3 grid size-11 place-items-center rounded-full bg-gray-100"
          aria-label="Menü schließen"
        >
          <X className="size-[18px]" aria-hidden="true" />
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

export { Sheet, SheetTrigger, SheetClose, SheetContent };
