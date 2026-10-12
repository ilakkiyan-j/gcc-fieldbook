import { NextResponse } from "next/server";
import { repository } from "@/lib/data/repository";

export async function GET() {
  try {
    const metrics = await repository.getOverviewMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Error in GET /api/overview:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while computing overview metrics" },
      { status: 500 }
    );
  }
}
