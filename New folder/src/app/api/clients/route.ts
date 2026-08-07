import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all clients
export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch clients." },
      { status: 500 }
    );
  }
}

// POST - Create a client
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const client = await prisma.client.create({
      data: {
        name: body.name,
        company: body.company,
        email: body.email,
        source: body.source,
        score: body.score,
      },
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create client." },
      { status: 500 }
    );
  }
}