# Anshul Akotkar — Portfolio

My digital resume and proof of skill: a **Next.js** frontend backed by a **Node.js (Express)** API, in one npm-workspaces monorepo.

```
anshul-portfolio/
├── apps/
│   ├── web/   Next.js 16 (App Router, React 19, TypeScript, Tailwind CSS v4)
│   └── api/   Node.js 22 + Express 5 (TypeScript) — serves profile & skills JSON
├── docs/      Tech stack and hosting plan
└── .github/   CI (typecheck, test, build)
```

## Getting started

Requires Node.js 22 (`nvm use`).

```bash
npm install                       # installs both workspaces, creates package-lock.json
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
npm run dev                       # API on :4000, web on :3000
```

Open http://localhost:3000. The API is at http://localhost:4000/api/health.

| Script              | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Run API and web together              |
| `npm run build`     | Production build of both apps         |
| `npm run typecheck` | TypeScript checks across workspaces   |
| `npm test`          | API tests (Node test runner)          |

## API

| Method | Path          | Returns                  |
| ------ | ------------- | ------------------------ |
| GET    | `/api/health` | `{ status, uptime }`     |
| GET    | `/api/profile`| Name, summary, about, highlights, links |
| GET    | `/api/skills` | Skill categories         |
| GET    | `/api/work`   | Selected work (one featured) |

Content lives in `apps/api/src/data/` — edit `profile.ts`, `skills.ts` and `work.ts` to update the site.

## TODO

- [x] Replace placeholder GitHub / LinkedIn / email links in `apps/api/src/data/profile.ts`
- [x] Add a Selected work section
- [ ] Add an Experience timeline
- [ ] Contact form endpoint (`POST /api/contact`) with rate limiting
- [ ] Deploy (see [docs/TECH_STACK.md](docs/TECH_STACK.md))
