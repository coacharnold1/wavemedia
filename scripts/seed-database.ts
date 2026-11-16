#!/usr/bin/env node

/**
 * Seed database with existing portfolio.ts data
 * Run this ONCE to populate Supabase with your current portfolio
 */

import postgres from 'postgres';
import { portfolioItems } from '../src/lib/portfolio.js';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is required');
  process.exit(1);
}

async function seedDatabase() {
  try {
    console.log('🌱 Seeding database with portfolio items...');

    const sql = postgres(DATABASE_URL, {
      ssl: 'require',
    });

    if (portfolioItems.length === 0) {
      console.warn('⚠️  No portfolio items found in portfolio.ts');
      await sql.end();
      return;
    }

    // Clear existing data
    await sql`DELETE FROM portfolios`;

    // Insert portfolio items
    for (const item of portfolioItems) {
      await sql`
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

    console.log(`✅ Successfully seeded ${portfolioItems.length} items!`);
    console.log('');
    console.log('📊 Portfolio stats:');
    console.log(`   • Total items: ${portfolioItems.length}`);
    console.log(`   • Videos: ${portfolioItems.filter((i) => i.type === 'video').length}`);
    console.log(`   • Photos: ${portfolioItems.filter((i) => i.type === 'photo').length}`);
    console.log(`   • Featured: ${portfolioItems.filter((i) => i.featured).length}`);
    console.log('');
    console.log('🎯 Next: Use /admin to manage your portfolio!');

    await sql.end();
  } catch (error) {
    console.error(
      '❌ Error seeding database:',
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
}

seedDatabase();
