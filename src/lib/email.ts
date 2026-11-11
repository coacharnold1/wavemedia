import { siteConfig } from "@/lib/constants";

type Mail = { subject: string; text: string; replyTo?: string };

// Sends via Resend's REST API. Without RESEND_API_KEY and INQUIRY_TO_EMAIL it
// only logs, so forms keep working before email is configured.
export async function sendNotification({ subject, text, replyTo }: Mail): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  if (!apiKey || !to) {
    console.log(`[email disabled] ${subject}\n${text}`);
    return false;
  }

  const from = process.env.INQUIRY_FROM_EMAIL || `${siteConfig.name} <onboarding@resend.dev>`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: to.split(",").map((s) => s.trim()), subject, text, reply_to: replyTo }),
    });
    if (!res.ok) console.error("Resend error:", res.status, await res.text());
    return res.ok;
  } catch (error) {
    console.error("Resend request failed:", error);
    return false;
  }
}

export function formatFields(fields: Record<string, unknown>): string {
  return Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}
