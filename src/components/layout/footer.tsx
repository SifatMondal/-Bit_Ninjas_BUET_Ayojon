import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const productLinks = [
  { label: "Search listings", href: "/search" },
  { label: "Event packages", href: "/#discover" },
  { label: "Inspiration", href: "/blog" },
  { label: "Case studies", href: "/stories" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Press", href: "/press" },
  { label: "Contact", href: "/contact" },
];

const supportLinks = [
  { label: "Help center", href: "/help" },
  { label: "FAQs", href: "/help/faq" },
  { label: "Trust & safety", href: "/trust" },
  { label: "Accessibility", href: "/accessibility" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 text-lg font-semibold">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Ayojon
              </span>
              <span className="font-display text-xl">Celebrate brilliantly</span>
            </span>
            <p className="text-sm text-muted-foreground">
              A curated marketplace for weddings and celebrations across Bangladesh. Discover
              trusted businesses, compare packages, and plan every detail confidently.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm" variant="outline" className="font-semibold">
                <Link href="/business/onboarding">List your business</Link>
              </Button>
              <Button asChild size="sm" variant="ghost">
                <Link href="/request-demo">Book a demo</Link>
              </Button>
            </div>
          </div>
          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Support" links={supportLinks} />
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col gap-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Ayojon Technologies Ltd. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/legal/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/legal/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/legal/cookies" className="hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  links: { label: string; href: string }[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-muted-foreground transition hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
