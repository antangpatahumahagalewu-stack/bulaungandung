import { createServerSupabase } from "@/lib/supabase/server";
import { newsletterSchema } from "@/lib/zod/newsletter";
import { NextResponse } from "next/server";

// Rate limiting: simple in-memory map (per instance)
const rateMap = new Map<string, { count: number; start: number }>();
const RATE_LIMIT = 10; // requests
const RATE_WINDOW = 60000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now - entry.start > RATE_WINDOW) {
    rateMap.set(ip, { count: 1, start: now });
    return true;
  }
  entry.count++;
  return entry.count <= RATE_LIMIT;
}

export async function POST(request: Request) {
  try {
    // Rate limiting by IP
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip")
      || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Silakan coba lagi nanti." },
        { status: 429 }
      );
    }

    // Validate content-length to prevent large payloads
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 1024) {
      return NextResponse.json(
        { error: "Payload terlalu besar" },
        { status: 413 }
      );
    }

    const body = await request.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Email tidak valid" },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabase();
    const { error } = await supabase
      .from("subscribers")
      .insert({ email: result.data.email });

    if (error) {
      // Duplicate email is fine
      if (error.code === "23505") {
        return NextResponse.json({ success: true });
      }
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { error: "Gagal berlangganan" },
      { status: 500 }
    );
  }
}
