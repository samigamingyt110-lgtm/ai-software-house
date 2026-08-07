import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch company information
export async function GET() {
  try {
    const company = await prisma.company.findFirst();

    return NextResponse.json(company);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch company." },
      { status: 500 }
    );
  }
}

// POST - Create or Update Company
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check if a company already exists
    const existingCompany = await prisma.company.findFirst();

    let company;

    if (existingCompany) {
      // Update existing company
      company = await prisma.company.update({
        where: {
          id: existingCompany.id,
        },
        data: {
          name: body.name,
          mission: body.mission,
          industry: body.industry,
          stage: body.stage,
          monthlyGoals: body.monthlyGoals,
          tools: body.tools,
          brandContext: body.brandContext,
        },
      });
    } else {
      // Create new company
      company = await prisma.company.create({
        data: {
          name: body.name,
          mission: body.mission,
          industry: body.industry,
          stage: body.stage,
          monthlyGoals: body.monthlyGoals,
          tools: body.tools,
          brandContext: body.brandContext,
        },
      });
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to save company." },
      { status: 500 }
    );
  }
}