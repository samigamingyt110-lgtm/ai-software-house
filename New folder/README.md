# AI Software House

Autonomous AI-agent company platform. CEO (you) approves key decisions; AI agents handle
sales, project management, development, finance, and support workflows.

Status: **Milestone 1 — foundation scaffold.** See `TASKS.md` for the full roadmap and
`progress.md` for build history / how to resume in a new session.

## Setup

```bash
npm install
cp .env.example .env    # then fill in real values — never commit this file
npx prisma generate
npx prisma migrate dev --name init   # requires a running Postgres instance
npm run dev
```

Open http://localhost:3000 — you should see the dashboard shell with placeholder stats
and department cards.

## Requirements
- Node.js 18+
- A PostgreSQL database (local, or a free instance on Supabase/Neon/Railway)

## Security notes
- All secrets live in `.env` (gitignored). Never paste real API keys into chat with any AI
  assistant, including this one.
- `REQUIRE_CEO_APPROVAL_DEFAULT=true` by default — agents queue actions for your approval
  rather than executing them automatically. Change deliberately, per agent, once you trust it.
