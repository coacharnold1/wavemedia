import { siteConfig, services } from "@/lib/constants";

// Single source of truth for anything an AI assistant (reply drafts, visitor
// chatbot) may say about the business. Replace every "TODO" with real answers;
// assistants must not state anything that is not written here.
export const knowledge = {
  business: {
    name: siteConfig.name,
    tagline: siteConfig.tagline,
    email: siteConfig.email,
    phone: siteConfig.phone,
    serviceArea: "WAVE Media is based in New Jersey and accepts projects in the tri-state area and at destinations. Share your location and preferred date so we can confirm availability and include any travel costs in your quote.",
  },
  services: services.map((s) => ({ name: s.name, description: s.description })),
  tone: "Warm, professional, and direct. Use plain language and give the client a clear next step.",
  pricing: "Projects are custom-quoted based on the scope, coverage time, location, and deliverables. Share what you're planning, and WAVE Media will put together a quote. Monthly retainers are available for recurring photo, video, and social content.",
  turnaround: {
    photography: "Your delivery date depends on the type of session or event and the scope of editing. WAVE Media confirms the expected delivery window before booking. If you need images by a specific date, include that in your inquiry.",
    video: "Your delivery date depends on the length and complexity of the edit, the number of videos, and the review schedule. WAVE Media confirms the expected timeline before booking. Please share any launch or event deadline upfront.",
  },
  process: "Tell us about your project, preferred dates, location, and what you need delivered. We'll confirm the scope and send a proposal. Once the agreement is signed and the required booking payment is received, we'll plan the shoot with you, capture the project, edit the footage or photos, and deliver the finished files. Projects with a review step follow the timeline in the agreement.",
  faqs: [
    {
      q: "How do I book a project?",
      a: "Use the booking form on the website, email wavemedianj@gmail.com, or call (908) 774-7760. We'll reply within 24 hours.",
    },
    {
      q: "Do you travel?",
      a: "Yes. WAVE Media travels for weddings, events, commercial shoots, and other productions. Any applicable travel costs are included in your project quote.",
    },
    {
      q: "How many revisions are included?",
      a: "Your proposal specifies the review process and any included revision rounds. If you request changes beyond the agreed scope, we'll discuss any added cost and schedule impact before proceeding.",
    },
    {
      q: "Who owns the footage and usage rights?",
      a: "Your agreement specifies which files you receive and how you can use them. If you need raw footage, paid advertising rights, or another specific use, mention it before booking so it can be addressed in the agreement.",
    },
    {
      q: "Do you offer payment plans or deposits?",
      a: "Your proposal specifies the booking payment, due dates, and any installments. If you'd like to spread out payments, ask about available options when you request your quote.",
    },
  ],
  rules: [
    "Only use facts from this file. If something is unknown or project-specific, ask the client or say the team will confirm.",
    "Never invent prices, availability, clients, awards, or timelines.",
    "Never promise a specific turnaround or revision count without checking the project agreement.",
    "Use the client's proposal or agreement for project-specific terms when available.",
    "For general inquiries, use the answers above.",
    "Refer exact prices, turnaround commitments, revision counts, payment amounts, and usage rights to WAVE Media for confirmation.",
    "Never give legal, tax, or contract advice.",
  ],
  inquiryTemplate: `Hi [First Name],

Thanks for reaching out to WAVE Media. I'd love to hear more about what you're planning. Could you share your preferred date, shoot location, and what you'd like to receive, whether that's photos, a highlight film, social reels, or a combination? If you have a deadline for the finished work, send that over too.

Once I have those details, I can confirm availability and put together a quote.

Lorenzo Williams
WAVE Media`,
};

export function knowledgeAsPrompt(): string {
  return [
    `You represent ${knowledge.business.name} ("${knowledge.business.tagline}").`,
    `Tone: ${knowledge.tone}`,
    `Contact: ${knowledge.business.email}, ${knowledge.business.phone}`,
    `Service area: ${knowledge.business.serviceArea}`,
    `Services:\n${knowledge.services.map((s) => `- ${s.name}: ${s.description}`).join("\n")}`,
    `Pricing: ${knowledge.pricing}`,
    `Photography turnaround: ${knowledge.turnaround.photography}`,
    `Video turnaround: ${knowledge.turnaround.video}`,
    `Process: ${knowledge.process}`,
    `FAQ:\n${knowledge.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}`,
    `Sample inquiry response:\n${knowledge.inquiryTemplate}`,
    `Rules:\n${knowledge.rules.map((r) => `- ${r}`).join("\n")}`,
  ].join("\n\n");
}
