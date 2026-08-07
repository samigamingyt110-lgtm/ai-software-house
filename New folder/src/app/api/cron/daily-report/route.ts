import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendTelegramMessage } from "@/lib/telegram";

// Vercel Cron calls this automatically on the schedule set in vercel.json.
// It's also safe to call by hand (e.g. from a browser) to test the message.
export async function GET(req: NextRequest) {
  // Vercel signs cron requests with this header — if it's set, verify it matches.
  const authHeader = req.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [pendingApprovals, activeProjects, openInvoices] = await Promise.all([
    prisma.approvalRequest.count({ where: { status: "PENDING" } }),
    prisma.project.count({ where: { status: "ACTIVE" } }),
    prisma.invoice.count({ where: { status: { in: ["SENT", "OVERDUE"] } } }),
  ]);

  const message =
    `📊 *Daily Report*\n\n` +
    `⏳ Pending approvals: ${pendingApprovals}\n` +
    `🚀 Active projects: ${activeProjects}\n` +
    `🧾 Unpaid invoices: ${openInvoices}\n\n` +
    `Open your dashboard for details.`;

  const sent = await sendTelegramMessage(message);

  return NextResponse.json({ sent, pendingApprovals, activeProjects, openInvoices });
}
