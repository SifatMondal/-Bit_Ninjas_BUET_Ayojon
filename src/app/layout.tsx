import { SiteShell } from "@/components/layout/site-shell";
import { AppProviders } from "@/components/providers/app-providers";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ayojon.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ayojon | Celebrate brilliantly",
    template: "%s | Ayojon",
  },
  description:
    "Ayojon is Bangladesh's modern marketplace for planning weddings and celebrations, helping you discover verified businesses, compare packages, and book with confidence.",
  keywords: [
    "Ayojon",
    "Bangladesh events",
    "wedding planner",
    "event marketplace",
    "celebration services",
  ],
  authors: [{ name: "Ayojon" }],
  openGraph: {
    title: "Ayojon | Celebrate brilliantly",
    description: "Discover trusted wedding and event professionals across Bangladesh with Ayojon.",
    url: siteUrl,
    siteName: "Ayojon",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayojon | Celebrate brilliantly",
    description: "Discover trusted wedding and event professionals across Bangladesh with Ayojon.",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#0A0A0A" }, { color: "#ffffff" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("bg-background font-sans antialiased", poppins.variable, playfair.variable)}
      >
        <AppProviders>
          <SiteShell>{children}</SiteShell>
          <Toaster toastOptions={{ duration: 5000 }} />
        </AppProviders>
      </body>
    </html>
  );
}
