# WAVE Media: Next Steps & Remaining Work

_Last updated: November 15, 2026_

**Status:** ✅ **SITE LIVE ON VERCEL** with admin photo manager

**Completed:** 
- ✅ Phase 1-3: Foundation, content pages, services, portfolio structure
- ✅ Admin photo portal with 42 images ready to organize
- ✅ Production deployment on Vercel
- ✅ Email delivery code, spam protection, analytics hooks
- ✅ Structured data, 404/error pages, accessibility
- ✅ Privacy/Terms pages, content validator
- ✅ AI knowledge base foundation
- ✅ Business contact details and social links
- ✅ Team bios (Lorenzo & Tim) with placeholder for headshots

**Live preview:** 
- Production: https://wavemedia-six.vercel.app/
- Admin: https://wavemedia-six.vercel.app/admin (password: waveadmin2024)
- Local dev: `npm run dev` then http://localhost:3000

---

## 1. IMMEDIATE: Photo Organization (This Week)

### Log in to Admin Portal
1. Go to: https://wavemedia-six.vercel.app/admin
2. Enter password: `waveadmin2024`
3. Click **"Scan for Photos"** to load 42 images

### Organize Photos
For each photo:
- [ ] Set category (Sports, Portraits, Events, Corporate, Lifestyle)
- [ ] Add title (e.g., "High School Basketball Game")
- [ ] Add description (1-2 sentences about the shot)
- [ ] Set date (when the photo was taken)
- [ ] Mark 5-10 as "Featured" for homepage display

### Export Portfolio Code
- [ ] Click **"Download"** or **"Copy Code"** 
- [ ] Share the generated TypeScript code
- [ ] I'll merge it into `src/lib/portfolio.ts`
- [ ] Photos will auto-appear on the site

### Legal
- [ ] Review the draft Privacy Policy and Terms (`/privacy`, `/terms`); have a lawyer confirm before launch

### Accounts and keys (I can set these up with you; keys go in `.env.local` / hosting settings, never in chat or git)
- [ ] Resend account + API key, and the email address that receives inquiries
---

## 2. NEXT: Content Completion & Team Assets

### Add Team Headshots
Send:
- [ ] Lorenzo Williams professional headshot (JPG/PNG, 400x400px or larger)
- [ ] Tim Arnold professional headshot (JPG/PNG, 400x400px or larger)
- I'll add them to the About page alongside bios

### Verify/Update Business Details
- [x] Business phone number → footer + contact page
- [x] Business email → contact page
- [x] Instagram URL → footer
- [x] Social links → footer (hidden until provided)
- [ ] Any updates to services descriptions?
- [ ] Any updates to About page text?
- [ ] Client testimonials (optional but recommended)

### AI Assistant Knowledge Base
Fill in `src/lib/knowledge.ts` for AI-assisted replies:
- [ ] Service area confirmation (NJ/tri-state/travel)
- [ ] Pricing communication preferences
- [ ] Typical turnaround for video/photo
- [ ] Your inquiry-to-delivery process
- [ ] FAQ answers (travel, revisions, rights, deposits)
- [ ] Preferred email/chat tone

---

## 3. THEN: Form Integration & Automation

### Email Delivery Setup
- [ ] Confirm receiving email address
- [ ] Get Resend API key (free tier: https://resend.com/)
- [ ] I'll set `RESEND_API_KEY` and `INQUIRY_TO_EMAIL` in Vercel
- [ ] Test contact form end-to-end

### HoneyBook Integration (Optional)
- [ ] HoneyBook account access (if using)
- [ ] HoneyBook API credentials
- [ ] Mapping inquiry form → HoneyBook projects
- [ ] Automated workflow setup

### Analytics
- [ ] Google Analytics 4 account + Measurement ID
- [ ] I'll add GA4 tracking to site
- [ ] Setup conversion goals

---

## 4. FINAL: Optimization & Deployment

- [ ] Image optimization for web performance
- [ ] Lighthouse audit and fixes
- [ ] Mobile responsiveness testing
- [ ] Browser compatibility check
- [ ] SEO meta tags verification
- [ ] SSL certificate (auto on Vercel)
- [ ] Custom domain setup (if needed)
- [ ] Production deployment verification

---

## 5. Environment Variables (Vercel)

Currently set:
- ✅ `ADMIN_PASSWORD` = `waveadmin2024`

Need to add (when ready):
- `RESEND_API_KEY` → enables email delivery
- `INQUIRY_TO_EMAIL` → where to send inquiries
- `AI_API_KEY` → for AI-assisted drafts
- `GOOGLE_ANALYTICS_ID` → for analytics
- Any HoneyBook API keys (if using)

---

## 6. Known Placeholders

| Item | Where | Status |
| --- | --- | --- |
| Lorenzo Williams headshot | `/src/app/about` | ⏳ Needs image |
| Tim Arnold headshot | `/src/app/about` | ⏳ Needs image |
| 9 portfolio projects | `src/lib/portfolio.ts` | 🔄 42 photos in admin, awaiting org |
| Client testimonials | `src/app/page.tsx` | ⏳ Needs quotes |
| Academy page | `src/app/academy/page.tsx` | ⏳ Needs scope/content |
| Business facts for AI | `src/lib/knowledge.ts` | ⏳ Needs input |
| Privacy/Terms text | `src/app/privacy`, `src/app/terms` | ✅ Draft present |

---

## 7. Quick Reference: File Locations

| What to Change | File | How |
| --- | --- | --- |
| Edit business info | `src/lib/constants.ts` | Edit `siteConfig` object |
| Add portfolio projects | `src/lib/portfolio.ts` | Use admin portal or edit directly |
| Edit services copy | `src/app/services/page.tsx` | Edit JSX content |
| Edit about page | `src/app/about/page.tsx` | Edit JSX content |
| Add headshots | `public/` | Place images, reference in page |
| Contact form behavior | `src/app/api/contact/route.ts` | Edit API handler |
| Inquiry form behavior | `src/app/api/inquiry/route.ts` | Edit API handler |
| AI knowledge base | `src/lib/knowledge.ts` | Fill in `TODO` sections |

---

## 8. Timeline Suggestions

**Week 1 (This Week):** Organize photos in admin portal  
**Week 2:** Add headshots, verify copy, fill AI knowledge base  
**Week 3:** Set up email and analytics  
**Week 4:** Final testing and optimizations  

**Then:** Go live! 🚀

---

**Last Updated:** November 15, 2026  
**Next Phase:** Photo organization via admin portal
