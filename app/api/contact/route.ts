import { contactSchema } from "@/lib/zod/contact";
import { NextResponse } from "next/server";

// Rate limiting
const rateMap = new Map<string, { count: number; start: number }>();
const RATE_LIMIT = 5; // requests per window
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
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip")
      || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Silakan coba lagi nanti." },
        { status: 429 }
      );
    }

    // Validate content-length
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 4096) {
      return NextResponse.json(
        { error: "Payload terlalu besar" },
        { status: 413 }
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      // Don't leak validation details in production
      return NextResponse.json(
        { error: "Data form tidak valid" },
        { status: 400 }
      );
    }

    // Sanitize input for logging
    const sanitized = {
      nama: result.data.nama.slice(0, 100),
      email: result.data.email.slice(0, 100),
      subjek: result.data.subjek.slice(0, 200),
      pesan: result.data.pesan.slice(0, 1000),
      timestamp: new Date().toISOString(),
    };

    // TODO: Integrate with Resend when API key available
    console.log("Contact form submission:", sanitized);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Gagal mengirim pesan" },
      { status: 500 }
    );
  }
}
