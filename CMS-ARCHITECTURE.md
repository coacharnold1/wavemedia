# WAVE Media CMS Architecture

## Overview

WAVE Media uses a **database-driven CMS** with instant portfolio updates. Users can upload photos/videos through an admin panel, and changes appear on the production site within 1-2 seconds—**no redeploy needed**.

### Tech Stack

- **Frontend**: Next.js 16 (TypeScript, Tailwind CSS)
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage (photos/video thumbnails)
- **Hosting**: Vercel
- **Photo Upload**: Signed URLs (bypasses 4.5MB Vercel limit)

---

## System Architecture

```
Admin Panel (Next.js)
    ↓
1. Photo Upload via Signed URL → Supabase Storage
2. Video/Photo Metadata → Database Save Endpoint
    ↓
Save Endpoint (/api/db/portfolio/save)
    ↓
Supabase PostgreSQL (portfolios table)
    ↓
Portfolio Pages (fetch on every request)
    ↓
Display on Site (instant, no cache delays)
```

---

## Supabase Setup

### Project Configuration

- **URL**: `https://pfdflzjycnzkelrqalus.supabase.co`
- **Region**: US East (us-east-1)
- **Connection Type**: Transaction Pooler (required for serverless)

### Database Schema: `portfolios` Table

```sql
CREATE TABLE portfolios (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  slug TEXT UNIQUE NOT NULL,              -- e.g., "img-0935"
  title TEXT NOT NULL,                    -- e.g., "Strike a pose!"
  type TEXT NOT NULL,                     -- 'video' or 'photo'
  category TEXT NOT NULL,                 -- e.g., 'Events', 'Commercials'
  year INT NOT NULL,                      -- e.g., 2026
  client TEXT,                            -- Optional
  description TEXT NOT NULL,              -- Required field
  video_url TEXT,                         -- YouTube/Vimeo URL for videos
  image TEXT,                             -- Image path or URL
  featured BOOLEAN DEFAULT FALSE,         -- Show in featured section
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_portfolios_slug ON portfolios(slug);
```

### Storage Setup: `wavemedianj` Bucket

- **Bucket Name**: `wavemedianj`
- **Type**: Public (allows direct downloads via signed URLs)
- **File Structure**: Flat (all uploaded files stored at root)
- **URL Format**: `https://pfdflzjycnzkelrqalus.supabase.co/storage/v1/object/public/wavemedianj/{filename}`

### Environment Variables (Vercel)

Required in Vercel production environment:

```bash
DATABASE_URL=postgresql://postgres:[PASSWORD]@aws-0-us-east-1.pooler.supabase.co:6543/postgres
SUPABASE_URL=https://pfdflzjycnzkelrqalus.supabase.co
SUPABASE_ANON_KEY=[PUBLIC_JWT_KEY]           # From Settings → API → Legacy Keys
SUPABASE_SERVICE_ROLE_KEY=[ADMIN_JWT_KEY]    # From Settings → API → Legacy Keys
ADMIN_PASSWORD=waveadmin2024
```

**Local Development (.env.local)**:
Same as above, but DATABASE_URL is optional (falls back to static portfolio.ts)

---

## Upload Pipeline: Photos

### 1. User Selects Photo in Admin

```
Admin Panel → Choose File → Clicked "Upload Photo"
```

### 2. Request Signed Upload URL

**Endpoint**: `POST /api/admin/portfolio/signed-url`

```javascript
{
  "filename": "1794881507480-IMG_1049.jpg"
}
```

**Response**:
```javascript
{
  "signedUrl": "https://pfdflzjycnzkelrqalus.supabase.co/storage/v1/...",
  "publicUrl": "https://pfdflzjycnzkelrqalus.supabase.co/storage/v1/object/public/wavemedianj/1794881507480-IMG_1049.jpg"
}
```

### 3. Browser Uploads Directly to Supabase

Browser sends `PUT` request to signed URL with file data:
- **Destination**: Supabase Storage (bypasses Vercel entirely!)
- **Size Limit**: Only constrained by Supabase free tier (1GB total)
- **Why**: Vercel's 4.5MB serverless limit doesn't apply here

### 4. Admin Creates Portfolio Item

User fills form:
- **Title**: "Strike a pose!"
- **Description**: "Cigar Event"
- **Category**: "Events"
- **Year**: 2026
- **Image**: Auto-populated with public URL from signed upload

### 5. Click "Save to portfolio.ts"

**Endpoint**: `POST /api/db/portfolio/save`

**Request Body**:
```javascript
{
  "items": [
    {
      "slug": "img-1049",
      "title": "Strike a pose!",
      "type": "photo",
      "category": "Events",
      "year": 2026,
      "description": "Cigar Event",
      "image": "https://pfdflzjycnzkelrqalus.supabase.co/storage/v1/object/public/wavemedianj/1794881507480-IMG_1049.jpg",
      "featured": false
    },
    // ... other items
  ]
}
```

### 6. Database Saves & Cache Clears

- Saves to Supabase `portfolios` table (upsert/delete/insert)
- Returns success response with no-cache headers

### 7. User Visits Photography Page

**Page**: `GET /photography`

- `revalidate=0` forces fresh fetch from database
- **Cache Headers**: `cache-control: private, no-cache, no-store, max-age=0, must-revalidate`
- **Vercel CDN**: MISS (not cached)
- **Result**: Fetches latest 58 portfolio items, filters to `type='photo'`
- **Photo appears**: Within 1-2 seconds of save

---

## Upload Pipeline: Videos

### 1. User Adds Video Item

Click "+ Add Item" → Select "Video"

### 2. Enter YouTube URL

**Input**: `https://youtube.com/watch?v=abc123` (or youtu.be/abc123)

### 3. Auto-Generate Thumbnail

When user enters videoUrl, the admin client automatically:

1. Extracts video ID using regex:
   - For `youtube.com`: Extract `v=` parameter
   - For `youtu.be`: Extract ID from path

2. Generates thumbnail URL:
   ```
   https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg
   ```

3. Sets `image` field automatically (user doesn't need to upload anything)

### 4. Save to Database

Same as photos - click "Save to portfolio.ts" → database save → cache clears → appears on site

---

## Database Connection

### How It Works

**File**: `src/lib/db.ts`

```typescript
// Conditional connection based on DATABASE_URL
let sql: sql instance | null = null;

if (process.env.DATABASE_URL) {
  sql = postgres(process.env.DATABASE_URL, {
    ssl: 'require',
    transform: { undefined: null }
  });
}

// Export sql instance (or null during builds without DATABASE_URL)
export default sql;
```

### Timeouts

**File**: `src/lib/portfolio-db.ts`

```typescript
// 5-second timeout for build-time queries
// 15-second timeout for runtime queries
// Falls back to static portfolio.ts if timeout or no DATABASE_URL
```

### Why Conditional Connection?

- **Local Dev**: Often no DATABASE_URL → uses static fallback
- **Vercel Build Time**: DATABASE_URL present but should use static fallback (builds faster)
- **Vercel Runtime**: DATABASE_URL present → uses live database

---

## Caching Strategy

### Pages: `revalidate=0` (Always Fresh)

These pages fetch from database on every request:

- `/` (home page, featured items)
- `/photography` (all photos)
- `/cinematography` (all videos)
- `/work/[slug]` (individual work detail)

**Result**: Vercel's CDN cache is MISS, Next.js doesn't cache, database query runs.

### API Endpoints: No Caching

- `/api/db/portfolio` - GET all items
- `/api/db/portfolio/save` - POST save items
- Both return `cache-control: private, no-cache, no-store, max-age=0, must-revalidate`

### Why Not Cache?

For a CMS to be useful to clients, updates must be instant. Caching would add delays. Trade-off: Slightly more database queries, but instant updates.

---

## File Structure

### Key Files

```
src/
├── lib/
│   ├── db.ts                      # Database connection singleton
│   ├── portfolio-db.ts            # Database fetch functions w/ timeout
│   ├── portfolio.ts               # Static fallback data
│   └── constants.ts               # Site config
├── app/
│   ├── page.tsx                   # Home page (revalidate=0)
│   ├── photography/page.tsx        # Photos page (revalidate=0)
│   ├── cinematography/page.tsx     # Videos page (revalidate=0)
│   ├── work/[slug]/page.tsx        # Work detail page (revalidate=0)
│   ├── admin/
│   │   ├── page.tsx               # Admin portal wrapper
│   │   └── client.tsx             # Admin UI (photo upload, CRUD)
│   └── api/
│       ├── auth/verify-password   # Admin login
│       ├── db/portfolio           # GET all items
│       ├── db/portfolio/save      # POST save items
│       └── admin/portfolio/signed-url  # Generate signed upload URL
└── types/
    └── forms.ts                   # Form validation (zod)
```

---

## Vercel Deployment

### Build Time

1. **Install dependencies**: ~2s
2. **TypeScript check**: ~5s
3. **Next.js compile**: ~10s
4. **Generate static pages**: ~90s (57 work detail pages)
5. **Optimize**: ~15s
6. **Total**: ~2 minutes

**Why fast?**
- Uses static fallback for portfolio fetch (no database connection during build)
- 5-second timeout prevents hangs if database query is slow

### Runtime

1. **Page requests**: Fetch from database (revalidate=0)
2. **Photo save**: Insert into database, cache clears
3. **Page reload**: Fresh database query runs
4. **Result**: Photo appears instantly

---

## Troubleshooting

### Photo Uploaded but Doesn't Appear on Site

**Checklist**:

1. ✅ Photo is in Supabase Storage
   ```bash
   curl https://wavemedia-six.vercel.app/api/db/portfolio | jq '.items[] | select(.image | contains("IMG_XXXX"))'
   ```

2. ✅ Portfolio item saved to database
   ```bash
   curl https://wavemedia-six.vercel.app/api/db/portfolio | jq '.items | length'
   ```

3. ✅ Photography page has correct cache headers
   ```bash
   curl -I https://wavemedia-six.vercel.app/photography | grep cache-control
   # Should show: cache-control: private, no-cache, no-store, max-age=0, must-revalidate
   ```

4. ✅ Hard refresh browser
   - Ctrl+Shift+R (Windows/Linux)
   - Cmd+Shift+R (Mac)
   - Clear cache in DevTools

### Build Takes Too Long (>5 min)

**Cause**: Database connection timeout during build

**Fix**: DATABASE_URL shouldn't be set during build, or timeout is too long

**Check**:
```bash
# Local build (should be ~15 seconds)
npm run build

# Vercel logs
vercel logs --limit 100
```

### Video Thumbnail Not Auto-Generating

**Cause**: URL format not recognized

**Supported formats**:
- `https://youtube.com/watch?v=abc123`
- `https://www.youtube.com/watch?v=abc123`
- `https://youtu.be/abc123`
- `https://youtu.be/abc123?t=10`

**Not supported**: Vimeo (yet)

---

## Future Improvements

- [ ] Vimeo video support (extract ID differently)
- [ ] Batch upload multiple photos
- [ ] Image optimization/resizing in Supabase
- [ ] Video upload to Supabase instead of YouTube-only
- [ ] Admin analytics (view counts per item)
- [ ] Scheduled publish dates
- [ ] Multi-language support

---

## Quick Reference

### Environment Variables
```bash
DATABASE_URL=postgresql://...
SUPABASE_URL=https://pfdflzjycnzkelrqalus.supabase.co
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_PASSWORD=waveadmin2024
```

### Database Connection String Format
```
postgresql://[user]:[password]@[host]:[port]/[database]
```
- Uses Transaction Pooler (`:6543`) for serverless
- SSL required

### Signed URL Flow
```
Admin Panel → Request Signed URL
  ↓
Server extracts SERVICE_ROLE_KEY, generates PUT URL
  ↓
Browser uploads file directly to Supabase Storage
  ↓
Admin saves metadata to database
  ↓
Site fetches and displays instantly
```

### Cache Invalidation
```
Save → revalidateTag('portfolio') → Pages with revalidate=0 fetch fresh data
```

---

## Support Contact

For issues:
1. Check Vercel build logs: `vercel logs --limit 100`
2. Check database: `curl https://wavemedia-six.vercel.app/api/db/portfolio`
3. Check cache headers: `curl -I https://wavemedia-six.vercel.app/photography`
