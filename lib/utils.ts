import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  locale: string = 'en-BD',
  currency: string = 'BDT'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function toBengaliNumerals(num: number | string): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, (digit) => bengaliDigits[parseInt(digit)]);
}

export function formatDistance(meters: number, locale: string = 'en'): string {
  const km = meters / 1000;
  if (locale === 'bn') {
    return km < 1
      ? `${toBengaliNumerals(Math.round(meters))} মি`
      : `${toBengaliNumerals(km.toFixed(1))} কিমি`;
  }
  return km < 1 ? `${Math.round(meters)}m` : `${km.toFixed(1)}km`;
}
