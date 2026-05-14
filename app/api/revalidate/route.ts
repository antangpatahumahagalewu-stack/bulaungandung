import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

// Rate limiting for revalidation endpoint
const rateMap = new Map<string, { count: number; start: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW = 60000;

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
        { error: "Terlalu banyak permintaan" },
        { status: 429 }
      );
    }

    // Only accept Authorization header (never in body — avoid log leakage)
    const authHeader = request.headers.get("authorization");
    const providedSecret = authHeader?.replace("Bearer ", "");
    
    if (!WEBHOOK_SECRET || !providedSecret || providedSecret !== WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const path = body.path;

    if (typeof path !== "string" || path.length === 0) {
      return NextResponse.json(
        { error: "Path diperlukan" },
        { status: 400 }
      );
    }

    // Validate path is a known locale route pattern
    const allowedPrefixes = ["/id", "/en", "/zh", "/ja"];
    const isAllowed = path === "/" || allowedPrefixes.some(
      (prefix) => path === prefix || path.startsWith(prefix + "/")
    );
    if (!isAllowed) {
      return NextResponse.json(
        { error: "Path tidak diizinkan" },
        { status: 403 }
      );
    }

    revalidatePath(path);
    return NextResponse.json({ success: true, path });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: "Gagal revalidasi" },
      { status: 500 }
    );
  }
}
