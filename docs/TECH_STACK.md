# Tech stack & hosting plan

## What we're using

| Layer | Choice | Why |
| --- | --- | --- |
| Frontend | Next.js 16 (App Router), React 19, TypeScript | Server rendering for SEO, fast first paint, the stack I work in daily |
| Styling | Tailwind CSS v4 | Quick iteration, dark mode out of the box |
| Backend | Node.js 22 LTS, Express 5, TypeScript | Separate API shows backend ownership; room for contact form, analytics, admin later |
| API hardening | helmet, cors (allow-list), JSON body limit | Sensible defaults for a public API |
| Tests | Node built-in test runner via `tsx` | No extra framework needed yet |
| Monorepo | npm workspaces | Zero extra tooling; move to Turborepo if builds get slow |
| CI | GitHub Actions | Typecheck, test, build on every push/PR |
| Container | Dockerfile for the API | Portable to any host (Render, Fly.io, Cloud Run, ECS) |

### Likely next additions

| Need | Option |
| --- | --- |
| Contact form email | Resend or Nodemailer + SMTP |
| Spam protection | Cloudflare Turnstile or hCaptcha |
| Rate limiting | `express-rate-limit` |
| Content editing without deploys | MongoDB Atlas / Postgres (Neon, Supabase) free tier, or a headless CMS (Sanity) |
| Analytics | Vercel Analytics, Plausible, or Umami |
| Error monitoring | Sentry (free tier) |
| Lint/format | ESLint + Prettier |
| E2E tests | Playwright |

## Hosting: do we need cloud access?

**No paid cloud account is needed to go live.** Free tiers cover a personal portfolio comfortably. You need accounts, not an AWS/GCP subscription.

### Recommended setup (≈ ₹0–1,000/year)

| Piece | Host | Cost | Notes |
| --- | --- | --- | --- |
| `apps/web` | **Vercel** (Hobby) | Free | Made by the Next.js team; connects to GitHub, deploys every push, preview URLs per PR. Set Root Directory to `apps/web`. |
| `apps/api` | **Render** (free web service) or **Railway** | Free / ~$5 mo | Connects to GitHub, builds from `apps/api`. Render's free tier sleeps after ~15 min idle (≈30–50 s cold start) — fine to start, upgrade or switch if it matters. |
| Domain | Namecheap, GoDaddy, Cloudflare Registrar | ~₹800–1,200/yr for `.com` / `.dev` | e.g. `anshulakotkar.dev` → web, `api.anshulakotkar.dev` → API |
| DNS + SSL | Vercel / Render (automatic) or Cloudflare | Free | HTTPS certificates are issued automatically |

Accounts to create: **GitHub** (have it), **Vercel**, **Render** (or Railway), and a **domain registrar**. Sign in to Vercel and Render with GitHub so they can see the repo.

### Environment variables in production

| App | Variable | Example |
| --- | --- | --- |
| web (Vercel) | `API_URL` | `https://api.anshulakotkar.dev` |
| api (Render) | `CORS_ORIGIN` | `https://anshulakotkar.dev` |
| api (Render) | `PORT` | set by the host automatically |

### Deploy order

1. Push the repo to GitHub.
2. Deploy the API on Render: root `apps/api`, build `npm install && npm run build`, start `npm start`. Check `/api/health`.
3. Deploy the web on Vercel: root `apps/web`, set `API_URL` to the Render URL.
4. Buy the domain, point it at Vercel (web) and Render (API subdomain), then update `CORS_ORIGIN`.

### When would real cloud (AWS / GCP / Azure) make sense?

Only if you want the portfolio itself to show cloud skills — e.g. API on **AWS ECS Fargate or EKS** or **GCP Cloud Run**, web on **AWS Amplify / S3 + CloudFront**, infra as code with **Terraform**, and CI deploying via GitHub Actions with OIDC. That's a good Staff-level talking point, but expect roughly $10–30/month and more upkeep. A sensible path: launch on Vercel + Render now, and treat a Cloud Run or ECS + Terraform deployment as a later "infrastructure" project to write about on the site.
