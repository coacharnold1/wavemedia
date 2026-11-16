-- Create portfolio table in Supabase
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
);

-- Enable Row Level Security
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read
CREATE POLICY "Public read access" ON portfolios
  FOR SELECT
  USING (true);

-- Create policy for admin writes (we'll verify with password in app)
CREATE POLICY "Admin write access" ON portfolios
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create index on featured for faster queries
CREATE INDEX idx_portfolios_featured ON portfolios(featured);
CREATE INDEX idx_portfolios_type ON portfolios(type);

-- Insert existing portfolio items from portfolio.ts
-- This will be done via API, not here
