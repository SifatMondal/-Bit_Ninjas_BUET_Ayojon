export const locales = ['en', 'bn'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  bn: 'বাংলা',
};

export const defaultLocale: Locale = 'en';

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Bangla number conversion
const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBanglaNumber(num: number | string): string {
  return String(num)
    .split('')
    .map((digit) => {
      const d = parseInt(digit);
      return isNaN(d) ? digit : banglaDigits[d];
    })
    .join('');
}

// Currency formatting with Bangla support
export function formatCurrencyWithLocale(amount: number, locale: Locale): string {
  const formatted = new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  // For Bangla, replace digits
  if (locale === 'bn') {
    return formatted.replace(/\d/g, (d) => banglaDigits[parseInt(d)]);
  }

  return formatted;
}

// Date formatting with locale
export function formatDateWithLocale(date: Date | string, locale: Locale): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const formatted = new Intl.DateTimeFormat(locale === 'bn' ? 'bn-BD' : 'en-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);

  return formatted;
}
