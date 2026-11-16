#!/usr/bin/env node

/**
 * Initialize Supabase portfolio table
 * Run this ONCE to set up the database schema
 */

import postgres from 'postgres';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is required');
  process.exit(1);
}

async function initializeDatabase() {
  try {
    console.log('🔧 Initializing Supabase portfolio table...');

    const sql = postgres(DATABASE_URL, {
      ssl: 'require',
    });

    // Create portfolios table
    await sql`
      CREATE TABLE IF NOT EXISTS portfolios (
        id BIGSERIAL PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        type TEXT NOT NULL CHECK (type IN ('video', 'photo')),
        category TEXT NOT NULL,
        year INTEGER NOT NULL,
        client TEXT,
        description TEXT NOT NULL,
        video_url TEXT,
        image TEXT,
        featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
      )
    `;

    // Enable Row Level Security
    await sql`ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY`;

    // Create policies
    await sql`
      DROP POLICY IF EXISTS "Public read access" ON portfolios
    `;
    await sql`
      CREATE POLICY "Public read access" ON portfolios
      FOR SELECT
      USING (true)
    `;

    await sql`
      DROP POLICY IF EXISTS "Admin write access" ON portfolios
    `;
    await sql`
      CREATE POLICY "Admin write access" ON portfolios
      FOR ALL
      USING (true)
      WITH CHECK (true)
    `;

    // Create indexes
    await sql`
      DROP INDEX IF EXISTS idx_portfolios_featured
    `;
    await sql`
      CREATE INDEX idx_portfolios_featured ON portfolios(featured)
    `;

    await sql`
      DROP INDEX IF EXISTS idx_portfolios_type
    `;
    await sql`
      CREATE INDEX idx_portfolios_type ON portfolios(type)
    `;

    console.log('✅ Supabase portfolio table initialized successfully!');
    console.log('📋 Table structure:');
    console.log('   - id (BIGSERIAL)');
    console.log('   - slug (TEXT UNIQUE)');
    console.log('   - title (TEXT)');
    console.log('   - type (video | photo)');
    console.log('   - category (TEXT)');
    console.log('   - year (INTEGER)');
    console.log('   - client (TEXT, optional)');
    console.log('   - description (TEXT)');
    console.log('   - video_url (TEXT, optional)');
    console.log('   - image (TEXT, optional)');
    console.log('   - featured (BOOLEAN)');
    console.log('');
    console.log('🎯 Next steps:');
    console.log('   1. Run: npm run build');
    console.log('   2. This will sync your existing portfolio.ts to the database');
    console.log('   3. Use /admin portal to manage portfolio items');

    await sql.end();
  } catch (error) {
    console.error(
      '❌ Error initializing database:',
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
}

initializeDatabase();
