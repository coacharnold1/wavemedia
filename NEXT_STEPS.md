# WAVE Media: Next Steps & What We Need

_Last updated: November 11, 2026_

**Done:** Phase 1 (foundation) and Phase 2 (portfolio pages, services, booking, project pages, SEO files, working forms), plus: email delivery code, spam protection, analytics hook, structured data, 404/error pages, draft Privacy/Terms, accessibility pass, placeholder art, content validator (`npm run validate:content`), AI reply drafts and knowledge base. Those features switch on when the keys below are provided.
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

### Business facts for the AI assistant (`src/lib/knowledge.ts`)
Short answers are fine; I'll write them up. Drafted replies and the future chatbot will only say what is written here.
- [ ] Service area (NJ / tri-state? do you travel?)
- [ ] Pricing policy (never quote, "starting at", or published prices)
- [ ] Typical turnaround for video and photo
- [ ] Your process, inquiry to delivery
- [ ] FAQ answers: travel, revisions included, footage ownership/usage rights, deposits/payment plans
- [ ] Preferred tone, or a sample email you like

### Legal
- [ ] Review the draft Privacy Policy and Terms (`/privacy`, `/terms`); have a lawyer confirm before launch

### Accounts and keys (I can set these up with you; keys go in `.env.local` / hosting settings, never in chat or git)
- [ ] Resend account + API key, and the email address that receives inquiries
- [ ] Verified sending domain/address for Resend (optional at first)
- [ ] AI provider account + API key (OpenAI or any OpenAI-compatible provider)
- [ ] Google Analytics 4 measurement ID (`G-XXXX`)
- [ ] HoneyBook access (only if going with Option B)

### Branding
- [ ] A transparent-background or vector version (SVG/PNG) of the logo, if one exists. The current files have solid black backgrounds.
- [ ] Brand font or colors, if different from the current black and gold
- [ ] A hero image or short background reel for the homepage (optional)

---

## 2. Decisions needed

- [ ] **Form handling:** how should inquiries reach you?
  - Option A: email only (Resend). **Built and ready.** It activates once `RESEND_API_KEY` and `INQUIRY_TO_EMAIL` are set. Until then **no inquiries are received** (they only log on the server).
  - Option B: HoneyBook integration (needs account and API access). Not built yet.
- [ ] **Hosting:** Vercel is recommended for Next.js (free tier is fine to start).
- [ ] **Domain:** who controls `wavemedianj.com` DNS?
- [ ] **AI:** which provider, and confirm bots never message clients without your approval (recommended).

---

## 2b. AI & automation plan

Foundation is in place: content lives in data files (`src/lib/portfolio.ts`, `src/lib/constants.ts`), `AGENTS.md` tells coding agents the rules, and `.env.example` lists the keys we will need. Suggested order, since each step builds on the last:

1. **Inquiry delivery (email).** Prerequisite for everything below. Needs: receiving email + Resend key.
2. **AI-assisted content updates via Git.** Agents add portfolio items and edit copy on a branch and open a PR; a human approves. Needs: nothing new. Works today using `AGENTS.md`.
3. **AI-drafted replies and follow-ups.** BUILT: each inquiry email to you includes a draft reply (never auto-sent). Activates with `AI_API_KEY` (any OpenAI-compatible provider) plus step 1. **Needs from you: fill in the TODOs in `src/lib/knowledge.ts`** (service area, pricing policy, turnaround, process, FAQ answers) so drafts and the future chatbot stay accurate.
4. **Automated workflow.** Inquiry to HoneyBook/CRM to confirmation email to calendar. Needs: HoneyBook (or other CRM) API access.
5. **Visitor chatbot.** Answers questions about services and captures leads into the inquiry flow. Needs: an AI provider key, and your real services, pricing policy, FAQs and tone so it does not make things up.

Decisions: which AI provider/account you want to use, and whether bots may ever send messages to clients without human approval (recommended: no, at least at first).

---

## 3. What I'll do once I have the above

1. Swap real content into `src/lib/portfolio.ts` and `public/`, and optimize images
2. Update About, Services and footer copy; fill `src/lib/knowledge.ts`
3. Add the keys to `.env.local`, test real email and AI drafts end to end
4. Add testimonials section (if provided)
5. Add the HoneyBook/CRM step and the visitor chatbot (after the knowledge base is filled in)
6. Run Lighthouse and mobile checks, then fix issues
7. Deploy to Vercel (set the same env vars there) and point the domain

---

## 4. Known placeholders in the site right now

| Item | Where |
| --- | --- |
| Phone `+1 (123) 456-7890` | `src/lib/constants.ts` |
| 9 sample portfolio projects (no images or videos) | `src/lib/portfolio.ts` |
| Generic service descriptions and package tiers | `src/app/services/page.tsx`, `src/app/page.tsx` |
| About page text | `src/app/about/page.tsx` |
| Academy "coming soon" | `src/app/academy/page.tsx` |
| `TODO` business facts for AI | `src/lib/knowledge.ts` |
| Draft Privacy / Terms text | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |

See `ROADMAP.md` for the longer-term plan (Phases 3 to 5).
