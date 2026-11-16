import { writeFileSync } from 'fs';
import { join } from 'path';
import { NextRequest } from 'next/server';

interface PortfolioItem {
  slug: string;
  title: string;
  type: 'video' | 'photo';
  category: string;
  year: number;
  client?: string;
  description: string;
  videoUrl?: string;
  image?: string;
  featured?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json() as { items: PortfolioItem[] };

    if (!Array.isArray(items)) {
      return Response.json(
        { error: 'Invalid items format' },
        { status: 400 }
      );
    }

    // Validate required fields
    for (const item of items) {
      if (!item.slug || !item.title || !item.type || !item.category || !item.year || !item.description) {
        return Response.json(
          { error: `Item "${item.title}" is missing required fields` },
          { status: 400 }
        );
      }
      if (item.type === 'video' && !item.videoUrl) {
        return Response.json(
          { error: `Video "${item.title}" is missing videoUrl` },
          { status: 400 }
        );
      }
      if (item.type === 'photo' && !item.image) {
        return Response.json(
          { error: `Photo "${item.title}" is missing image path` },
          { status: 400 }
        );
      }
    }

    // Build the TypeScript file content
    const photographyCategories = [
      'Sports',
      'Portraits',
      'Events',
      'Corporate',
      'Lifestyle',
    ];

    const cinematographyCategories = [
      'Commercials',
      'Documentaries',
      'Music Videos',
      'Weddings',
      'Events',
      'Sports',
      'Branded Content',
    ];

    const portfolioContent = `export type PortfolioType = "video" | "photo";

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
  ${cinematographyCategories.map((cat) => `"${cat}"`).join(',\n  ')},
];

export const photographyCategories = [
  ${photographyCategories.map((cat) => `"${cat}"`).join(',\n  ')},
];

// Real portfolio entries. Placeholders removed.
export const portfolioItems: PortfolioItem[] = [
${items
  .map(
    (item) => `  {
    slug: "${item.slug}",
    title: "${item.title.replace(/"/g, '\\"')}",
    type: "${item.type}",
    category: "${item.category}",
    year: ${item.year},${item.client ? `\n    client: "${item.client}",` : ''}
    description: "${item.description.replace(/"/g, '\\"')}",${
      item.type === 'video' ? `\n    videoUrl: "${item.videoUrl}",` : ''
    }${item.image ? `\n    image: "${item.image}",` : ''}${
      item.featured ? `\n    featured: true,` : ''
    }
  },`
  )
  .join('\n')}
];

export function getFeatured() {
  return portfolioItems.filter((item) => item.featured);
}

export function getByCategory(category: string) {
  return portfolioItems.filter((item) => item.category === category);
}

export function getBySlug(slug: string) {
  return portfolioItems.find((item) => item.slug === slug);
}
`;

    const filepath = join(process.cwd(), 'src/lib/portfolio.ts');
    writeFileSync(filepath, portfolioContent, 'utf-8');

    return Response.json({
      success: true,
      message: `Successfully saved ${items.length} items to portfolio.ts`,
      count: items.length,
    });
  } catch (error) {
    console.error('Error saving portfolio:', error);
    return Response.json(
      { error: `Failed to save portfolio: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
