import { NextRequest, NextResponse } from "next/server";
import { inquiryFormSchema } from "@/types/forms";
import { sendNotification, formatFields } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { draftInquiryReply } from "@/lib/ai";

const THANKS =
  "Thank you for your inquiry! We'll review your request and get back to you within 24 hours.";

export async function POST(request: NextRequest) {
  if (!rateLimit(`inquiry:${clientIp(request.headers)}`)) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { website, ...data } = inquiryFormSchema.parse(await request.json());

    // Honeypot: real users never fill this hidden field
    if (website) return NextResponse.json({ success: true, message: THANKS });

    const draft = await draftInquiryReply(data);
    await sendNotification({
      subject: `New project inquiry: ${data.serviceType} from ${data.name}`,
      text:
        formatFields(data) +
        (draft ? `\n\n--- AI-DRAFTED REPLY (review before sending; not sent to the client) ---\n${draft}` : ""),
      replyTo: data.email,
    });
    // TODO: Create inquiry in HoneyBook/CRM; send confirmation email

    return NextResponse.json({ success: true, message: THANKS });
  } catch (error) {
    console.error("Inquiry form error:", error);
    return NextResponse.json(
      { success: false, message: "There was an error processing your request." },
      { status: 400 }
    );
  }
}
