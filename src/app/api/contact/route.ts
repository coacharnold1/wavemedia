import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/types/forms";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate data
    const validatedData = contactFormSchema.parse(data);

    // TODO: Send email using SendGrid, Resend, or Nodemailer
    console.log("Contact form submission:", validatedData);

    // TODO: Log to HoneyBook or CRM
    // TODO: Send confirmation email to user

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting us. We'll get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "There was an error processing your request.",
      },
      { status: 400 }
    );
  }
}
