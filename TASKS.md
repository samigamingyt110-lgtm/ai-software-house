# TASKS.md — AI Software House

Legend: [x] done · [ ] pending · [~] in progress

## Milestone 1 — Foundation (CURRENT)
- [x] Project scaffold (Next.js + TypeScript)
- [x] Prisma schema v1 (Agent, Client, Project, Invoice, Notification, ApprovalRequest)
- [x] .env.example with all required secrets documented (no real values)
- [x] CEO Dashboard shell (sidebar nav, stat cards, department overview) — static, no live data
- [x] TASKS.md + progress.md created
- [ ] You: run locally, confirm it builds and renders (see "Test before proceeding" in chat)
- [ ] Wire dashboard stat cards to real DB queries (Overview API route)
- [ ] Auth for CEO login (NextAuth, single-user)

## Milestone 2 — Approvals & Notifications Backbone (DONE — pending your deploy test)
- [x] ApprovalRequest API (list/approve/reject) + dashboard UI (/approvals page)
- [x] Notification API (/api/notifications)
- [x] Telegram bot: sends a message on new ApprovalRequest, approve, and reject
- [x] Daily summary job (Vercel Cron, runs 8am Pakistan time, /api/cron/daily-report)
- [x] "Send test approval" button on the Approvals page — use this to confirm Telegram works
- [ ] You: deploy to Vercel with your 3 secrets, click "Send test approval", confirm you get a Telegram message

## Milestone 3 — Sales Department
- [ ] Lead data model refinements + manual lead import (CSV)
- [ ] Outreach AI: drafts messages via LLM API, queues for CEO approval before sending
- [ ] Proposal AI: generates quotation/proposal doc from project brief
- [ ] Negotiation AI: suggests terms within configured limits, requires approval to finalize

## Milestone 4 — Project Management
- [ ] Project Manager AI: breaks approved proposal into ProjectTask list
- [ ] Task assignment + progress tracking UI
- [ ] GitHub repo creation per approved project (via GitHub API)

## Milestone 5 — Development Department
- [ ] Code-gen agent workflow (frontend/backend/db) scoped to a sandbox per project
- [ ] CI pipeline (lint/test/build) via GitHub Actions
- [ ] QA AI: automated test pass + bug report generation
- [ ] DevOps AI: deployment trigger (Vercel/host of choice)

## Milestone 6 — Finance Department
- [ ] Invoice generation (Stripe/PayPal integration, read + create-draft only)
- [ ] Payment status sync (webhooks)
- [ ] Overdue payment alerts (dashboard + Telegram)
- [ ] Monthly report generation

## Milestone 7 — Support Department
- [ ] Ticket model + Support AI auto-responder (drafts, human/CEO can approve for urgent items)
- [ ] Escalation rules to CEO for urgent tickets

## Milestone 8 — End-to-end Demo
- [ ] Full flow: Lead → Outreach → Proposal → CEO Approval → Dev → QA → Deploy → Invoice → Payment → Report
- [ ] Production hardening pass (security review, rate limits, error handling, logging)

---
**Note on scope:** Automated outreach/scraping on platforms whose Terms of Service prohibit it (most freelance marketplaces, LinkedIn) will NOT be built. Milestone 3 uses legitimate channels only (your own outbound email domain, manually imported leads, official APIs). This will be called out again when we reach that milestone.
