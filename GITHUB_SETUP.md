# 🚀 Push WAVE Media to GitHub

Your project is ready to push! Follow these steps:

---

## Step 1: Create a GitHub Repository

1. **Go to GitHub**: https://github.com/new
2. **Create new repository with these settings**:
   - **Repository name**: `wavemedia` (or `wave-media`)
   - **Description**: "Premium cinematography & photography website - WAVE Media LLC"
   - **Public or Private**: Choose (private recommended for business)
   - **Initialize repository**: Leave UNCHECKED (you already have code)
   - **Click**: "Create repository"

---

## Step 2: Connect Local Git to GitHub

Copy-paste these commands into your terminal:

```bash
cd /home/fausto/Documents/wavemedia

# Add GitHub as remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/wavemedia.git

# Rename branch from 'master' to 'main' (GitHub standard)
git branch -m main

# Push your code to GitHub
git push -u origin main
```

**You may be prompted for credentials**:
- If using HTTPS: GitHub username + Personal Access Token (not password)
- If using SSH: Automatic (if SSH key configured)

---

## Step 3: Get Your GitHub Credentials

### Option A: Personal Access Token (Recommended)
1. Go to: https://github.com/settings/tokens
2. Click: "Generate new token"
3. Select: "Generate new token (classic)"
4. Configure:
   - **Token name**: "wavemedia-push"
   - **Expiration**: 90 days (or custom)
   - **Scopes**: Check `repo` (full control of private repositories)
5. Click: "Generate token"
6. **COPY the token** (you won't see it again!)
7. When prompted in terminal for password, **paste the token**

### Option B: SSH Key (Faster, no password each time)
Already configured on your machine? Skip this.
```bash
# Check if SSH key exists:
ls -la ~/.ssh/id_rsa

# If yes: You're good! Use SSH URLs instead of HTTPS
# If no: Generate one:
ssh-keygen -t rsa -b 4096 -C "coacharnold@gmail.com"
# Then add to GitHub: https://github.com/settings/keys
```

---

## Step 4: Push to GitHub (Complete Commands)

### Using HTTPS + Personal Access Token:
```bash
cd /home/fausto/Documents/wavemedia

git remote add origin https://github.com/YOUR_USERNAME/wavemedia.git
git branch -m main
git push -u origin main

# When prompted:
# Username: YOUR_GITHUB_USERNAME
# Password: YOUR_PERSONAL_ACCESS_TOKEN (paste it)
```

### Using SSH (if configured):
```bash
cd /home/fausto/Documents/wavemedia

git remote add origin git@github.com:YOUR_USERNAME/wavemedia.git
git branch -m main
git push -u origin main

# No password needed if SSH key configured
```

---

## Step 5: Verify on GitHub

1. Go to: https://github.com/YOUR_USERNAME/wavemedia
2. You should see all your files and folders
3. You should see your commit with the full message

---

## 🎉 Success!

Once pushed, you can:

### View Your Code Online
```
https://github.com/YOUR_USERNAME/wavemedia
```

### Clone on Another Machine
```bash
git clone https://github.com/YOUR_USERNAME/wavemedia.git
cd wavemedia
npm install
npm run dev
```

### Make Changes & Push Updates
```bash
# After making changes:
git add .
git commit -m "Your commit message"
git push

# That's it! Changes automatically sync to GitHub
```

### Deploy to Vercel (1 Click!)
1. Go to: https://vercel.com
2. Click: "Import Project"
3. Select: Your GitHub repository
4. Click: "Deploy"
5. Done! Your site is live

---

## 📝 Future Commits

Every time you make changes:

```bash
cd /home/fausto/Documents/wavemedia

# See what changed:
git status

# Add changes:
git add .

# Commit with message:
git commit -m "Added portfolio gallery component"

# Push to GitHub:
git push
```

---

## 🔐 Security Notes

- ✅ `.gitignore` already excludes `node_modules/` and `.env` files
- ✅ Never commit passwords or API keys
- ✅ Use `.env.local` for secrets (already in `.gitignore`)
- ✅ Personal Access Token has limited permissions (can be revoked anytime)

---

## 🆘 If Something Goes Wrong

### "remote origin already exists"
```bash
git remote remove origin
# Then try again with the commands above
```

### "Permission denied"
```bash
# Your credentials are wrong
# For HTTPS: Use Personal Access Token, not password
# For SSH: Check that SSH key is added to GitHub
```

### "Branch 'master' has no upstream branch"
```bash
git push -u origin main
# The `-u` sets up tracking
```

---

## ✅ Your Git Status

**Local Repository**: ✅ Ready
- Branch: `main`
- Commit: `17f1b22` (Initial WAVE Media website foundation)
- Files: 29 files committed
- Status: Clean (nothing to commit)

**Remote**: Ready to connect
- GitHub repository created? ✅ You do that next
- Push ready? ✅ Yes

---

## Next Steps

1. **Create GitHub repo** (Step 1 above)
2. **Copy your GitHub username**
3. **Run the push commands** (Step 4 above)
4. **Verify on GitHub** (Step 5 above)
5. **Keep developing!** Commit and push as you make changes

---

**Questions?** Each error message will tell you what went wrong. Most common issues are fixed in the "If Something Goes Wrong" section above.

Let me know when you've pushed and I can verify it worked! 🚀
