# OnboardIQ

Production-ready, responsive SaaS web application scaffold for AI-powered onboarding analytics.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS (2xl rounded cards, soft shadows)
- Recharts (analytics visualizations)
- Prisma ORM + PostgreSQL
- Auth.js-ready session helper + RBAC middleware
- OpenAI integration with automatic mock fallback

## Features Implemented
- Overview dashboard with KPI cards and trend charts
- Analytics page with line/bar/funnel-like/radar visuals + cohort toggle
- Employee journey timeline with milestone statuses, SLA indicators and progress bar
- AI Insights panel with predictive retention/attrition/sentiment + summary generation
- Feedback module (pulse survey indicators, anonymous toggle, eNPS, sentiment trends)
- Compliance & IT tracker metrics
- Reports: CSV export, PDF download endpoint, monthly scheduler endpoint
- Admin settings page with benchmark/threshold/stages/sensitivity controls

## Security
- RBAC middleware by role (`ADMIN`, `HR`, `MANAGER`)
- Sensitive-field encryption utilities (`lib/crypto.ts`)
- Audit logging helper (`lib/audit.ts`)

## Database Models
Defined in `prisma/schema.prisma`:
- User
- Employee
- Department
- OnboardingStage
- PerformanceReview
- SurveyResponse
- ITProvision
- ComplianceRecord
- AuditLog

## Getting Started
```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## Deployment (Vercel)
- `vercel.json` included
- Set environment variables from `.env.example`
- Connect managed PostgreSQL and run Prisma migrations in CI/CD

