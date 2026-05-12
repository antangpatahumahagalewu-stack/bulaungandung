import { createServerSupabase } from "@/lib/supabase/server";
import { newsletterSchema } from "@/lib/zod/newsletter";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
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
