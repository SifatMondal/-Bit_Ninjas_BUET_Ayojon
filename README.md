# Ayojon

Ayojon is a bilingual (English/Bangla) marketplace for event planning in Bangladesh. The platform is built with Next.js 14 (App Router), Tailwind CSS, and shadcn/ui, and ships with production-ready tooling including PWA support, secure headers, and Dockerised infrastructure.

## Getting Started

```bash
pnpm install
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to explore the landing experience.

## Available Scripts

| Script           | Description                                      |
| ---------------- | ------------------------------------------------ |
| `pnpm dev`       | Launches the development server with hot reload. |
| `pnpm build`     | Creates an optimised production build.           |
| `pnpm start`     | Starts the built application in production mode. |
| `pnpm lint`      | Runs ESLint using Next.js core web vitals rules. |
| `pnpm typecheck` | Executes TypeScript type checking.               |
| `pnpm format`    | Formats the repository with Prettier.            |

## Tooling snapshot

- **Styling & UI**: Tailwind CSS (class-based dark mode), shadcn/ui components, lucide-react icons.
- **State & Utilities**: TanStack Query, React Hook Form, Zod, next-themes.
- **PWA**: Service worker & manifest configured via `@ducanh2912/next-pwa`.
- **Code Quality**: ESLint (core-web-vitals + Prettier), Prettier, Husky pre-commit (lint-staged + typecheck), commitlint.

## Docker

Spin up the stack (Next.js + Postgres with pgvector) using:

```bash
docker compose up -d
```

Services expose ports `3000` (web) and `5432` (database). Default credentials are defined in `.env.example`.
