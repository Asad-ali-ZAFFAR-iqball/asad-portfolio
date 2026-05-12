# Asad Ali Zaffar — Senior Software Engineer Portfolio

A world-class, production-ready personal portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Theme | next-themes (dark/light) |
| Icons | Lucide React |

---

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles, fonts, custom utilities
│   ├── layout.tsx           # Root layout with SEO metadata
│   ├── loading.tsx          # Loading state
│   ├── manifest.ts          # PWA manifest
│   ├── not-found.tsx        # 404 page
│   ├── page.tsx             # Main page (composes all sections)
│   └── sitemap.ts           # Sitemap generator
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Sticky nav with active section tracking, theme toggle
│   │   ├── Footer.tsx       # Footer with socials and back-to-top
│   │   ├── ScrollProgress.tsx
│   │   └── ThemeProvider.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx         # Full-screen hero with typing animation and stats
│   │   ├── About.tsx        # Bio + qualities grid
│   │   ├── Experience.tsx   # Interactive timeline with expandable cards
│   │   ├── Skills.tsx       # Tabbed skill browser with animated progress bars
│   │   ├── Projects.tsx     # Filterable project grid with case-study cards
│   │   ├── Education.tsx    # Education + certification cards
│   │   ├── Testimonials.tsx # Carousel with mini-avatar nav
│   │   └── Contact.tsx      # Validated form + contact info panel
│   │
│   └── ui/
│       ├── AnimatedSection.tsx   # Scroll-triggered fade/slide wrapper
│       ├── Badge.tsx             # Pill / tag component
│       ├── Button.tsx            # Motion-enhanced button / link
│       ├── GlassCard.tsx         # Frosted glass card
│       └── SectionHeader.tsx     # Eyebrow + title + description header
│
├── data/
│   ├── index.ts             # Barrel export
│   ├── profile.ts           # Personal info, stats
│   ├── experience.ts        # Work history
│   ├── skills.ts            # Skill categories
│   ├── projects.ts          # Portfolio projects
│   ├── education.ts         # Education + certifications
│   └── testimonials.ts      # Peer recommendations
│
├── hooks/
│   ├── useScrollProgress.ts   # Scroll % tracker
│   ├── useActiveSection.ts    # IntersectionObserver-based active nav
│   ├── useTypingEffect.ts     # Typewriter animation hook
│   └── useMediaQuery.ts       # SSR-safe media query
│
├── lib/
│   └── utils.ts             # cn(), formatDateRange, slugify, etc.
│
└── types/
    └── index.ts             # Full TypeScript type definitions
```

---

## Setup

### Prerequisites
- Node.js >= 18.17
- npm >= 9

### Installation

```bash
# 1. Navigate to the project
cd asad-portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

### Type Check

```bash
npm run type-check
```

---

## Customization

All personal data lives in `src/data/` — no component edits needed:

| File | Content |
|---|---|
| `profile.ts` | Name, title, bio, location, socials |
| `experience.ts` | Work history, roles, achievements |
| `skills.ts` | Skill categories and proficiency |
| `projects.ts` | Project showcase data |
| `education.ts` | Degrees and certifications |
| `testimonials.ts` | Peer recommendations |

---

## Contact Form

The contact form currently simulates submission. To wire a real email service:

1. **Resend** (recommended): Create an API route at `src/app/api/contact/route.ts`
2. **EmailJS**: Use the EmailJS SDK client-side
3. **Formspree**: Replace the `onSubmit` handler with a Formspree endpoint

---

## Deployment

### 🚀 GitHub Pages (Configured & Ready)

This portfolio is configured to deploy automatically to GitHub Pages with a custom domain.

**👉 See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.**

**Quick Start:**
```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main

# 2. Enable GitHub Pages in repository settings
# 3. Configure DNS records for your custom domain
# 4. Submit sitemap to Google Search Console
```

Your site will be live at: **https://asadalizaffar.dev**

---

### Alternative Deployment Options

#### Vercel
```bash
npm i -g vercel
vercel
```

#### Netlify
```bash
npm run build
# Deploy the ./out folder
```

---

## Performance

Lighthouse targets:
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

Key optimizations:
- Next.js App Router with server components for initial HTML
- `next/font` for zero-CLS font loading
- `prefers-reduced-motion` respected for all animations
- `loading="lazy"` on below-fold images
- Gzip + Brotli via Next.js built-in compression

---

## License

MIT — feel free to use as a template with attribution.
