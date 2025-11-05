import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowRight, CalendarDays, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

const featuredCategories = [
  {
    name: "Photographers",
    description: "Capture every moment with award-winning storytellers.",
  },
  {
    name: "Caterers",
    description: "Signature menus inspired by Bangladeshi flavours.",
  },
  {
    name: "Venues",
    description: "Boutique rooftops to grand convention halls.",
  },
];

const howItWorks = [
  {
    icon: MapPin,
    title: "Search smarter",
    description: "Describe your event in English or বাংলা and receive curated matches instantly.",
  },
  {
    icon: CalendarDays,
    title: "Compare & plan",
    description:
      "Browse availability, pricing, and verified reviews tailored to your date and city.",
  },
  {
    icon: MessageCircle,
    title: "Collaborate",
    description: "Chat with vendors, request quotes, and manage documents in one shared workspace.",
  },
  {
    icon: ShieldCheck,
    title: "Book confidently",
    description:
      "Secure payments, compliance checks, and milestone reminders keep everything on track.",
  },
];

export default function Home() {
  return (
    <div className="space-y-24 pb-20">
      <HeroSection />
      <DiscoverSection />
      <HowItWorksSection />
      <BusinessCallout />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.12),_transparent_60%)]" />
      <div className="container grid gap-10 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div className="space-y-6">
          <Badge variant="secondary" className="w-fit bg-primary/10 text-primary">
            এখনই বুক করুন · Plan with confidence
          </Badge>
          <h1
            id="hero-heading"
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Effortless event planning for every celebration in Bangladesh
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Discover verified businesses, compare personalised packages, and manage your bookings in
            English or বাংলা — all from a single collaborative platform.
          </p>
          <SearchPanel />
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>
              Trusted by couples and corporates in Dhaka, Chattogram, Sylhet, Rajshahi & more.
            </span>
            <Separator orientation="vertical" className="hidden h-5 sm:block" />
            <span className="flex items-center gap-1 font-medium text-foreground">
              <ShieldCheck className="size-4 text-primary" /> SSLCommerz protected payments
            </span>
          </div>
        </div>
        <div className="grid gap-4">
          {featuredCategories.map((category) => (
            <Card key={category.name} className="border-border/70 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg font-semibold">
                  <span>{category.name}</span>
                  <ArrowRight className="size-5 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {category.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function SearchPanel() {
  return (
    <form className="grid gap-3 rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur">
      <label htmlFor="hero-search" className="sr-only">
        Describe your event
      </label>
      <Input
        id="hero-search"
        placeholder="e.g. Photographer in Dhaka next Falgun under 2 lakh"
        autoComplete="off"
        inputMode="text"
        className="h-12 rounded-xl border-0 bg-background/80 shadow-none focus-visible:ring-2 focus-visible:ring-primary"
      />
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="rounded-full bg-muted px-3 py-1">বাংলা ভাষা সমর্থিত</span>
        <span className="rounded-full bg-muted px-3 py-1">Location-aware results</span>
        <span className="rounded-full bg-muted px-3 py-1">AI-powered intent parsing</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="lg" className="rounded-xl px-6 font-semibold">
          Start planning
        </Button>
        <Button variant="ghost" asChild className="gap-2 text-sm">
          <Link href="/search">
            Explore listings <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </form>
  );
}

function DiscoverSection() {
  const highlights = [
    {
      title: "Curated categories",
      description:
        "From mehendi artists to corporate AV teams, find verified specialists instantly.",
    },
    {
      title: "Interactive maps",
      description: "Visualise service coverage, travel fees, and venue proximity within seconds.",
    },
    {
      title: "Smart filters",
      description: "Refine by budget, availability, vibe, sustainability tags, and more.",
    },
  ];

  return (
    <section id="discover" className="container space-y-10">
      <div className="max-w-2xl space-y-3">
        <h2 className="text-3xl font-semibold">Discover what matters most to you</h2>
        <p className="text-muted-foreground">
          Personalised recommendations blend AI insights with community reviews so you can shortlist
          vendors with confidence.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {highlights.map((highlight) => (
          <Card key={highlight.title} className="border-border/70 bg-card/70">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{highlight.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {highlight.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-muted/40 py-16">
      <div className="container space-y-12">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold">How Ayojon works</h2>
          <p className="text-muted-foreground">
            Plan collaboratively with vendors, family, and colleagues on a transparent workflow
            designed for Bangladeshi celebrations.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step, index) => (
            <Card key={step.title} className="h-full border-border/60">
              <CardHeader className="space-y-4">
                <div
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary"
                  )}
                >
                  <step.icon className="size-5" />
                </div>
                <CardTitle className="text-lg font-semibold">
                  <span className="mr-2 text-sm font-medium text-muted-foreground">
                    0{index + 1}
                  </span>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {step.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function BusinessCallout() {
  return (
    <section id="for-business" className="container">
      <Card className="overflow-hidden border-primary/40 bg-gradient-to-br from-primary/10 via-background to-background">
        <CardContent className="grid gap-8 p-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-4">
            <Badge variant="outline" className="border-primary/40 text-primary">
              For event professionals
            </Badge>
            <h3 className="text-2xl font-semibold">Grow your business with Ayojon</h3>
            <p className="text-sm text-muted-foreground">
              Showcase immersive profiles, respond to AI-qualified leads, collect verified reviews,
              and manage payments in BDT with transparent reporting.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild className="font-semibold">
                <Link href="/business/onboarding">Start onboarding</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/business/demo">Talk to our team</Link>
              </Button>
            </div>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="rounded-xl border border-border/60 bg-background/80 p-4">
              <p className="font-medium text-foreground">98% response SLA</p>
              <p>Automated reminders keep leads moving with shared timelines and templates.</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/80 p-4">
              <p className="font-medium text-foreground">Exclusive insights</p>
              <p>Benchmark your pricing, reviews, and search impressions across Bangladesh.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
