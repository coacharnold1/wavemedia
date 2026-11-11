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
Create `.env.local` and add:
```
NEXT_PUBLIC_SITE_URL=https://wavemedianj.com
NEXT_PUBLIC_HONEYBOOK_API_KEY=your_honeybook_api_key
```

3. Start development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Pages

- **Home** (`/`) - Hero section, featured work, services, CTA
- **About** (`/about`) - Company story, philosophy, services
- **Cinematography** (`/cinematography`) - Portfolio gallery
- **Photography** (`/photography`) - Portfolio gallery
- **Services** (`/services`) - Detailed service offerings
- **Booking** (`/booking`) - Project inquiry form
- **Contact** (`/contact`) - Contact form
- **Academy** (`/academy`) - Courses (future)

## Components

### Header
Responsive navigation with mobile menu. Fixed positioning with backdrop blur.

### Footer
Multi-column footer with navigation, contact info, and social links.

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
- `GET /api/portfolio` - Fetch portfolio items (placeholder)
- `GET /api/services` - Fetch services (placeholder)

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

## Future Enhancements (Phase 2+)

- [ ] Portfolio gallery with filters and lightbox
- [ ] Video hosting integration (Vimeo/YouTube)
- [ ] HoneyBook CRM integration
- [ ] Email service integration (SendGrid/Resend)
- [ ] Image optimization with Cloudinary
- [ ] Admin dashboard
- [ ] WAVE Academy course listings
- [ ] SEO optimization (meta tags, structured data)
- [ ] Analytics integration

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
