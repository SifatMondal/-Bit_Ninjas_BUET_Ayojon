'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'bn' : 'en';
    // Remove current locale prefix and add new one
    const pathWithoutLocale = pathname.replace(/^\/(en|bn)/, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLocale}
      className="gap-2"
      aria-label="Switch language"
    >
      <Languages className="h-4 w-4" />
      <span className="text-sm font-medium">
        {locale === 'en' ? 'বাংলা' : 'English'}
      </span>
    </Button>
  );
}
