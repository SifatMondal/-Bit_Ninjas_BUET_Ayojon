"use client";

import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, PartyPopper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
  badge?: string;
};

const navItems: NavItem[] = [
  { href: "/#discover", label: "Discover" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/search", label: "Search" },
  { href: "/#for-business", label: "For businesses", badge: "New" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <PartyPopper className="size-5" />
            </span>
            <span className="font-display text-xl">Ayojon</span>
          </Link>
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "group inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground shadow"
                          : "text-foreground/80 hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <span>{item.label}</span>
                      {item.badge ? <Badge variant="secondary">{item.badge}</Badge> : null}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button asChild size="sm" variant="outline" className="font-semibold">
            <Link href="/business/onboarding">List your business</Link>
          </Button>
          <UserMenu />
        </div>

        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="lg:hidden">
              <Menu className="size-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="pt-10 sm:max-w-full">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <PartyPopper className="size-5" />
                  </span>
                  <span className="font-display text-xl">Ayojon</span>
                </Link>
                <div className="flex items-center gap-2">
                  <LocaleSwitcher />
                  <ThemeToggle />
                </div>
              </div>
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between rounded-lg border border-border/80 px-4 py-3 text-sm font-medium transition",
                      pathname === item.href && "border-primary/60 bg-primary/5 text-primary"
                    )}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <span>{item.label}</span>
                    {item.badge ? <Badge>{item.badge}</Badge> : null}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <Button
                  asChild
                  size="lg"
                  className="w-full font-semibold"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Link href="/business/onboarding">List your business</Link>
                </Button>
                <UserMenu />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
