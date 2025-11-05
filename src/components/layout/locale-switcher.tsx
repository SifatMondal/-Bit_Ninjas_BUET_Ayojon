"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

type Locale = "en" | "bn";

const locales: Record<Locale, { label: string; native: string }> = {
  en: { label: "English", native: "English" },
  bn: { label: "Bangla", native: "বাংলা" },
};

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [activeLocale, setActiveLocale] = useState<Locale>("en");

  useEffect(() => {
    setMounted(true);
    const htmlLocale =
      (typeof document !== "undefined" && (document.documentElement.lang as Locale)) || "en";
    setActiveLocale(locales[htmlLocale] ? htmlLocale : "en");
  }, []);

  const buildUrl = useCallback(
    (locale: Locale) => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      params.set("lang", locale);
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams]
  );

  const handleSelect = useCallback(
    (locale: Locale) => {
      if (typeof document !== "undefined") {
        document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;
        document.documentElement.lang = locale;
      }
      setActiveLocale(locale);
      router.push(buildUrl(locale));
      router.refresh();
    },
    [buildUrl, router]
  );

  const label = useMemo(() => locales[activeLocale]?.native ?? "English", [activeLocale]);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Loading locale" className="h-9 w-9" disabled>
        <Languages className="size-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" size="sm" variant="ghost" className="gap-2">
          <Languages className="size-4" />
          <span className="hidden sm:inline-flex text-sm font-medium">{label}</span>
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44" sideOffset={8}>
        {(Object.keys(locales) as Locale[]).map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleSelect(locale)}
            className="flex items-center justify-between text-sm"
          >
            <span>{locales[locale].label}</span>
            {locale === activeLocale && <span className="text-xs text-primary">Active</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
