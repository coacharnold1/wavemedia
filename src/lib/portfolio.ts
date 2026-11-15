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
  "Weddings",
  "Events",
  "Sports",
  "Branded Content",
];

export const photographyCategories = [
  "Sports",
  "Portraits",
  "Events",
  "Corporate",
  "Lifestyle",
];

// Real portfolio entries. Placeholders removed.
export const portfolioItems: PortfolioItem[] = [
  {
    slug: "91-percent-documentary",
    title: "91% The Story of Determination and Triumph",
    type: "video",
    category: "Documentaries",
    year: 2025,
    client: "Director Hall",
    description: "Paterson, New Jersey — a city that moves with an unbreakable rhythm. Buses hum, footsteps echo, and dreams push forward long after the sun goes down. Every block carries a story, and every story belongs to a dreamer fighting to shape a new tomorrow. In the heart of this relentless city stands a school that dared to believe in its students: College Achieve Paterson. Here, scholars aren't defined by circumstance — they redefine it. CAPS becomes more than a building; it becomes a promise. A place where teachers don't just deliver lessons, they see their students — their hunger, their fire, and their potential.",
    videoUrl: "https://www.youtube.com/watch?v=-OBWLJRqpvY",
    image: "/portfolio/award.jpg",
    featured: true,
  },
  {
    slug: "brandon-victoria-wedding",
    title: "Brandon & Victoria | A WAVE Media Wedding Film",
    type: "video",
    category: "Weddings",
    year: 2026,
    client: "Brandon & Victoria",
    description: "A wedding film that lets the couple revisit their celebration and see it from a new perspective—a keepsake they can return to on anniversaries and share with loved ones.",
    videoUrl: "https://youtu.be/p2XIfYMdocI",
    image: "https://img.youtube.com/vi/p2XIfYMdocI/maxresdefault.jpg",
    featured: true,
  },
  {
    slug: "squad-breast-cancer-event",
    title: "The Squad Breast Cancer Event",
    type: "video",
    category: "Events",
    year: 2026,
    client: "The Squad",
    description: "The Squad Breast Cancer Event",
    videoUrl: "https://youtu.be/-EYvxAsl4ag",
    image: "https://img.youtube.com/vi/-EYvxAsl4ag/maxresdefault.jpg",
    featured: true,
  },
  {
    slug: "squad-kentucky-derby",
    title: "The Squad Kentucky Derby Event",
    type: "video",
    category: "Events",
    year: 2026,
    client: "The Squad",
    description: "The Squad is a Men's Social Organization comprised of successful gentlemen with an eye towards class. Every year they host a Kentucky Derby event at an exclusive cigar club. For 2026, WAVE Media was asked to document this wonderful event.",
    videoUrl: "https://youtu.be/3KoejxnllpQ",
    image: "https://img.youtube.com/vi/3KoejxnllpQ/maxresdefault.jpg",
    featured: true,
  },
  {
    slug: "hillside-media-day",
    title: "Hillside High School Media Day Highlights",
    type: "video",
    category: "Sports",
    year: 2026,
    client: "Hillside High School",
    description: "Hillside HS Football Media Day",
    videoUrl: "https://vimeo.com/1247072058",
    image: "https://i.vimeocdn.com/video/1247072058.jpg",
    featured: true,
  },
  {
    slug: "rich-humidor-video",
    title: "Rich The Designer Humidor Video",
    type: "video",
    category: "Commercials",
    year: 2026,
    client: "Rich from H.E.M. Customs",
    description: "Showcase of custom designed Humidors from Rich-The-Designer",
    videoUrl: "https://youtu.be/jFsHYUauXN8",
    image: "https://img.youtube.com/vi/jFsHYUauXN8/maxresdefault.jpg",
  },
  {
    slug: "hillside-opening-day",
    title: "Hillside Opening Day Video",
    type: "video",
    category: "Commercials",
    year: 2026,
    client: "Hillside Public Schools",
    description: "Promotional Video for Hillside Public School's opening of the 2026 School Year",
    videoUrl: "https://youtu.be/plWpBHdzer0",
    image: "https://img.youtube.com/vi/plWpBHdzer0/maxresdefault.jpg",
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
