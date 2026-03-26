# 📱 Phone Case Configurator — React Template

A modern, fully responsive e-commerce phone case configurator built with React 19, Vite, Tailwind CSS 4, Zustand, and Framer Motion. Let your customers design custom phone cases with live preview, color/material selection, image upload, and text personalization.

![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-7-purple) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-teal) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)

---

## ✨ Features

- **Product Configurator** — color, material, frame selection with real-time preview
- **Image Upload** — upload custom images with scale, rotation, and positioning controls
- **Text Personalization** — add custom text with color and size options
- **Share Designs** — share configurations via URL (base64-encoded state)
- **Shopping Cart** — add to cart with pricing summary, quantity management
- **Checkout Flow** — complete checkout UI with address, shipping, and payment steps
- **User Accounts** — login/register modals with auth state management
- **13+ Pages** — Home, Gallery, Configurator, FAQ, About, Contact, Terms, Privacy, Returns, and more
- **Dark Mode** — built-in dark theme with CSS variables
- **Responsive Design** — fully optimized for mobile, tablet, and desktop
- **Smooth Animations** — Framer Motion powered transitions and micro-interactions
- **Polish UI** — all content in Polish (easily translatable)

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **Vite 7** | Build tool & dev server |
| **TypeScript 5.9** | Type safety (strict mode) |
| **Tailwind CSS 4** | Utility-first styling |
| **Zustand** | Lightweight state management |
| **Framer Motion** | Animations |
| **React Router 7** | Client-side routing with lazy loading |
| **Zod** | Schema validation |
| **Lucide React** | Icons |
| **Vitest** | Unit testing |
| **Prettier** | Code formatting |

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and add your tokens
cp .env.example .env

# 3. Start development server
npm run dev

# 4. Build for production
npm run build

# 5. Run tests
npm test

# 6. Format code
npm run format
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check & build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm test` | Run tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run format` | Format code with Prettier |

---

## 📁 Project Structure

```
src/
├── pages/              # All page components (13 pages)
├── components/
│   ├── layout/         # Navbar, Footer, HeroSection, RootLayout
│   ├── configurator/   # ColorPicker, ConfigPanel, ImageUploader, MaterialPicker,
│   │                     OptionSelector, PriceSummary, ProductPreview, ShareModal
│   ├── auth/           # LoginModal, UserMenu
│   ├── cart/           # CartDrawer, CartIcon
│   └── ui/             # Button, Card, Magnetic (reusable primitives)
├── stores/             # Zustand stores (auth, cart, configurator)
├── hooks/              # Custom hooks (useImagePreloader, useUrlSync)
├── lib/                # Pricing logic, URL state management, utilities
├── types/              # TypeScript interfaces
├── data/               # Product definitions, phone models, dimensions
├── assets/             # Static assets
├── index.css           # Tailwind config & CSS custom properties
├── App.tsx             # Router setup
└── router.tsx          # Route definitions
```

---

## 🎨 Customization Guide

### 1. Brand & Company Info (start here!)

All placeholder data ("YourBrand", emails, phone, address, NIP) is centralized in a single file:

```
src/site.config.ts
```

Open it and replace the values with your own. The config is used across the entire app — Navbar, Footer, legal pages, auth, contact info, etc.

### 2. Logo
- Update the `BrandLogo` SVG component in `src/components/layout/Navbar.tsx` and `Footer.tsx`
- Replace `public/favicon.svg` with your own favicon

### 3. SEO & Meta Tags
- Update `index.html` — title, meta description, Open Graph image URL, canonical URL
- Update `public/sitemap.xml` — replace `yourbrand.pl` with your domain
- Update `public/robots.txt` — same

### 4. Colors & Theme
- Edit CSS variables in `src/index.css` (uses OKLCH color space)
- Change primary, secondary, accent, background, foreground, etc.

### 5. Products & Pricing
- Edit products in `src/data/products/phoneCase.ts`
- Add phone models in `src/data/phones.json`
- Pricing logic in `src/lib/pricing.ts`

### 6. Content & Texts
- All page content is in `src/pages/*.tsx`
- Legal pages (Terms, Privacy, Returns) pull company data from `site.config.ts`

### 7. Analytics
- Uncomment the Google Analytics block in `index.html` and add your measurement ID

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_LOGO_DEV_TOKEN` | API token for Logo.dev CDN (brand logos) |

Copy `.env.example` to `.env` and fill in your values.

---

## 📄 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with hero, features |
| `/configure` | Select Phone | Choose phone model |
| `/configure/editor` | Configurator | Design your case |
| `/gallery` | Gallery | Browse designs |
| `/how-it-works` | How It Works | Step-by-step guide |
| `/about` | About | Company story |
| `/faq` | FAQ | Questions & answers |
| `/contact` | Contact | Contact form |
| `/checkout` | Checkout | Order flow |
| `/account` | Account | User dashboard |
| `/ready-cases` | Category | Pre-made cases |
| `/tempered-glass` | Category | Glass protectors |
| `/hydrogel-films` | Category | Hydrogel films |

---

## ⚠️ Important Notes

- **No backend included** — auth is mock-based (demo user), checkout has no payment processor. Connect your own API.
- **Demo credentials** — configured in `src/site.config.ts` (default: `demo@yourbrand.pl` / `demo123`)
- **All data is client-side** — stored in localStorage via Zustand persist middleware.
- **Polish language** — all UI text is in Polish. For multi-language support, consider adding `react-i18next`.
- **Error Boundary** — global error boundary is included in `src/components/ErrorBoundary.tsx`.
- **Lazy loading** — secondary pages are code-split with `React.lazy()` for faster initial load.

---

## 📝 License

This template is licensed for use in a single project. See [LICENSE](LICENSE) for details.
