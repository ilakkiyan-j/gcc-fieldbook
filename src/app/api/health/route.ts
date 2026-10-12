import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "gcc-fieldbook",
    timestamp: new Date().toISOString(),
    env: env.NODE_ENV,
    checks: {
      supabaseConfigured: Boolean(env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      geminiConfigured: Boolean(env.GEMINI_API_KEY),
    },
  });
}
