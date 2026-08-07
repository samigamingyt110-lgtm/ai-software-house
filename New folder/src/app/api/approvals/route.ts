import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendTelegramMessage } from "@/lib/telegram";

// GET /api/approvals — list approval requests (defaults to pending only)
export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status") ?? "PENDING";
  const approvals = await prisma.approvalRequest.findMany({
    where: status === "ALL" ? undefined : { status: status as any },
    include: { agent: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ approvals });
}

// POST /api/approvals — create a new approval request.
// Any agent (or, for now, a manual test) calls this instead of acting directly.
// This is also what pings your Telegram.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body?.title || !body?.description) {
    return NextResponse.json(
      { error: "title and description are required" },
      { status: 400 }
    );
  }

  const approval = await prisma.approvalRequest.create({
    data: {
      title: body.title,
      description: body.description,
      payload: body.payload ?? undefined,
      agentId: body.agentId ?? null,
    },
  });

  await sendTelegramMessage(
    `🔔 *New approval needed*\n\n*${approval.title}*\n${approval.description}\n\nOpen your dashboard to approve or reject.`
  );

  await prisma.notification.create({
    data: {
      title: "New approval needed",
      message: approval.title,
      channel: "telegram",
    },
  });

  return NextResponse.json({ approval }, { status: 201 });
}
