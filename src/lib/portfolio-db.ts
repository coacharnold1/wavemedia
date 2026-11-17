/**
 * Portfolio data fetching - reads from Supabase database at runtime
 * Falls back to static portfolio.ts if database is unavailable
 */

import sql from './db';
import { portfolioItems as staticPortfolioItems, PortfolioItem } from './portfolio';

export async function getPortfolioFromDatabase(): Promise<PortfolioItem[]> {
  try {
    // Try fetching from database
    if (!process.env.DATABASE_URL) {
      return staticPortfolioItems;
    }

    const items = await sql`
      SELECT 
        slug, title, type, category, year, client, description,
        video_url as "videoUrl", image, featured
      FROM portfolios
      ORDER BY year DESC, featured DESC
    `;

    return items.map((row: any) => ({
      slug: row.slug,
      title: row.title,
      type: row.type,
      category: row.category,
      year: row.year,
      client: row.client,
      description: row.description,
      videoUrl: row.videoUrl,
      image: row.image,
      featured: row.featured,
    })) as PortfolioItem[];
  } catch (error) {
    console.warn('Failed to fetch portfolio from database, using static fallback:', error);
    return staticPortfolioItems;
  }
}

export async function getItemsByTypeFromDatabase(type: 'video' | 'photo'): Promise<PortfolioItem[]> {
  const items = await getPortfolioFromDatabase();
  return items.filter(item => item.type === type);
}

export async function getItemFromDatabase(slug: string): Promise<PortfolioItem | undefined> {
  const items = await getPortfolioFromDatabase();
  return items.find(item => item.slug === slug);
}

export async function getFeaturedFromDatabase(limit = 3): Promise<PortfolioItem[]> {
  const items = await getPortfolioFromDatabase();
  return items.filter(item => item.featured).slice(0, limit);
}
