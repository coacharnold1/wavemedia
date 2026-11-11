# WAVE Media - Development & Deployment Guide

## Development vs. Production

### ✅ Current Setup (Local Development)
- **Where**: `/home/fausto/Documents/wavemedia/` on your Garuda machine
- **Server**: Running on `http://localhost:3000`
- **Purpose**: Writing and testing code
- **This is CORRECT** - you should develop locally!

### 📦 Later: Production Deployment
- **Where**: GoDaddy hosting (or Vercel, AWS, etc.)
- **Domain**: `wavemedianj.com`
- **Purpose**: Your real website that clients visit
- **This happens when you're ready to launch**

---

## 🚚 How to Transport/Deploy This Project

### Option 1: Git & GitHub (RECOMMENDED)
**Best for collaboration, version control, and easy deployment**

#### Step 1: Initialize Git Repo
```bash
cd /home/fausto/Documents/wavemedia
git init
git add .
git commit -m "Initial WAVE Media website foundation"
```

#### Step 2: Push to GitHub
```bash
# Create a repo on GitHub (no code initially)
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/wavemedia.git
git branch -M main
git push -u origin main
```

#### Step 3: Deploy from GitHub
When ready to deploy to GoDaddy/Vercel:
```bash
# On GoDaddy or Vercel:
git clone https://github.com/YOUR_USERNAME/wavemedia.git
cd wavemedia
npm install
npm run build
# Configure hosting to run production build
```

**Benefits**:
- ✅ Full version history
- ✅ Easy collaboration
- ✅ One-click deployment on Vercel
- ✅ Automatic backups
- ✅ Easy to work on multiple machines

---

### Option 2: Manual Transfer (USB/Cloud)
**Simple but requires manual setup on new machine**

#### To Transfer to Another Machine:
```bash
# 1. Copy entire project folder
cp -r /home/fausto/Documents/wavemedia /path/to/usb/

# OR zip it:
zip -r wavemedia-project.zip /home/fausto/Documents/wavemedia/
# Transfer zip file

# 2. On new machine, extract:
unzip wavemedia-project.zip
cd wavemedia

# 3. Install dependencies (same as first time)
npm install

# 4. Start dev server
npm run dev
```

**Important**: `.gitignore` excludes `node_modules/` so they're NOT in the backup - you need to `npm install` on new machine.

---

### Option 3: Cloud Storage (Dropbox, Google Drive, OneDrive)
**Good for backup and access from anywhere**

```bash
# Sync your project folder to cloud storage
# It automatically syncs your changes
# You can clone it on any machine that has the storage client installed
```

---

## 📦 What Gets Transported

### ✅ YES - Transfer These:
```
wavemedia/
├── src/                    # All your code
├── public/                 # Images, assets
├── *.json                  # Config files
├── *.ts                    # TypeScript configs
├── *.md                    # Documentation
├── .gitignore             # Git settings
├── .eslintrc.json         # Linting
├── .prettierrc.json       # Formatting
└── package.json           # Dependencies list
```

### ❌ NO - Don't Transfer These:
```
wavemedia/
├── node_modules/          # Too large (~500MB+), regenerated with npm install
├── .next/                 # Build artifacts, regenerated with npm run build
└── .env.local             # Secrets, create new one on each machine
```

**.gitignore handles this automatically** - these folders won't be committed.

---

## 🚀 Deployment to GoDaddy

### Prerequisites:
- GoDaddy account with hosting plan that supports Node.js
- Domain: wavemedianj.com
- SSH access to hosting

### Deployment Steps:

#### 1. Build for Production
```bash
cd /home/fausto/Documents/wavemedia
npm run build
# Creates .next/ folder with optimized production build
```

#### 2. Upload to GoDaddy
**Option A: Git (easiest)**
```bash
# On GoDaddy server:
git clone https://github.com/YOUR_USERNAME/wavemedia.git
cd wavemedia
npm install --production
npm run build
```

**Option B: FTP/SCP**
```bash
# Upload only files listed in "YES - Transfer These"
scp -r src/ public/ package.json your-user@godaddy:/path/to/wavemedia/
cd /path/to/wavemedia
npm install --production
npm run build
```

#### 3. Configure Node.js Runtime
On GoDaddy hosting panel:
- Set Node.js version: 26.x or higher
- Set start script: `npm start`
- Set environment variables in `.env.production`

#### 4. Point Domain
- GoDaddy DNS settings → Point wavemedianj.com to your hosting

---

## 🌐 Alternative: Deploy to Vercel (EASIER)

**Vercel is optimized for Next.js - literally 1 click deployment**

### Steps:
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repo
5. Click "Deploy"
6. Add custom domain: wavemedianj.com in Vercel dashboard

**That's it!** Vercel handles:
- ✅ Automatic builds
- ✅ Automatic SSL
- ✅ Auto-scaling
- ✅ Free tier available
- ✅ Paid tiers if you need

---

## 📝 .env.local - Secrets (Important!)

### Local Development (.env.local)
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
HONEYBOOK_API_KEY=your-test-key
SENDGRID_API_KEY=your-test-key
```

### Production (.env.production)
```
NEXT_PUBLIC_SITE_URL=https://wavemedianj.com
HONEYBOOK_API_KEY=your-real-key
SENDGRID_API_KEY=your-real-key
```

**NEVER commit `.env.local` or `.env.production` to Git!**
- Create new `.env` files on each machine
- Update with real keys when deploying

---

## 🔄 Typical Workflow

### Day-to-Day Development (Your Machine)
```bash
# Start each day:
cd /home/fausto/Documents/wavemedia
npm run dev

# Make changes, see live updates
# Test in browser at http://localhost:3000

# Save work to Git:
git add .
git commit -m "Added portfolio gallery"
git push
```

### When Ready to Deploy
```bash
# Build production version:
npm run build

# Test production build locally:
npm start
# Visit http://localhost:3000

# Push to GitHub:
git push

# Deploy (automatic on Vercel, or manual on GoDaddy)
```

### Another Machine / Collaborator
```bash
# Clone from GitHub:
git clone https://github.com/YOUR_USERNAME/wavemedia.git
cd wavemedia

# Install dependencies:
npm install

# Start developing:
npm run dev
```

---

## ✅ Project is Transport-Ready

Your current setup is **100% transportable** because:

1. ✅ **Code is isolated** - All in `/home/fausto/Documents/wavemedia/`
2. ✅ **Dependencies listed** - `package.json` has everything
3. ✅ **`.gitignore` configured** - Excludes large/temporary files
4. ✅ **No hardcoded paths** - Everything uses relative paths
5. ✅ **Environment variables ready** - `.env.local` for secrets

---

## 🎯 Recommended Setup (Best Practice)

1. **Use GitHub** for version control
2. **Use Vercel** for hosting (easiest for Next.js)
3. **Use `.env` files** for secrets

This gives you:
- ✅ Development anywhere
- ✅ One-click deployment
- ✅ Automatic SSL/HTTPS
- ✅ Automatic scaling
- ✅ Free tier for testing

---

## Summary

**Your project is:**
- ✅ Local (development only) ✓
- ✅ Transportable (can move to any machine) ✓
- ✅ Deployable (ready for production) ✓
- ✅ Version-controlled (ready for Git) ✓

**No action needed right now** - just develop locally and keep making improvements. When you're ready to go live, pick a deployment option and deploy!

---

## Next Steps

1. **Option A: Use GitHub + Vercel** (recommended)
   - Create GitHub account
   - Push project to GitHub
   - Deploy to Vercel (1 click)
   - Domain points to Vercel

2. **Option B: GoDaddy Only**
   - Get GoDaddy hosting with Node.js
   - Upload files via Git or FTP
   - Configure Node.js runtime
   - Deploy

3. **Option C: Continue Local Development**
   - Keep working locally
   - Decide on deployment later
   - No rush - build first, deploy when ready!

---

**Bottom line: You're good! Keep developing locally. Transport/deploy when ready! 🚀**
