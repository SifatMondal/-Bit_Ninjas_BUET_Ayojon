'use client';

import { useState, useTransition } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { locales, localeNames, type Locale } from '@/lib/i18n';

export function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = (newLocale: Locale) => {
    startTransition(() => {
      // Set cookie
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
      // Reload page to apply new locale
      window.location.reload();
    });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="gap-2"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">
          {localeNames[currentLocale as Locale] || 'English'}
        </span>
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-36 rounded-md border bg-popover p-1 shadow-md">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                className={`w-full rounded px-3 py-2 text-left text-sm transition-colors hover:bg-accent ${
                  currentLocale === locale ? 'bg-accent font-medium' : ''
                }`}
              >
                {localeNames[locale]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
