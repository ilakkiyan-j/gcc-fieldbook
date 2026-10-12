import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { executeResearchCopilot } from "@/lib/ai/copilot";

const RequestSchema = z.object({
  query: z.string().min(2, "Query must be at least 2 characters long").max(500, "Query exceeds 500 characters limit"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid request payload",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const startTime = Date.now();
    const result = await executeResearchCopilot(parsed.data.query);
    const durationMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      ...result,
      durationMs,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("API /api/research error:", errorMsg);
    return NextResponse.json(
      {
        error: "Internal research synthesis error",
        message: errorMsg,
      },
      { status: 500 }
    );
  }
}
