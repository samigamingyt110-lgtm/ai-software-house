# progress.md — Build Log

## Decisions locked in
- Stack: Next.js 14 (App Router, TypeScript) full-stack, Prisma ORM, PostgreSQL
- Hosting target: Vercel (app) + Supabase (Postgres) to start; agent workers will need a
  separate always-on process later (Vercel functions are request-driven, not long-running)
- Automation defaults: `REQUIRE_CEO_APPROVAL_DEFAULT=true`, `MAX_AUTO_DISCOUNT_PERCENT=10`
  in .env.example — nothing acts without approval unless you explicitly change these
- Automated scraping/outreach on ToS-prohibited platforms (LinkedIn, most freelance
  marketplaces) is explicitly OUT of scope — will use official APIs / owned channels only

## Milestone 1 status: COMPLETE
Files: package.json, tsconfig.json, next.config.js, .gitignore, .env.example,
prisma/schema.prisma, src/app/layout.tsx, src/app/globals.css, src/app/page.tsx.
Upgraded Next.js 14 → 16 mid-build after npm flagged a Dec 2025 security advisory
on the original pin.

## Milestone 2 status: COMPLETE (code-complete, not yet deployed/tested live)
Files added:
- src/lib/prisma.ts — DB client singleton
- src/lib/telegram.ts — sendTelegramMessage() helper, no-ops safely if env vars unset
- src/app/api/approvals/route.ts — GET list, POST create (pings Telegram + logs a Notification)
- src/app/api/approvals/[id]/approve/route.ts, .../reject/route.ts
- src/app/api/notifications/route.ts — GET list
- src/app/api/cron/daily-report/route.ts — summary message, protected by CRON_SECRET
- vercel.json — cron schedule "0 3 * * *" (~8am PKT)
- src/app/approvals/page.tsx — UI with Approve/Reject buttons + "Send test approval" button
- prisma/schema.prisma — ApprovalRequest.agentId made optional (no agents exist yet)

Known sandbox-only limitation: `prisma generate` fails in this build sandbox because
outbound network here is restricted (can't reach binaries.prisma.sh). This is NOT a real
project bug — it will generate normally on the user's machine or on Vercel's build servers.
`next build` (TypeScript + bundling) passes cleanly.

## Not yet started
Milestone 3 onward (Sales Department) — see TASKS.md. Also NextAuth/CEO login is still
open from Milestone 1's remaining checkbox.

## User's setup status (as of this point)
- Has: Google Gemini API key, Supabase database connection string, Telegram bot token
- Still needs: Telegram CHAT_ID (see progress note below), GitHub account, Vercel account
- Has NOT deployed yet — next real step is deployment walkthrough

## How to get TELEGRAM_CHAT_ID (not yet given to user in chat)
1. Send any message to their own bot in Telegram first
2. Visit https://api.telegram.org/bot<TOKEN>/getUpdates in a browser (replace <TOKEN>)
3. Look for "chat":{"id": ...} in the JSON — that number is TELEGRAM_CHAT_ID
Simpler alternative: message @userinfobot on Telegram, it replies with your numeric ID directly
(works for a personal chat_id, which is what's needed here since CEO = one person).

## Open questions for CEO (not yet answered)
- Company name / branding — using placeholder "AI Software House" until you provide one
- GitHub org/username — needed before Milestone 4 (repo automation) and before deployment
- Confirmed: using Google Gemini as the LLM provider (free tier) instead of a paid key

## How to resume this build in a new session
1. Point Claude at this repo (or paste this progress.md + TASKS.md).
2. Say: "Continue from progress.md, next is Milestone 2."
3. Claude should re-read existing files before editing — extend, don't rewrite,
   per the standing instruction to preserve prior work.

## Open questions for CEO (not yet answered)
- Company name / branding — using placeholder "AI Software House" until you provide one
- GitHub org/username — needed before Milestone 4 (repo automation)
- Which LLM provider(s) to actually wire up first — Claude, OpenAI, Gemini, DeepSeek, or
  multiple? (affects Milestone 3 agent implementation)
