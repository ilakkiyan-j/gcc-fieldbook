import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { repository } from "@/lib/data/repository";

const querySchema = z.object({
  q: z.string().optional(),
  city: z.string().optional(),
  sector: z.string().optional(),
  function: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(20),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = querySchema.safeParse({
      q: searchParams.get("q") || undefined,
      city: searchParams.get("city") || undefined,
      sector: searchParams.get("sector") || undefined,
      function: searchParams.get("function") || undefined,
      page: searchParams.get("page") || undefined,
      pageSize: searchParams.get("pageSize") || undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { q, city, sector, function: func, page, pageSize } = parsed.data;
    const { data, total } = await repository.getGccs({
      q,
      city,
      sector,
      function: func,
      page,
      pageSize,
    });

    return NextResponse.json({
      data,
      total,
      page,
      pageSize,
      hasMore: page * pageSize < total,
    });
  } catch (error) {
    console.error("Error in GET /api/gccs:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while fetching GCC centres" },
      { status: 500 }
    );
  }
}
