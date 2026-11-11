export type PortfolioType = "video" | "photo";

export interface PortfolioItem {
  slug: string;
  title: string;
  type: PortfolioType;
  category: string;
  year: number;
  client?: string;
  description: string;
  // YouTube or Vimeo watch/share URL (video items)
  videoUrl?: string;
  // Path under /public or remote URL (photo items and video posters)
  image?: string;
  featured?: boolean;
}

export const cinematographyCategories = [
  "Commercials",
  "Documentaries",
  "Music Videos",
  "Branded Content",
];

export const photographyCategories = [
  "Sports",
  "Portraits",
  "Events",
  "Corporate",
  "Lifestyle",
];

// Placeholder entries: replace with real projects, videoUrl and image paths.
export const portfolioItems: PortfolioItem[] = [
  {
    slug: "brand-launch-spot",
    title: "Brand Launch Spot",
    type: "video",
    category: "Commercials",
    year: 2025,
    description: "A 60-second launch commercial shot on location with a full cinema package.",
    featured: true,
  },
  {
    slug: "the-long-road",
    title: "The Long Road",
    type: "video",
    category: "Documentaries",
    year: 2025,
    description: "A short documentary following a local team through a championship season.",
    featured: true,
  },
  {
    slug: "midnight-session",
    title: "Midnight Session",
    type: "video",
    category: "Music Videos",
    year: 2024,
    description: "A moody, light-driven music video built around practical lighting.",
  },
  {
    slug: "founders-story",
    title: "Founder's Story",
    type: "video",
    category: "Branded Content",
    year: 2024,
    description: "Branded storytelling that puts the people behind the company on screen.",
  },
  {
    slug: "friday-night-lights",
    title: "Friday Night Lights",
    type: "photo",
    category: "Sports",
    year: 2025,
    description: "High-school football under the lights, captured action-first.",
    featured: true,
  },
  {
    slug: "studio-portraits",
    title: "Studio Portraits",
    type: "photo",
    category: "Portraits",
    year: 2025,
    description: "Editorial portrait series with a clean, cinematic look.",
  },
  {
    slug: "gala-evening",
    title: "Gala Evening",
    type: "photo",
    category: "Events",
    year: 2024,
    description: "Candid and formal coverage of a charity gala.",
  },
  {
    slug: "team-headshots",
    title: "Team Headshots",
    type: "photo",
    category: "Corporate",
    year: 2024,
    description: "Consistent, polished headshots for a growing company.",
  },
  {
    slug: "golden-hour-lifestyle",
    title: "Golden Hour Lifestyle",
    type: "photo",
    category: "Lifestyle",
    year: 2024,
    description: "Natural-light lifestyle imagery for a regional brand.",
  },
];

export function getItemsByType(type: PortfolioType) {
  return portfolioItems.filter((item) => item.type === type);
}

export function getItem(slug: string) {
  return portfolioItems.find((item) => item.slug === slug);
}

export function getFeatured(limit = 3) {
  return portfolioItems.filter((item) => item.featured).slice(0, limit);
}

export function getEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (host === "youtube.com") {
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    // fall through
  }
  return null;
}
