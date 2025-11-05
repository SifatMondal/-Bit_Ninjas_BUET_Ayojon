# Ayojon - Bangladesh's Premier Event & Service Marketplace

> **Status:** 🚧 In Development (4 of 13 stages complete - 31%)

A production-ready, full-stack marketplace connecting event service providers with customers across Bangladesh. Built with Next.js 14, TypeScript, PostgreSQL, and modern web technologies.

## 🎯 Project Overview

Ayojon is a comprehensive event services marketplace featuring:
- **Natural Language Search** with AI intent parsing (OpenAI)
- **Semantic Search** powered by pgvector embeddings
- **Role-Based Access Control** (USER, BUSINESS, ADMIN)
- **Bilingual Support** (English & Bangla)
- **Real-time Chat** for bookings
- **Integrated Payments** via SSLCommerz (Bangladesh)
- **Interactive Maps** with Leaflet + OpenStreetMap
- **PWA** with offline support

## ✅ Completed Stages (1-3)

### STAGE 0: Project Bootstrap ✅
- Next.js 14 with App Router + TypeScript
- Tailwind CSS + shadcn/ui (dark mode support)
- ESLint, Prettier, Husky pre-commit hooks
- Docker Compose (PostgreSQL + pgvector + Redis)
- Security headers, PWA manifest
- Comprehensive tooling setup

### STAGE 1: Database & Prisma ✅
**Schema includes:**
- User authentication & OAuth (NextAuth models)
- Business profiles with KYC, ratings, geolocation
- Service categories & listings with embeddings
- Bookings lifecycle (PENDING → COMPLETED)
- Payments (SSLCommerz integration)
- Reviews with sub-ratings
- Real-time messaging
- Search analytics
- Cities with coordinates

**Seed Data:**
- 5 Bangladesh cities with coordinates
- 5 service categories
- 12 demo businesses (photographers, caterers, makeup artists, decorators, venues)
- 6 users + 1 admin
- 10 bookings in various statuses
- 8 reviews

### STAGE 2: Auth & RBAC ✅
- NextAuth with email/password + Google OAuth
- JWT-based sessions
- Role-based middleware (USER, BUSINESS, ADMIN)
- Sign in/up pages with demo credentials
- Business registration flow
- Multi-step onboarding wizard
- Auth-aware navbar

### STAGE 3: Internationalization ✅
- English & Bangla (বাংলা) support with next-intl
- Cookie-based locale persistence
- Bangla number conversion (০১২৩৪৫৬৭৮৯)
- BDT currency formatting
- Locale switcher component
- 158 translation strings per language

## 📁 Project Structure

```
/workspace
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # NextAuth + signup
│   │   └── business/             # Business registration & onboarding
│   ├── auth/                     # Auth pages (signin, signup, error)
│   ├── business/                 # Business pages (register, onboarding)
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles + shadcn/ui theme
├── components/
│   ├── ui/                       # shadcn/ui components (Button, Toast, etc.)
│   ├── navbar.tsx                # Auth-aware navigation
│   ├── footer.tsx                # Footer with links
│   ├── providers.tsx             # React Query + Session + Theme providers
│   └── locale-switcher.tsx       # Language switcher
├── lib/
│   ├── auth.ts                   # NextAuth configuration
│   ├── prisma.ts                 # Prisma client singleton
│   ├── utils.ts                  # Utility functions
│   └── i18n.ts                   # i18n utilities (Bangla numbers, formatting)
├── prisma/
│   ├── schema.prisma             # Complete database schema
│   └── seed.ts                   # Seed script with Bangladesh data
├── i18n/
│   └── request.ts                # next-intl configuration
├── messages/
│   ├── en.json                   # English translations
│   └── bn.json                   # Bangla translations
├── middleware.ts                 # Role-based route protection
├── docker-compose.yml            # PostgreSQL + pgvector + Redis
├── Dockerfile                    # Production Docker image
├── .env.example                  # Environment variables template
└── package.json                  # Dependencies & scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (LTS)
- pnpm 8+
- Docker & Docker Compose (for database)
- PostgreSQL 16 with pgvector extension

### Installation

1. **Clone and Install**
```bash
cd /workspace
pnpm install
```

2. **Environment Setup**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start Database**
```bash
docker compose up -d
```

4. **Run Migrations & Seed**
```bash
pnpm db:migrate
pnpm db:seed
```

5. **Start Development Server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Credentials

After seeding, you can log in with:
- **Admin**: `admin@ayojon.com` / `password123`
- **User**: `rahim@example.com` / `password123`
- **Business**: `info@momentscapture.com` / `password123`

## 📦 Available Scripts

```bash
pnpm dev              # Start development server
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm typecheck        # TypeScript type checking
pnpm format           # Format with Prettier

# Database
pnpm db:push          # Push schema changes (no migration)
pnpm db:migrate       # Create and run migrations
pnpm db:seed          # Seed database with demo data
pnpm db:studio        # Open Prisma Studio

# Testing (coming in Stage 11)
pnpm test             # Run unit tests
pnpm test:api         # Run API tests
pnpm test:e2e         # Run E2E tests with Playwright

# Performance
pnpm perf             # Run Lighthouse audit
```

## 🗄️ Database Schema

### Core Models
- **User** - Authentication, roles (USER, BUSINESS, ADMIN)
- **Business** - Business profiles, KYC, ratings, geolocation
- **ServiceCategory** - Photography, Catering, Makeup, Decorator, Venue
- **Listing** - Business services with price ranges, embeddings
- **Booking** - Quote → Accept → Pay → Complete lifecycle
- **Payment** - SSLCommerz transactions
- **Review** - Ratings with sub-categories (quality, professionalism, value)
- **Message** - Chat between users and businesses
- **SearchEvent** - Analytics for search queries with embeddings
- **City** - Bangladesh cities with coordinates

### Enums
- **Role**: USER, BUSINESS, ADMIN
- **BookingStatus**: PENDING, QUOTED, ACCEPTED, PAID, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED, DISPUTED
- **PaymentStatus**: PENDING, PROCESSING, PAID, FAILED, REFUNDED
- **KYCStatus**: NOT_STARTED, PENDING, VERIFIED, REJECTED

## 🔐 Environment Variables

Create a `.env` file with:

```bash
# Database
DATABASE_URL="postgresql://ayojon:ayojon_dev_password@localhost:5432/ayojon_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-min-32-chars-change-in-production"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OpenAI (for Stage 4)
OPENAI_API_KEY="sk-your-openai-api-key"

# SSLCommerz (Stage 7)
SSLCOMMERZ_STORE_ID="your-store-id"
SSLCOMMERZ_STORE_PASSWORD="your-store-password"
SSLCOMMERZ_IS_LIVE="false"

# Email
RESEND_API_KEY="re_your-resend-api-key"
EMAIL_FROM="noreply@ayojon.com"

# UploadThing (Stage 6)
UPLOADTHING_SECRET="sk_live_your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# Site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Ayojon"
```

## 🌐 Internationalization

Ayojon supports English and Bangla (বাংলা):

```typescript
import { formatCurrencyWithLocale, toBanglaNumber } from '@/lib/i18n';

// Currency formatting
formatCurrencyWithLocale(50000, 'en'); // "BDT 50,000"
formatCurrencyWithLocale(50000, 'bn'); // "BDT ৫০,০০০"

// Number conversion
toBanglaNumber(12345); // "১২৩৪৫"
```

Users can switch languages via the navbar. Locale is persisted in cookies.

## 🔒 Security Features

- ✅ Secure HTTP headers (CSP, HSTS, X-Frame-Options, etc.)
- ✅ Input validation with Zod
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT-based authentication
- ✅ Role-based middleware protection
- ✅ CSRF protection (NextAuth built-in)
- ⏳ Rate limiting (Stage 10)
- ⏳ OAuth 2.0 (Google) integration complete

## 🧪 Testing (Stage 11)

Testing infrastructure ready:
- **Vitest** for unit tests
- **Testing Library** for component tests
- **Playwright** for E2E tests
- Pre-configured test scripts

## 📱 PWA Support

PWA manifest configured with:
- App name, icons, theme colors
- Offline capability (to be implemented in Stage 11)
- Service worker registration

## 🎨 Design System

### Colors
- Primary: Blue (#3B82F6)
- Secondary: Gray
- Destructive: Red
- Success: Green

### Components (shadcn/ui)
- ✅ Button, Toast, Toaster
- ⏳ More components will be added as needed in later stages

## 🚧 Remaining Stages (4-12)

### STAGE 4: AI Intent Parsing & Semantic Search 📍 NEXT
- OpenAI integration for query parsing
- pgvector embeddings for listings
- Semantic + distance + rating ranking
- Search filters and chips

### STAGE 5: Map + Results UX
- Leaflet integration
- Synchronized map + list view
- Infinite scroll
- Near me with geolocation

### STAGE 6: Business Profile & Booking Flow
- Business detail pages
- Gallery, services, pricing
- Quote request flow
- Booking management

### STAGE 7: Payments (SSLCommerz)
- Payment gateway integration
- Webhook handling
- Transaction logging
- Sandbox testing

### STAGE 8: In-App Chat
- Real-time messaging
- Booking-attached conversations
- File uploads
- Unread indicators

### STAGE 9: Business & Admin Dashboards
- Business dashboard (bookings, listings, analytics)
- Admin panel (verification, moderation)
- Analytics and reports

### STAGE 10: Accessibility & Motion
- WCAG 2.1 AA compliance
- Framer Motion animations
- Keyboard navigation
- Screen reader support

### STAGE 11: Testing, SEO, PWA
- Complete test coverage
- E2E happy path
- OpenGraph + structured data
- Offline support

### STAGE 12: Documentation & Deployment
- Comprehensive runbook
- Deployment guides
- Troubleshooting
- Production checklist

## 📝 Development Notes

### Code Quality
- TypeScript strict mode enabled
- ESLint with Next.js rules
- Prettier for consistent formatting
- Husky pre-commit hooks (lint + typecheck)
- Commitlint for conventional commits

### Performance Targets (Stage 10)
- LCP ≤ 2.5s
- CLS ≤ 0.1
- FID ≤ 100ms
- Bundle size optimization

### Browser Support
- Modern browsers (last 2 versions)
- Chrome, Firefox, Safari, Edge
- Mobile: iOS Safari, Chrome Mobile

## 🤝 Contributing

This is a comprehensive production-ready application. When contributing:
1. Follow the existing code style
2. Write meaningful commit messages (Commitlint enforced)
3. Add tests for new features
4. Update documentation

## 📄 License

[Your License Here]

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Prisma** - Database ORM
- **NextAuth** - Authentication
- **shadcn/ui** - Component library
- **Tailwind CSS** - Styling
- **PostgreSQL** - Database
- **pgvector** - Vector similarity search
- **OpenAI** - AI-powered search
- **SSLCommerz** - Payment gateway for Bangladesh

---

**Built with ❤️ for Bangladesh**
