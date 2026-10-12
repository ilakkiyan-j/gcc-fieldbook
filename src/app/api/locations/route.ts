import { NextRequest, NextResponse } from "next/server";
import { repository } from "@/lib/data/repository";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const citiesParam = searchParams.get("cities");
    const citySlugs = citiesParam
      ? citiesParam.split(",").map((c) => c.trim().toLowerCase())
      : ["bengaluru", "hyderabad"];

    const comparison = await repository.getCityComparison(citySlugs);

    return NextResponse.json({ data: comparison });
  } catch (error) {
    console.error("Error in GET /api/locations:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while fetching location comparison" },
      { status: 500 }
    );
  }
}
