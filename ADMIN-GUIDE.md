# Admin Panel Guide: Managing Your Portfolio

This guide explains what each button does and how to add content to your WAVE Media portfolio.

## Quick Start Workflow

The admin panel is organized into **3 simple steps**:

### Step 1: Create Content 🎬 📸
Click **+ Add Item** to open a menu with 3 options:

#### Option A: **New Video** ▶
Use this if you have a **YouTube or Vimeo video**.

**What to do:**
1. Click "+ Add Item" → "New Video"
2. A new blank video entry appears at the bottom
3. Scroll down and paste the YouTube/Vimeo URL in the **VIDEO URL** field
4. The thumbnail **generates automatically** ✨
5. Fill in the title, description, year, category
6. Mark as "Featured" if you want it on the homepage
7. Scroll to bottom and click **Save Changes**

**Supported URLs:**
- `https://youtube.com/watch?v=abc123`
- `https://youtu.be/abc123`
- `https://vimeo.com/123456`

---

#### Option B: **New Photo** 📸
Use this if you want to **manually type in details**.

**What to do:**
1. Click "+ Add Item" → "New Photo"
2. A new blank photo entry appears at the bottom
3. Scroll down and fill in all the fields:
   - **TITLE**: Project name (e.g., "Wedding at the Beach")
   - **IMAGE PATH**: URL to the photo file (e.g., `/portfolio/wedding-beach.jpg`)
   - **DESCRIPTION**: Story about the photo
   - **YEAR**: Year taken
   - **CATEGORY**: Type of photo (Events, Weddings, Portraits, etc.)
   - **CLIENT**: Who hired you (optional)
4. Mark as "Featured" if you want it on the homepage
5. Scroll to bottom and click **Save Changes**

---

#### Option C: **Upload Photo** 🖼️ ⬆️
Use this if you want to **upload an image file from your computer**.

**What to do:**
1. Click "+ Add Item" to open the menu
2. Click the **"Browse..."** button under "Upload photo file"
3. Select an image from your computer (JPG, PNG, WebP, GIF)
4. The image **uploads automatically** and is added to the editor
5. A new photo entry appears at the bottom with the image URL filled in
6. Fill in the title, description, year, category, etc.
7. Scroll to bottom and click **Save Changes**

**Key difference:** The "Browse" button auto-uploads and auto-fills the IMAGE PATH field. Much faster than typing the URL manually!

---

### Step 2: Edit & Organize
Below the action buttons, you'll see a list of all your portfolio items (videos and photos).

**For each item, you can:**
- **Edit all fields**: Title, description, year, category, etc.
- **Check "Featured"**: To show on the homepage and featured section
- **Click Duplicate**: To copy an item and create a similar one
- **Click Delete**: To remove an item (deletion confirms when you save)

---

### Step 3: Publish Changes 💾 🚀

After making changes, you have 3 buttons:

#### **💾 Save Changes** (Green button)
- **What it does:** Saves all your edits to the database
- **When to use:** After every change—adding items, editing titles, marking as featured, etc.
- **How fast:** Changes appear on the site within **1-2 seconds** ✨
- **Click this after every edit!**

#### **🚀 Force Redeploy** (Gold button)
- **What it does:** Tells Vercel to rebuild the entire website
- **When to use:** Only if changes don't appear after 30 seconds
- **How fast:** Takes ~2 minutes
- **Usually not needed** — 99% of the time, "Save Changes" is enough

#### **🔄 Reload** (Blue button)
- **What it does:** Refreshes your browser with the latest data from the database
- **When to use:** If you think something is out of sync, or if you're viewing stale data
- **When to click:** Rarely needed; only if the editor seems confused

---

## Understanding the Buttons: FAQ

### "What's the difference between 'New Photo' and 'Upload Photo'?"

| New Photo | Upload Photo |
|-----------|--------------|
| You type in the image path manually | You browse your computer and upload the file |
| Good if you already have a URL | Good if you have an image file on your computer |
| Requires you to know the URL | Automatic—file uploads, URL fills in |
| Slower workflow | Faster workflow |

**Example:** If you took a photo with your phone and want to add it quickly, use **Upload Photo**. If you have a photo already hosted online and just need to link it, use **New Photo**.

---

### "What does clicking 'Browse' actually do?"

The word "Browse" is misleading—it's actually the **file upload button**:

1. Click "Browse" or drag a file into the box
2. Select your image file
3. The file **uploads directly to our storage** (happens automatically)
4. A new photo entry is **added to your editor** automatically
5. The image URL is **filled in automatically**
6. You just need to edit the title, description, etc.
7. Click **Save Changes** to publish

It's the fastest way to add photos!

---

### "What if I have multiple photos to upload?"

You can upload one at a time:
1. Upload photo 1 → Edit it → Click Save Changes
2. Upload photo 2 → Edit it → Click Save Changes
3. Upload photo 3 → Edit it → Click Save Changes
4. etc.

Or batch upload if they're similar:
1. Upload all photos (one at a time)
2. Edit all of them
3. Click Save Changes once at the end

---

### "Do I need to click 'Sync & Redeploy'?"

**No, almost never.**

Here's why:
- When you click **Save Changes**, the site updates within 1-2 seconds
- This happens automatically without redeploying
- **Force Redeploy** is only needed if you notice changes aren't showing after 30 seconds

**Quick check:** After clicking Save Changes, refresh the website (press F5) and see if your changes are there. If yes, you're done! If no, then click Force Redeploy.

---

## Workflow Examples

### Example 1: Adding a Wedding Video from YouTube

1. Click **+ Add Item** → **New Video**
2. Scroll to the new video entry at the bottom
3. In **VIDEO URL**, paste: `https://youtube.com/watch?v=abc123xyz`
4. The thumbnail appears automatically ✨
5. Set **TITLE** to "Brandon & Victoria Wedding"
6. Set **YEAR** to 2024
7. Set **CATEGORY** to "Weddings"
8. Set **CLIENT** to "Brandon & Victoria"
9. Add a **DESCRIPTION**: "Wedding day highlights at the seaside garden. Captured the vows, dances, and intimate moments."
10. Check **Featured** to show on homepage
11. Scroll to bottom, click **Save Changes** ✅

---

### Example 2: Adding a Portrait Photo from Your Computer

1. Click **+ Add Item** to open menu
2. Click **Browse** (the file upload button)
3. Select `vacation-photo.jpg` from your pictures folder
4. File uploads automatically, photo entry added ✅
5. Set **TITLE** to "Sunset Portrait Session"
6. Set **YEAR** to 2024
7. Set **CATEGORY** to "Portraits"
8. Add **DESCRIPTION**: "Golden hour session in the canyon, natural lighting, intimate moments."
9. Leave **CLIENT** blank
10. Check **Featured** to highlight it
11. Scroll to bottom, click **Save Changes** ✅

---

### Example 3: Quickly Adding 5 Event Photos

1. Use **Upload Photo** 5 times to upload all images quickly
2. Each one is added to the editor automatically
3. Edit all 5 entries: titles, descriptions, categories
4. When done editing all 5, click **Save Changes** once
5. All 5 appear on the site within 1-2 seconds ✨

---

## Pro Tips 💡

1. **Hover over any button** to see a tooltip explaining what it does
2. **Hover over any form field** to see helpful hints
3. **Use "Duplicate"** to quickly create similar projects (wedding, wedding, wedding...)
4. **Mark as Featured carefully** — only your very best work
5. **Don't worry about "Save Changes"** — changes appear in 1-2 seconds, not hours
6. **Never need to open terminal** — everything is done through this admin panel
7. **Lazy? Upload photos quickly** via the Browse button instead of typing URLs

---

## Still Confused?

**All buttons have mouse-over text!** Hover over any button or field and wait a second—you'll see a helpful explanation.

If you still have questions, the system is designed to be intuitive. Try it out and see the changes appear instantly. It's hard to break anything—you can always delete and re-add items!

---

## Common Issues

### "I uploaded a photo but it's not showing on the website"
- Did you click **Save Changes** after uploading? (That's the green button)
- If you clicked Save but it's still not showing after 30 seconds, try clicking **Force Redeploy**

### "I changed the title but it's not updating"
- Click **Save Changes** to publish your edits

### "The thumbnail for my video didn't generate"
- Make sure you pasted a valid YouTube or Vimeo URL
- Try clicking **Save Changes** to see if it updates

### "I deleted an item but it came back"
- Did you click **Save Changes** after deleting? Delete alone doesn't save it
- Click the red Delete button, then click Save Changes

---

**Last Updated:** November 2024  
**Questions?** Contact support or check the technical documentation in `CMS-ARCHITECTURE.md`
