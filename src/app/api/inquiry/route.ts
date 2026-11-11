import { NextRequest, NextResponse } from "next/server";
import { inquiryFormSchema } from "@/types/forms";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate data
    const validatedData = inquiryFormSchema.parse(data);

    // TODO: Send to HoneyBook API
    // TODO: Create inquiry in CRM system
    console.log("Project inquiry submission:", validatedData);

    // TODO: Send confirmation email with inquiry details
    // TODO: Send internal notification

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for your inquiry! We'll review your request and get back to you within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Inquiry form error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "There was an error processing your request.",
      },
      { status: 400 }
    );
  }
}
