import sql from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

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
    const { items } = (await request.json()) as { items: PortfolioItem[] };

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid items format' },
        { status: 400 }
      );
    }

    // Validate required fields
    for (const item of items) {
      if (
        !item.slug ||
        !item.title ||
        !item.type ||
        !item.category ||
        !item.year ||
        !item.description
      ) {
        return NextResponse.json(
          { error: `Item "${item.title}" is missing required fields` },
          { status: 400 }
        );
      }
      if (item.type === 'video' && !item.videoUrl) {
        return NextResponse.json(
          { error: `Video "${item.title}" is missing videoUrl` },
          { status: 400 }
        );
      }
      if (item.type === 'photo' && !item.image) {
        return NextResponse.json(
          { error: `Photo "${item.title}" is missing image path` },
          { status: 400 }
        );
      }
    }

    // Begin transaction: clear and repopulate
    await sql.begin(async (tx) => {
      // Delete all existing records
      await tx`DELETE FROM portfolios`;

      // Insert new records
      for (const item of items) {
        await tx`
          INSERT INTO portfolios (
            slug, title, type, category, year, client, description,
            video_url, image, featured
          ) VALUES (
            ${item.slug},
            ${item.title},
            ${item.type},
            ${item.category},
            ${item.year},
            ${item.client || null},
            ${item.description},
            ${item.videoUrl || null},
            ${item.image || null},
            ${item.featured || false}
          )
        `;
      }
    });

    return NextResponse.json({
      success: true,
      message: `Successfully saved ${items.length} items to database`,
      count: items.length,
    });
  } catch (error) {
    console.error('Error saving portfolio to database:', error);
    return NextResponse.json(
      {
        error: `Failed to save portfolio: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      },
      { status: 500 }
    );
  }
}
