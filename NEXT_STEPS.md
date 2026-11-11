# WAVE Media: Next Steps & What We Need

_Last updated: November 11, 2026_

**Done:** Phase 1 (foundation) and Phase 2 (portfolio pages, services, booking, project pages, SEO files, working forms).
**Live preview:** run `npm run build && npx next start -p 3100`, then open http://127.0.0.1:3100

---

## 1. What I need from you and your partner

Send these in any order. Each item says where it lands on the site.

### Contact details (quick, do first)
- [ ] Real business phone number → footer + contact page
- [ ] Business email (confirm `contact@wavemedianj.com` is correct)
- [ ] Instagram URL → footer + contact page (hidden until provided)
- [ ] LinkedIn URL → footer + contact page (hidden until provided)
- [ ] Any other social links (Facebook, YouTube, TikTok)

### Portfolio content (biggest item)
For each project, send:
- [ ] Title
- [ ] Type: video or photo
- [ ] Category
  - Video: Commercials, Documentaries, Music Videos, Branded Content
  - Photo: Sports, Portraits, Events, Corporate, Lifestyle
- [ ] Year, and client name if you want it shown
- [ ] One-line description
- [ ] Video: a YouTube or Vimeo link (unlisted is fine)
- [ ] Photo / video thumbnail: JPG or PNG, ideally at least 1600px wide

Aim for 5 to 10 pieces to start. The current 9 entries are placeholders.

### Page copy
- [ ] **About:** company story, mission, who is behind WAVE (names, short bios, photos)
- [ ] **Services:** your real packages and what each includes
- [ ] **Pricing:** show prices, show "starting at", or keep "custom quote"?
- [ ] **Testimonials:** client quotes with name and company (optional)
- [ ] **WAVE Academy:** what is it? Currently a "coming soon" page.

### Branding
- [ ] A transparent-background or vector version (SVG/PNG) of the logo, if one exists. The current files have solid black backgrounds.
- [ ] Brand font or colors, if different from the current black and gold
- [ ] A hero image or short background reel for the homepage (optional)

---

## 2. Decisions needed

- [ ] **Form handling:** how should inquiries reach you?
  - Option A: email only (Resend or similar). Fastest, and I can add it as soon as I have the receiving address and an API key.
  - Option B: HoneyBook integration (needs account and API access).
  - Email sending code is built and ready: it activates once `RESEND_API_KEY` and `INQUIRY_TO_EMAIL` are set. Until then **no inquiries are received**.
- [ ] **Hosting:** Vercel is recommended for Next.js (free tier is fine to start).
- [ ] **Domain:** who controls `wavemedianj.com` DNS?
- [ ] **Analytics:** OK to add Google Analytics 4?

---

## 2b. AI & automation plan

Foundation is in place: content lives in data files (`src/lib/portfolio.ts`, `src/lib/constants.ts`), `AGENTS.md` tells coding agents the rules, and `.env.example` lists the keys we will need. Suggested order, since each step builds on the last:

1. **Inquiry delivery (email).** Prerequisite for everything below. Needs: receiving email + Resend key.
2. **AI-assisted content updates via Git.** Agents add portfolio items and edit copy on a branch and open a PR; a human approves. Needs: nothing new. Works today using `AGENTS.md`.
3. **AI-drafted replies and follow-ups.** On each inquiry, generate a draft reply and email it to you for approval (no auto-send at first). Needs: an AI provider API key, plus step 1.
4. **Automated workflow.** Inquiry to HoneyBook/CRM to confirmation email to calendar. Needs: HoneyBook (or other CRM) API access.
5. **Visitor chatbot.** Answers questions about services and captures leads into the inquiry flow. Needs: an AI provider key, and your real services, pricing policy, FAQs and tone so it does not make things up.

Decisions: which AI provider/account you want to use, and whether bots may ever send messages to clients without human approval (recommended: no, at least at first).

---

## 3. What I'll do once I have the above

1. Swap real content into `src/lib/portfolio.ts` and `public/`, and optimize images
2. Update About, Services and footer copy
3. Connect forms to email (and/or HoneyBook)
4. Add testimonials section (if provided)
5. Add Google Analytics
6. Run Lighthouse and mobile checks, then fix issues
7. Deploy to Vercel and point the domain

---

## 4. Known placeholders in the site right now

| Item | Where |
| --- | --- |
| Phone `+1 (123) 456-7890` | `src/lib/constants.ts` |
| 9 sample portfolio projects (no images or videos) | `src/lib/portfolio.ts` |
| Generic service descriptions and package tiers | `src/app/services/page.tsx`, `src/app/page.tsx` |
| About page text | `src/app/about/page.tsx` |
| Academy "coming soon" | `src/app/academy/page.tsx` |

See `ROADMAP.md` for the longer-term plan (Phases 3 to 5).
