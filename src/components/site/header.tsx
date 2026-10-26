"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuItemClass,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { knowledgeNav, siteConfig } from "@/config/site";
import { featureHref, features } from "@/content/features";
import { Container } from "@/components/site/container";

function MenuLink({ href, title, text }: { href: string; title: string; text?: string }) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className="flex flex-col gap-0.5 rounded-sm px-3 py-2.5 outline-none transition-colors duration-base ease-standard hover:bg-gray-50 focus-visible:bg-gray-50"
      >
        <span className="text-[15px] font-medium">{title}</span>
        {text ? <span className="text-sm text-gray-500">{text}</span> : null}
      </Link>
    </NavigationMenuLink>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-md backdrop-saturate-150">
      <Container className="flex h-16 items-center gap-10">
        <Link
          href="/"
          className="flex min-h-11 items-center text-xl font-bold tracking-[-0.03em]"
          aria-label="OneServe – zur Startseite"
        >
          OneServe
        </Link>

        <NavigationMenu className="hidden lg:flex" aria-label="Hauptnavigation">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Funktionen</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[600px] grid-cols-2 gap-1">
                  {features.map((f) => (
                    <MenuLink key={f.slug} href={featureHref(f.slug)} title={f.name} text={f.summary} />
                  ))}
                </div>
                <div className="mt-1 border-t border-border pt-1">
                  <MenuLink href="/funktionen" title="Alle Funktionen im Überblick" />
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Wissen</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[360px] gap-1">
                  {knowledgeNav.map((item) => (
                    <MenuLink key={item.href} href={item.href} title={item.label} text={item.description} />
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/preise" className={navigationMenuItemClass}>
                  Preise
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href={siteConfig.cta.login.href}
            className="hidden h-10 items-center rounded-full px-3 text-[15px] font-medium transition-colors duration-base hover:bg-gray-100 lg:inline-flex"
          >
            {siteConfig.cta.login.label}
          </Link>
          <Button asChild size="sm">
            <Link href={siteConfig.cta.primary.href}>{siteConfig.cta.primary.label}</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon" className="lg:hidden" aria-label="Menü öffnen">
                <Menu className="size-[18px]" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent title="Menü">
              <div className="flex h-10 items-center text-xl font-bold tracking-[-0.03em]">OneServe</div>
              <nav aria-label="Mobile Navigation" className="mt-4 flex flex-col">
                <p className="pt-4 text-sm font-medium text-gray-500">Funktionen</p>
                {features.map((f) => (
                  <SheetClose asChild key={f.slug}>
                    <Link
                      href={featureHref(f.slug)}
                      className="flex min-h-12 items-center border-b border-gray-150 text-lg"
                    >
                      {f.name}
                    </Link>
                  </SheetClose>
                ))}
                <p className="pt-6 text-sm font-medium text-gray-500">Wissen</p>
                {knowledgeNav.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link href={item.href} className="flex min-h-12 items-center border-b border-gray-150 text-lg">
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    href="/preise"
                    className="mt-4 flex min-h-12 items-center border-b border-gray-150 text-lg font-medium"
                  >
                    Preise
                  </Link>
                </SheetClose>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  <Button asChild variant="secondary">
                    <Link href={siteConfig.cta.login.href}>{siteConfig.cta.login.label}</Link>
                  </Button>
                  <Button asChild>
                    <Link href={siteConfig.cta.primary.href}>{siteConfig.cta.primary.label}</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
