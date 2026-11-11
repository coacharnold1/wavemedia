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
    serviceArea: "TODO: e.g. New Jersey and the tri-state area; travel available?",
  },
  services: services.map((s) => ({ name: s.name, description: s.description })),
  tone: "Confident, warm, cinematic and concise. Professional but personable. No hype, no emojis.",
  pricing: "TODO: pricing policy. Until set, never quote prices; say a custom quote follows a short call.",
  turnaround: "TODO: typical delivery times for video and photo projects.",
  process: "TODO: steps from inquiry to delivery (discovery call, proposal, shoot, edit, delivery).",
  faqs: [
    { q: "How do I book a project?", a: "Use the booking form on the website and we reply within 24 hours." },
    { q: "Do you travel?", a: "TODO" },
    { q: "How many revisions are included?", a: "TODO" },
    { q: "Who owns the footage and usage rights?", a: "TODO" },
    { q: "Do you offer payment plans or deposits?", a: "TODO" },
  ],
  rules: [
    "Only use facts from this file. If something is TODO or unknown, say the team will confirm.",
    "Never invent prices, availability, clients, awards or timelines.",
    "Never promise a booking; invite the person to the booking form or a call.",
    "Do not give legal, tax or contract advice.",
  ],
};

export function knowledgeAsPrompt(): string {
  return [
    `You represent ${knowledge.business.name} ("${knowledge.business.tagline}").`,
    `Tone: ${knowledge.tone}`,
    `Contact: ${knowledge.business.email}, ${knowledge.business.phone}`,
    `Service area: ${knowledge.business.serviceArea}`,
    `Services:\n${knowledge.services.map((s) => `- ${s.name}: ${s.description}`).join("\n")}`,
    `Pricing: ${knowledge.pricing}`,
    `Turnaround: ${knowledge.turnaround}`,
    `Process: ${knowledge.process}`,
    `FAQ:\n${knowledge.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n")}`,
    `Rules:\n${knowledge.rules.map((r) => `- ${r}`).join("\n")}`,
  ].join("\n\n");
}
