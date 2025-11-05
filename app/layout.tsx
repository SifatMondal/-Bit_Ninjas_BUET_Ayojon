import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ayojon - Your Trusted Event & Service Marketplace',
  description:
    'Find and book the best photographers, caterers, makeup artists, decorators, and venues in Bangladesh. Connect with verified professionals for your special events.',
  keywords: [
    'Bangladesh events',
    'photographer Bangladesh',
    'catering services',
    'makeup artist',
    'event planning',
    'venue booking',
  ],
  authors: [{ name: 'Ayojon' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Ayojon - Your Trusted Event & Service Marketplace',
    description: 'Find and book the best event professionals in Bangladesh',
    type: 'website',
    locale: 'en_BD',
    alternateLocale: 'bn_BD',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
