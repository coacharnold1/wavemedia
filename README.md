# WAVE Media Website

Premium cinematography, photography, and creative production platform built with Next.js.

**Brand Tagline**: Crafting Stories With Intent

## Project Structure

```
wavemedia/
├── public/              # Static assets (images, videos, logos)
├── src/
│   ├── app/            # Next.js pages and layouts
│   ├── components/     # Reusable React components
│   ├── styles/         # Global CSS and Tailwind config
│   ├── lib/            # Utilities and constants
│   ├── types/          # TypeScript interfaces and schemas
│   └── app/api/        # API routes (forms, integrations)
├── .env.local          # Environment variables (not committed)
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Quick Start

### Prerequisites
- Node.js 18+ and npm installed
- Git for version control

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Copy `.env.example` to `.env.local` and fill in values (never commit it).

3. Start development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint (flat config, `eslint.config.mjs`)
- `npm run format` - Format code with Prettier
- `npx tsc --noEmit` - Type check

## Status

Phases 1 and 2 are built. Portfolio items, phone number and social links are placeholders until real content arrives. Forms validate but **do not yet deliver email** (they log on the server). See `NEXT_STEPS.md` for what is needed and the AI/automation plan, and `AGENTS.md` for rules for AI agents.

## Pages

- **Home** (`/`) - Hero, featured work, services, CTA
- **About** (`/about`) - Company story and philosophy
- **Cinematography** (`/cinematography`) and **Photography** (`/photography`) - Filterable galleries with lightbox
- **Work detail** (`/work/[slug]`) - Individual project page
- **Services** (`/services`) - Service offerings
- **Booking** (`/booking`) - Project inquiry form
- **Contact** (`/contact`) - Contact form
- **Academy** (`/academy`) - Coming soon page
- Also: `sitemap.xml`, `robots.txt`, Open Graph/Twitter images

## Content

Portfolio data: `src/lib/portfolio.ts`. Contact info and social links: `src/lib/constants.ts`. Images: `public/`. Logos: `public/brand/`.

## Components

Header (logo, responsive menu), Footer, PortfolioGallery, VideoPlayer, ContactForm and BookingForm (react-hook-form + zod).

## Design System

### Colors
- **Black**: `#0a0a0a` - Primary background
- **Charcoal**: `#1a1a1a` - Secondary background
- **Dark**: `#2d2d2d` - Tertiary background
- **Gold**: `#d4af37` - Primary accent
- **Gold Light**: `#e5c158` - Accent hover state
- **White**: `#f5f5f5` - Primary text
- **Gray**: `#808080` - Secondary text

### Typography
- Heading font: System font stack
- Body font: System font stack
- Dark theme by default

### Layout
- Container max-width: 1280px (7xl)
- Responsive breakpoints: mobile, tablet, desktop
- Cinematic overlay gradients on hero sections

## Forms

### Contact Form
- Name, email, phone, message
- Validation with Zod schema
- API route: `POST /api/contact`

### Project Inquiry Form
- Service type selection
- Budget and timeline input
- Detailed project description
- API route: `POST /api/inquiry`

## API Routes

- `POST /api/contact` - Process contact form submissions
- `POST /api/inquiry` - Process project inquiry forms
Both currently validate and log only; email/CRM delivery is pending.

## Deployment

### GoDaddy Hosting
1. Build: `npm run build`
2. Upload `dist` or `.next` folder to GoDaddy
3. Configure Node.js runtime
4. Set environment variables in hosting panel

### Vercel (Recommended for Next.js)
1. Connect repository to Vercel
2. Automatic deployments on push
3. Configure environment variables
4. Custom domain setup

## Future Enhancements

- [x] Portfolio gallery with filters and lightbox
- [x] Video embeds (YouTube/Vimeo)
- [x] Basic SEO (metadata, sitemap, robots, OG images)
- [ ] Email delivery (Resend) and HoneyBook CRM
- [ ] AI features: reply drafts, visitor chatbot, agent content updates (see `NEXT_STEPS.md`)
- [ ] Image optimization
- [ ] Admin dashboard
- [ ] WAVE Academy course listings
- [ ] Structured data and analytics

## Performance

- Image and video lazy loading
- Optimized build with code splitting
- Tailwind CSS for efficient styling
- Next.js static site generation where possible

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

© 2024 WAVE Media LLC. All rights reserved.

---

**Brand Philosophy**: Crafting Stories With Intent
