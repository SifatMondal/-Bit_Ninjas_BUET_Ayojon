# Ayojon - Event Services Platform

A production-ready web application for discovering and booking event services across Bangladesh. Built with Next.js 14, TypeScript, PostgreSQL, and AI-powered search.

## 🚀 Features

- **Natural Language Search**: AI-powered intent parsing using OpenAI
- **Semantic Search**: Vector embeddings with pgvector for intelligent ranking
- **Multi-language Support**: English and Bangla (বাংলা) with next-intl
- **Interactive Maps**: Leaflet + OpenStreetMap for location-based discovery
- **Secure Payments**: SSLCommerz integration (BDT) with webhooks
- **Real-time Chat**: In-app messaging for bookings and inquiries
- **Role-Based Access**: USER, BUSINESS, and ADMIN roles with NextAuth
- **PWA Support**: Installable progressive web app with offline capabilities
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation
- **Performance**: Optimized for Core Web Vitals (LCP ≤ 2.5s, CLS ≤ 0.1)

## 📋 Prerequisites

- Node.js 18.17.0 or higher
- pnpm 8.0.0 or higher
- Docker and Docker Compose (for local database)
- PostgreSQL 14+ with pgvector extension

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **UI**: Tailwind CSS + shadcn/ui + lucide-react
- **Auth**: NextAuth.js (credentials + Google OAuth)
- **State Management**: TanStack Query
- **Forms**: React Hook Form + Zod
- **i18n**: next-intl
- **Maps**: Leaflet + react-leaflet
- **AI**: OpenAI (GPT-4 for intent parsing, embeddings for semantic search)
- **Payments**: SSLCommerz (sandbox)
- **File Uploads**: UploadThing
- **Testing**: Vitest, Testing Library, Playwright
- **CI/CD**: ESLint, Prettier, Husky, commitlint

## 🚦 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd ayojon
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://ayojon:password@localhost:5432/ayojon_dev` |
| `NEXTAUTH_SECRET` | NextAuth secret (generate with `openssl rand -base64 32`) | `your-secret-here` |
| `NEXTAUTH_URL` | Your app URL | `http://localhost:3000` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | `your-google-client-id` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | `your-google-client-secret` |
| `OPENAI_API_KEY` | OpenAI API key for AI features | `sk-your-openai-api-key` |
| `SSLCOMMERZ_STORE_ID` | SSLCommerz store ID (sandbox) | `your-store-id` |
| `SSLCOMMERZ_STORE_PASSWORD` | SSLCommerz store password | `your-store-password` |
| `RESEND_API_KEY` | Resend API key for emails | `re_your-api-key` |
| `UPLOADTHING_SECRET` | UploadThing secret for file uploads | `sk_your-secret` |
| `UPLOADTHING_APP_ID` | UploadThing app ID | `your-app-id` |

### 4. Start the database

Start PostgreSQL with pgvector using Docker:

```bash
docker compose up -d
```

### 5. Run database migrations

```bash
pnpm db:migrate
```

### 6. Seed the database (optional)

Populate with sample data including businesses, categories, and cities:

```bash
pnpm db:seed
```

### 7. Start the development server

```bash
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm format` | Format code with Prettier |
| `pnpm db:push` | Push schema changes to database |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:seed` | Seed database with sample data |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm test` | Run unit tests |
| `pnpm test:api` | Run API tests |
| `pnpm e2e` | Run end-to-end tests |
| `pnpm perf` | Run Lighthouse performance audit |

## 🏗️ Project Structure

```
ayojon/
├── app/                      # Next.js App Router
│   ├── [locale]/            # Internationalized routes
│   │   ├── layout.tsx       # Root layout with providers
│   │   └── page.tsx         # Landing page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── navbar.tsx          # Navigation bar
│   ├── footer.tsx          # Footer
│   └── ...
├── lib/                     # Utilities and helpers
│   ├── utils.ts            # Common utilities
│   ├── types.ts            # TypeScript types
│   └── constants.ts        # App constants
├── messages/               # i18n translations
│   ├── en.json            # English
│   └── bn.json            # Bangla
├── prisma/                # Database
│   ├── schema.prisma      # Prisma schema
│   └── seed.ts            # Seed script
├── public/                # Static assets
├── scripts/               # Build and utility scripts
├── test/                  # Test setup
├── e2e/                   # E2E tests
└── docker-compose.yml     # Docker services
```

## 🎯 Development Status

### ✅ Stage 0 — Project Bootstrap & Repo Hygiene (COMPLETED)

- ✅ Next.js 14 + TypeScript initialized
- ✅ Tailwind CSS + shadcn/ui configured
- ✅ ESLint, Prettier, Husky, commitlint set up
- ✅ Docker + docker-compose with PostgreSQL + pgvector
- ✅ Environment configuration (.env.example)
- ✅ Security headers and PWA config
- ✅ Basic layout with Navbar, Footer, and toast notifications
- ✅ i18n foundation (English/Bangla)

### 🚧 Next Stages

- Stage 1: Database, Prisma & Seed
- Stage 2: Auth & RBAC + Onboarding
- Stage 3: i18n (Full translations)
- Stage 4: AI Intent Parsing & Semantic Search
- Stage 5: Map + Results UX
- Stage 6: Business Profile & Booking Flow
- Stage 7: Payments (SSLCommerz)
- Stage 8: In-App Chat
- Stage 9: Business & Admin Dashboards
- Stage 10: Accessibility, Motion, and Micro-UX
- Stage 11: Testing, SEO, PWA & Analytics
- Stage 12: Documentation & Deployment

## 🧪 Testing

### Unit Tests

```bash
pnpm test
```

### API Tests

```bash
pnpm test:api
```

### E2E Tests

```bash
pnpm e2e
```

### Performance Audit

```bash
pnpm perf
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker

```bash
docker build -t ayojon .
docker run -p 3000:3000 ayojon
```

## 🔒 Security

- Secure headers configured (HSTS, CSP, etc.)
- Input validation with Zod
- NextAuth for authentication
- Rate limiting (to be implemented)
- CSRF protection via NextAuth

## 📄 License

This project is proprietary and confidential.

## 👥 Contributors

- Bit_Ninjas_BUET Team

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Stage 0 Summary**: ✅ Project bootstrapped successfully with all tooling, configurations, and basic layout in place. Ready for database schema and seed implementation in Stage 1.
