import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, CheckCircle, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 via-background to-background py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              {t('hero.subtitle')}
            </p>

            {/* Search Bar */}
            <div className="mx-auto max-w-3xl">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={t('hero.placeholder')}
                    className="h-14 w-full rounded-lg border bg-background pl-12 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button size="lg" className="h-14 px-8" asChild>
                  <Link href="/search">
                    {t('hero.searchButton')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            {t('howItWorks.title')}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Search,
                title: t('howItWorks.step1.title'),
                description: t('howItWorks.step1.description'),
              },
              {
                icon: TrendingUp,
                title: t('howItWorks.step2.title'),
                description: t('howItWorks.step2.description'),
              },
              {
                icon: CheckCircle,
                title: t('howItWorks.step3.title'),
                description: t('howItWorks.step3.description'),
              },
              {
                icon: Star,
                title: t('howItWorks.step4.title'),
                description: t('howItWorks.step4.description'),
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative rounded-lg border bg-card p-6 text-center"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-bold md:text-4xl">
              {t('categories.title')}
            </h2>
            <Button variant="outline" asChild>
              <Link href="/categories">
                {t('categories.viewAll')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Photographer',
              'Caterer',
              'Makeup Artist',
              'Decorator',
              'Venue',
              'DJ & Sound',
            ].map((category) => (
              <Link
                key={category}
                href={`/search?category=${category.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold group-hover:text-primary">
                  {category}
                </h3>
                <ArrowRight className="absolute bottom-6 right-6 h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA for Businesses */}
      <section className="py-20">
        <div className="container">
          <div className="rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-background p-8 text-center md:p-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              {t('cta.business.title')}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              {t('cta.business.description')}
            </p>
            <Button size="lg" asChild>
              <Link href="/business/signup">
                {t('cta.business.button')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
