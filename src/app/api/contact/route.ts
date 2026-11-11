import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/types/forms";
import { sendNotification, formatFields } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/rateLimit";

const THANKS = "Thank you for contacting us. We'll get back to you soon.";

export async function POST(request: NextRequest) {
  if (!rateLimit(`contact:${clientIp(request.headers)}`)) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { website, ...data } = contactFormSchema.parse(await request.json());

    // Honeypot: real users never fill this hidden field
    if (website) return NextResponse.json({ success: true, message: THANKS });

    await sendNotification({
      subject: `New contact message from ${data.name}`,
      text: formatFields(data),
      replyTo: data.email,
    });
    // TODO: Log to HoneyBook or CRM; send confirmation email to the sender

    return NextResponse.json({ success: true, message: THANKS });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "There was an error processing your request." },
      { status: 400 }
    );
  }
}
