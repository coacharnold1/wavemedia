export const siteConfig = {
  name: "WAVE Media",
  description: "Premium Cinematography & Photography",
  tagline: "Crafting Stories With Intent",
  url: "https://wavemedianj.com",
  email: "wavemedianj@gmail.com",
  phone: "+1 (908) 774-7760",
  // Social links are hidden until a URL is set
  social: {
    instagram: "",
    linkedin: "",
  },
};

export const phoneHref = `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`;

export const socialLinks = [
  { label: "Instagram", href: siteConfig.social.instagram },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
].filter((s) => s.href);

export const colors = {
  black: "#0a0a0a",
  charcoal: "#1a1a1a",
  dark: "#2d2d2d",
  gold: "#d4af37",
  goldLight: "#e5c158",
  white: "#f5f5f5",
  gray: "#808080",
};

export const services = [
  {
    id: "cinematography",
    name: "Cinematography",
    description: "Commercial productions, documentaries, music videos, and branded content",
  },
  {
    id: "photography",
    name: "Photography",
    description: "Sports, portraits, events, corporate headshots, and lifestyle photography",
  },
  {
    id: "events",
    name: "Event Production",
    description: "Weddings, celebrations, conferences, and corporate events",
  },
  {
    id: "retainer",
    name: "Monthly Retainers",
    description: "Recurring video and social media content for businesses",
  },
];
