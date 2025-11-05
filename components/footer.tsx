import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Building2, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Ayojon</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t('tagline')}
            </p>
            <div className="flex gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* For Customers */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">{t('forCustomers')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/search"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('findServices')}
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('howItWorks')}
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('categories')}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* For Businesses */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">{t('forBusinesses')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/business/signup"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('listYourBusiness')}
                </Link>
              </li>
              <li>
                <Link
                  href="/business/benefits"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('benefits')}
                </Link>
              </li>
              <li>
                <Link
                  href="/business/pricing"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('pricing')}
                </Link>
              </li>
              <li>
                <Link
                  href="/business/resources"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('resources')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">{t('company')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary"
                >
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Ayojon. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
