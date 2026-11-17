# Deployment Guide

## Vercel Deployment

The WAVE Media site is deployed on **Vercel** at:
- **Production**: https://www.wavemedianj.com
- **Vercel Project**: https://vercel.com/wavemedia-nj/wavemedia

### Environment Variables (Already Configured)

These are set in Vercel project settings:

```
DATABASE_URL=postgresql://...            # Supabase connection string
SUPABASE_URL=https://pfdflzjycnzkelrqalus.supabase.co
SUPABASE_ANON_KEY=...                    # Public JWT key
SUPABASE_SERVICE_ROLE_KEY=...            # Admin JWT key
ADMIN_PASSWORD=waveadmin2024
VERCEL_TOKEN=...                         # For programmatic deploys
```

**Do NOT commit these to git.** They're only in Vercel secrets.

---

## Automatic Deployments

Pushes to `main` branch automatically deploy to production:

1. Push to `main`
2. Vercel detects commit
3. Build runs (~2 minutes)
4. Site updated at https://www.wavemedianj.com

**No manual action needed.**

---

## Manual Deployment

If needed, deploy from command line:

```bash
# Deploy to production
npx vercel deploy --prod

# Check deployment status
npx vercel ls --limit 1

# View build logs
vercel logs --limit 100
```

---

## Build Process

### Local Development

```bash
# Install dependencies
npm install

# Start dev server (runs on http://localhost:3000)
npm run dev

# Run production build locally
npm run build

# Start production server locally
npm run start
```

### Vercel Build

Build happens automatically on every push to `main`. Build steps:

1. Install dependencies
2. Run TypeScript type check
3. Next.js compile
4. Generate static pages (57 work detail pages)
5. Optimize assets

**Expected time**: ~2 minutes

**If build fails**:
```bash
# Check Vercel logs
vercel logs --limit 200 --since 1h

# Check git status and recent changes
git log --oneline -10
git diff HEAD~1
```

---

## Admin Panel Usage

Access the admin panel: https://www.wavemedianj.com/admin

**Login**: `waveadmin2024`

### Workflow: Add a Photo

1. Click **+ Add Item** → Select **Photo**
2. Fill form:
   - **Title**: Photo name
   - **Description**: About the photo (required)
   - **Category**: Choose from dropdown
   - **Year**: Year taken
   - **Client**: (optional)
3. Upload photo:
   - Click on "IMAGE PATH" field → triggers file picker
   - Select image → uploads to Supabase Storage
   - System generates slug (auto)
4. Click **Save to portfolio.ts**
5. **Wait 1-2 seconds**, then refresh site
6. Photo appears on /photography page

### Workflow: Add a Video

1. Click **+ Add Item** → Select **Video**
2. Fill form:
   - **Title**: Video name
   - **Description**: About the video (required)
   - **Category**: Choose from dropdown
   - **Year**: Year created
   - **Client**: (optional)
   - **VIDEO URL**: Paste YouTube/Vimeo link
3. System auto-generates thumbnail from YouTube
4. Click **Save to portfolio.ts**
5. Video appears on /cinematography page

### Features

- **Featured checkbox**: Marks items for featured section on homepage
- **Duplicate button**: Copy existing item (useful for similar videos/photos)
- **Delete button**: Remove item from portfolio
- **Filter by type**: View only photos or videos
- **View count**: Shows how many items are saved

---

## Troubleshooting

### Admin Panel Won't Load

**Check**:
1. URL is correct: https://www.wavemedianj.com/admin
2. Wait 10 seconds (page may be loading from database)
3. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
4. Check browser console for errors (F12 → Console tab)

### Photo Uploaded but Not Showing

**Steps**:
1. Check database: `curl https://wavemedia-six.vercel.app/api/db/portfolio | jq '.items | length'`
   - Should increase by 1 after save
2. Check if on photography page
   - Refresh page (Ctrl+Shift+R)
3. Check if photo is featured
   - Featured photos only show on homepage featured section
   - All photos show on /photography
4. Check image URL in database
   - Verify Supabase Storage URL is accessible

### Video Thumbnail Not Showing

**Cause**: YouTube URL not recognized

**Fix**: Use one of these formats:
- `https://youtube.com/watch?v=abc123`
- `https://www.youtube.com/watch?v=abc123`
- `https://youtu.be/abc123`

**NOT supported**: Vimeo (yet), custom video hosts

### Changes Not Appearing

**Checklist**:
1. Did you click **"Save to portfolio.ts"**? (Not just edit)
2. Wait 2-3 seconds
3. Hard refresh site (Ctrl+Shift+R)
4. Check cache headers:
   ```bash
   curl -I https://www.wavemedianj.com/photography
   # Look for: x-vercel-cache: MISS
   ```

### Site Says "Database Unavailable"

**This should not happen in production**, but if it does:

1. Check Supabase status: https://status.supabase.com
2. Verify DATABASE_URL in Vercel is set correctly
3. Check Vercel logs: `vercel logs --limit 100`
4. As temporary fix, site will fall back to static portfolio.ts

---

## Code Changes & Git Workflow

### Making Changes

1. Create feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```

2. Make changes locally:
   ```bash
   npm run dev    # Test locally
   npm run lint   # Check for errors
   npx tsc --noEmit  # Type check
   ```

3. Commit with descriptive message:
   ```bash
   git commit -m "Add feature description"
   ```

4. Push and create PR:
   ```bash
   git push origin feature/my-feature
   # Then create PR on GitHub
   ```

5. Once merged to `main`, auto-deploys to production

### Before Pushing

Always run these checks:

```bash
# Type check
npx tsc --noEmit

# Linting
npm run lint

# Local build
npm run build

# Check git status
git status
```

---

## Important Files to Know

| File | Purpose | Edit? |
|------|---------|-------|
| `src/lib/portfolio-db.ts` | Database fetch with timeout | Only if changing query logic |
| `src/app/api/db/portfolio/save/route.ts` | Save endpoint | Only if changing validation |
| `src/app/admin/client.tsx` | Admin UI | Yes, for new features |
| `CMS-ARCHITECTURE.md` | System documentation | Update when changing architecture |
| `.env.local` | Local env vars | Don't commit |
| `package.json` | Dependencies | Update when adding packages |

---

## Monitoring

### Check Site Status

```bash
# Simple health check
curl https://www.wavemedianj.com

# Check portfolio API
curl https://www.wavemedianj.com/api/db/portfolio | jq '.items | length'

# Check deployment status
npx vercel ls --limit 1
```

### View Recent Deployments

```bash
# Last 5 deployments
npx vercel ls --limit 5

# Inspect specific deployment
npx vercel inspect https://wavemedia-n0xx8l5et-wavemedia-nj.vercel.app

# View build logs
vercel logs --limit 100
```

---

## Common Git Commands

```bash
# See recent commits
git log --oneline -10

# See what changed
git diff HEAD~1

# Undo last commit (before push)
git reset --soft HEAD~1

# View branch status
git status

# Switch branches
git checkout main
git checkout feature/my-feature
```

---

## Package Management

### Add Package

```bash
npm install package-name
git add package.json package-lock.json
git commit -m "Add package-name dependency"
```

### Update All Packages

```bash
npm update
git add package.json package-lock.json
git commit -m "Update dependencies"
```

### Check for Security Issues

```bash
npm audit
npm audit fix  # Auto-fix where possible
```

---

## Performance Notes

### Why Pages Fetch Every Time

Portfolio pages use `revalidate=0`:
- **Pro**: Changes appear instantly (1-2 seconds)
- **Con**: Slightly more database queries
- **Result**: Worth the trade-off for a CMS

### Database Query Time

Typical query times:
- **Empty database**: 50-200ms (timeout triggers fallback)
- **Full database (57 items)**: 100-300ms
- **Timeout**: 15 seconds

### Build Performance

- **With DATABASE_URL set to slow/offline DB**: Can timeout (5-second limit for safety)
- **Without DATABASE_URL**: Uses static fallback, builds in ~15 seconds
- **Vercel build**: ~2 minutes total (includes other steps)

---

## Disaster Recovery

### If Production Breaks

1. **Check Vercel logs**:
   ```bash
   vercel logs --limit 200
   ```

2. **Revert last commit**:
   ```bash
   git revert HEAD
   git push origin main
   # Vercel auto-deploys again
   ```

3. **Or rollback deployment** in Vercel UI:
   - https://vercel.com/wavemedia-nj/wavemedia/deployments
   - Click "Promote to Production" on previous successful build

---

## Next Developer Onboarding

1. Read `CMS-ARCHITECTURE.md` (understand the system)
2. Read this file (`DEPLOYMENT.md`)
3. Clone repo and run `npm install`
4. Run `npm run dev` and test locally
5. Ask questions!

---

## Support

For issues or questions:
1. Check CMS-ARCHITECTURE.md for technical details
2. Check Vercel logs: `vercel logs --limit 100`
3. Check database: `curl https://wavemedia-six.vercel.app/api/db/portfolio`
4. Review recent git commits: `git log --oneline -20`
