import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import {
  Camera,
  UtensilsCrossed,
  Sparkles,
  PartyPopper,
  Building2,
  Search,
  Shield,
  Clock,
  Star,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-12 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Find Perfect Event Professionals in{' '}
              <span className="text-primary">Bangladesh</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Discover and book verified photographers, caterers, makeup artists, decorators, and
              venues for your special occasions. Simply describe what you need in plain language.
            </p>

            {/* Natural Language Search Bar */}
            <div className="mx-auto mb-8 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g., I need a photographer for my wedding in Dhaka next month under 50,000 BDT"
                  className="w-full rounded-lg border bg-background px-6 py-4 pr-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  asChild
                >
                  <Link href="/search">
                    <Search className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/search">Browse Services</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/business/register">List Your Business</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="border-t bg-muted/40 py-12 md:py-16">
          <div className="container">
            <h2 className="mb-8 text-center text-3xl font-bold">Popular Categories</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {[
                { icon: Camera, name: 'Photography', count: '150+' },
                { icon: UtensilsCrossed, name: 'Catering', count: '200+' },
                { icon: Sparkles, name: 'Makeup Artists', count: '100+' },
                { icon: PartyPopper, name: 'Decorators', count: '80+' },
                { icon: Building2, name: 'Venues', count: '120+' },
              ].map((category) => (
                <Link
                  key={category.name}
                  href={`/search?category=${category.name.toLowerCase()}`}
                  className="group rounded-lg border bg-card p-6 text-center transition-all hover:shadow-md"
                >
                  <category.icon className="mx-auto mb-3 h-10 w-10 text-primary transition-transform group-hover:scale-110" />
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} providers</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 md:py-16">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: Search,
                  title: 'Search & Compare',
                  description:
                    'Describe your needs in plain language or browse categories. Compare verified providers based on ratings, reviews, and pricing.',
                },
                {
                  icon: Shield,
                  title: 'Request & Book',
                  description:
                    'Send quote requests to multiple providers. Review their offers and book the best fit for your event.',
                },
                {
                  icon: Star,
                  title: 'Pay & Review',
                  description:
                    'Make secure payments through SSLCommerz. After your event, leave a review to help others.',
                },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t bg-muted/40 py-12 md:py-16">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Ayojon?</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Shield,
                  title: 'Verified Professionals',
                  description:
                    'All businesses are verified with KYC and background checks for your peace of mind.',
                },
                {
                  icon: Clock,
                  title: '24/7 Support',
                  description:
                    'Get help anytime with our dedicated customer support team via in-app chat.',
                },
                {
                  icon: Star,
                  title: 'Real Reviews',
                  description:
                    'Read authentic reviews from verified customers who have completed bookings.',
                },
              ].map((feature, index) => (
                <div key={index} className="rounded-lg border bg-card p-6">
                  <feature.icon className="mb-3 h-10 w-10 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="rounded-2xl bg-primary px-8 py-12 text-center text-primary-foreground md:px-12">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Ready to Make Your Event Special?
              </h2>
              <p className="mb-8 text-lg opacity-90">
                Join thousands of happy customers who found their perfect event professionals on
                Ayojon.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/search">Find Services Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
                  <Link href="/business/register">Grow Your Business</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
