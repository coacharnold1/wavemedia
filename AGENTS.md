<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## WAVE Media: guide for AI agents and bots

Marketing site for a cinematography/photography business. Next.js App Router, TypeScript, Tailwind. Brand: black and gold (`wave-black`, `wave-gold`), tagline "Crafting Stories With Intent".

### Where content lives (edit these, not page code)
| Change | File |
| --- | --- |
| Add/edit portfolio project | `src/lib/portfolio.ts` (`portfolioItems`; unique `slug`, `type` video or photo, `category` must match the lists in that file) |
| Phone, email, social links | `src/lib/constants.ts` (`siteConfig`; empty social URL = hidden) |
| Service/package copy | `src/app/services/page.tsx` |
| About copy | `src/app/about/page.tsx` |
| Images | `public/` (portfolio under `public/portfolio/`, brand under `public/brand/`); reference as `/portfolio/name.jpg` |
| AI/chatbot facts (services, pricing, FAQ, tone) | `src/lib/knowledge.ts` (fill every `TODO`; bots may only state facts written here) |
| Form fields/validation | `src/types/forms.ts` (zod) |
| Form handlers | `src/app/api/contact/route.ts`, `src/app/api/inquiry/route.ts` |

### Rules
- Use a branch and open a PR for content or code changes. Do not push straight to `main` unless told to.
- After editing `portfolio.ts`, run `npm run validate:content`.
- Before finishing, run `npm run lint`, `npx tsc --noEmit` and `npx next build`; all must pass.
- Never commit secrets. Keys go in `.env.local` (see `.env.example`).
- Do not invent client names, testimonials, prices or credentials. Leave placeholders and ask.
- Video items take a YouTube/Vimeo URL in `videoUrl`; photos need an `image` path.
- Keep copy in the brand voice: confident, cinematic, concise.
- Forms email via `src/lib/email.ts` (Resend) only when env keys are set; otherwise they just log. CRM/HoneyBook is not wired yet (see `NEXT_STEPS.md`).

