import { NextRequest, NextResponse } from "next/server";
import { repository } from "@/lib/data/repository";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id || id.trim() === "") {
      return NextResponse.json({ error: "Missing or invalid id parameter" }, { status: 400 });
    }

    const decodedId = decodeURIComponent(id);
    const centre = await repository.getGccByIdOrSlug(decodedId);

    if (!centre) {
      return NextResponse.json(
        { error: `GCC record not found for '${decodedId}'` },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: centre });
  } catch (error) {
    console.error("Error in GET /api/gccs/[id]:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while fetching GCC detail" },
      { status: 500 }
    );
  }
}
