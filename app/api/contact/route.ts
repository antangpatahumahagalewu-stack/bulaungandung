import { contactSchema } from "@/lib/zod/contact";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Data form tidak valid", details: result.error.flatten() },
        { status: 400 }
      );
    }

    // TODO: Integrate with Resend when API key available
    // For now, log the contact message
    console.log("Contact form submission:", {
      ...result.data,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Gagal mengirim pesan" },
      { status: 500 }
    );
  }
}
