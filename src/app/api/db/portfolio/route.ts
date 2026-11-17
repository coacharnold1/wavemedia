import sql from '@/lib/db';
import { NextResponse } from 'next/server';

interface DbPortfolioItem {
  id: number;
  slug: string;
  title: string;
  type: 'video' | 'photo';
  category: string;
  year: number;
  client?: string;
  description: string;
  video_url?: string;
  image?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export async function GET() {
  try {
    const items = await sql<DbPortfolioItem[]>`
      SELECT * FROM portfolios ORDER BY featured DESC, year DESC, created_at DESC
    `;

    // Transform database format to portfolio format
    const transformed = items.map((item: DbPortfolioItem) => ({
      slug: item.slug,
      title: item.title,
      type: item.type,
      category: item.category,
      year: item.year,
      client: item.client || undefined,
      description: item.description,
      videoUrl: item.video_url || undefined,
      image: item.image || undefined,
      featured: item.featured,
    }));

    return NextResponse.json({ success: true, items: transformed });
  } catch (error) {
    console.error('Error fetching portfolio from database:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}
