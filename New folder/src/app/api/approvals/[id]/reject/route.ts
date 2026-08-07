import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendTelegramMessage } from "@/lib/telegram";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const approval = await prisma.approvalRequest.update({
    where: { id },
    data: { status: "REJECTED", resolvedAt: new Date() },
  });

  await sendTelegramMessage(`❌ Rejected: *${approval.title}*`);

  return NextResponse.json({ approval });
}
