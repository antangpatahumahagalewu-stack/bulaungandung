import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const path = body.path;

    if (!path) {
      return NextResponse.json(
        { error: "Path diperlukan" },
        { status: 400 }
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
