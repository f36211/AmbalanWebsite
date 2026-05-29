# Ambalan SMAIT Ummul Quro — Developer Documentation

> Official website for Ambalan Pramuka SMAIT Ummul Quro Bogor.  
> Built with React 19 + Vite + Tailwind CSS v4 + Framer Motion.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Routing](#routing)
- [Component Guide](#component-guide)
- [Hooks](#hooks)
- [Data & CMS](#data--cms)
- [Styling & Design System](#styling--design-system)
- [Assets](#assets)
- [Build & Deployment](#build--deployment)
- [Performance Optimizations](#performance-optimizations)
- [Common Patterns](#common-patterns)
- [Adding New Pages](#adding-new-pages)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

```bash
# Prerequisites: Node.js >= 20.x, npm >= 10.x

# Install dependencies
npm install

# Start development server
npm run dev          # → http://localhost:5173

# Build for production
npm run build        # → output in dist/

# Preview production build
npm run preview
```

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.x | UI library |
| **Vite** | 7.x | Build tool & dev server |
| **Tailwind CSS** | 4.x (via `@tailwindcss/vite`) | Utility-first styling |
| **Framer Motion** | `motion` 12.x | Animations & transitions |
| **React Router** | 7.x | Client-side routing |
| **Lucide React** | 0.536.x | Icon library |
| **Sanity.io** | Client 7.x | Headless CMS for dynamic content |
| **Netlify** | — | Hosting & CDN |

### Dev-only Dependencies

| Package | Purpose |
|---------|---------|
| `vite-plugin-image-optimizer` | Compresses images during build |
| `tw-animate-css` | Tailwind animation utilities |
| `eslint` + plugins | Code linting |

---

## Project Structure

```
AmbalanWebsite/
├── public/
│   ├── images/                    # Static image assets
│   │   ├── landing/               # Hero section backgrounds & effects
│   │   ├── logo/                  # Organization logos (WebP)
│   │   ├── Foto/                  # Activity & alumni photos
│   │   ├── materi/                # Educational material images
│   │   │   └── simpulpramuka/     # Knot tutorial diagrams
│   │   ├── seragam/               # Uniform photos
│   │   └── imags/                 # Miscellaneous images
│   └── favicon/                   # Favicon files
│
├── src/
│   ├── App.jsx                    # Root component — routes & layout
│   ├── App.css                    # Tailwind theme tokens
│   ├── main.jsx                   # React DOM entry point
│   ├── index.css                  # Base CSS imports
│   │
│   ├── components/
│   │   ├── Hero/                  # Homepage-critical components
│   │   │   ├── Hero.jsx           # Hero section with parallax & animations
│   │   │   ├── Navigation.jsx     # Global navigation bar
│   │   │   ├── Footer.jsx         # Site footer
│   │   │   ├── LeadershipHistory.jsx  # Timeline of leadership periods
│   │   │   ├── GlobalStyles.jsx   # Injected global CSS overrides
│   │   │   ├── Search.jsx         # Global search overlay
│   │   │   ├── Stats.jsx          # Statistics section
│   │   │   └── ThemeSwitcher.jsx  # Dark mode toggle (WIP)
│   │   │
│   │   ├── ui/                    # Shared UI primitives
│   │   │   ├── Breadcrumb.jsx     # Route breadcrumbs
│   │   │   ├── LoadingScreen.jsx  # Initial page loader with video
│   │   │   ├── ImageLightbox.jsx  # Full-screen image viewer with zoom/pan
│   │   │   └── navigation-menu.jsx # Radix navigation menu wrapper
│   │   │
│   │   ├── admin/                 # Admin panel (lazy-loaded)
│   │   │   └── AdminApp.jsx       # CMS management interface
│   │   │
│   │   ├── MateriPreview.jsx      # Homepage materi section teaser
│   │   ├── MateriPramuka.jsx      # Main learning hub (all materials)
│   │   ├── SejarahPramuka.jsx     # Scout history interactive timeline
│   │   ├── SimpulIkatan.jsx       # Knots & bindings tutorial
│   │   ├── SandiPramuka.jsx       # Scout codes (placeholder)
│   │   ├── Peta.jsx               # Maps & navigation (placeholder)
│   │   ├── TokohPramuka.jsx       # Scout figures (placeholder)
│   │   ├── FaktaJambore.jsx       # Jamboree facts (placeholder)
│   │   ├── SeragamPramuka.jsx     # Uniform gallery carousel
│   │   ├── TentangKami.jsx        # About us page
│   │   ├── FotoKegiatan.jsx       # Activity photos gallery
│   │   ├── FotoPurnaAmbalan.jsx   # Alumni photos gallery
│   │   ├── StrukturOrganisasi.jsx # Org structure visualization
│   │   ├── Achievements.jsx       # Awards & achievements
│   │   ├── AchievementBadges.jsx  # Badge components
│   │   └── filosofi.jsx           # Logo philosophy page
│   │
│   ├── hooks/
│   │   ├── useScrollAndAnimation.js  # Scroll-triggered visibility & animations
│   │   └── useWindowSize.js          # Debounced window dimensions
│   │
│   ├── data/
│   │   ├── index.js               # Leadership data, static content
│   │   ├── searchData.js          # Search index for global search
│   │   └── achievementsData.js    # Achievements/awards data
│   │
│   ├── sanity/
│   │   ├── client.js              # Sanity client configuration
│   │   └── schemas/               # Sanity content type schemas
│   │
│   ├── lib/                       # Utility functions (clsx, cn)
│   └── assets/                    # Vite-processed static assets
│
├── vite.config.js                 # Vite build configuration
├── netlify.toml                   # Netlify deploy config & headers
├── FIXES.md                       # Known fixes & workarounds log
└── package.json
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   App.jsx                       │
│   ┌──────────┐  ┌──────────┐  ┌──────────────┐ │
│   │Navigation│  │  Routes  │  │   Footer     │ │
│   └──────────┘  └─────┬────┘  └──────────────┘ │
│                       │                         │
│         ┌─────────────┼─────────────┐           │
│         ▼             ▼             ▼           │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│   │   Home   │  │  Lazy    │  │  Lazy    │     │
│   │ (eager)  │  │  Routes  │  │  Routes  │     │
│   └──┬───────┘  └──────────┘  └──────────┘     │
│      │                                          │
│  ┌───┼──────────────┐                           │
│  │ Hero │ TentangKami │ MateriPreview │ Leader.. │
│  └──────────────────┘                           │
└─────────────────────────────────────────────────┘
```

### Key Patterns

1. **Code Splitting**: All non-homepage routes use `React.lazy()` + `<Suspense>` for on-demand loading
2. **Eager Load**: Only homepage-critical components (Hero, Navigation, Footer, TentangKami, MateriPreview, LeadershipHistory) are in the main bundle
3. **Error Boundary**: Wraps the entire app; catches rendering errors with a friendly recovery UI
4. **Scroll-triggered Animations**: `useScrollAndAnimation` hook + `IntersectionObserver` powers visibility-based animations

---

## Routing

All routes are defined in `App.jsx`. Each route wraps its component in either `PageWrapper` (standard) or `FullSizeWrapper` (full-width).

| Path | Component | Type | Description |
|------|-----------|------|-------------|
| `/` | `Home` | Eager | Landing page with Hero, About, Materi Preview, Leadership |
| `/tentang-kami` | `TentangKami` | Lazy | About the organization |
| `/struktur-organisasi` | `StrukturOrganisasi` | Lazy, Full | Org chart visualization |
| `/foto-kegiatan` | `FotoKegiatan` | Lazy | Activity photo gallery |
| `/foto-purna-ambalan` | `FotoPurnaAmbalan` | Lazy | Alumni photo gallery |
| `/seragam` | `SeragamPramuka` | Lazy | Uniform guide carousel |
| `/materi-pramuka` | `MateriPramuka` | Lazy, Full | Learning material hub |
| `/sejarah-pramuka` | `SejarahPramuka` | Lazy | Interactive history timeline |
| `/simpul-ikatan` | `SimpulIkatan` | Lazy | Knots & bindings with lightbox |
| `/sandi-pramuka` | `SandiPramuka` | Lazy | Scout codes (placeholder) |
| `/peta` | `Peta` | Lazy | Maps & navigation (placeholder) |
| `/tokoh-pramuka` | `TokohPramuka` | Lazy | Scout figures (placeholder) |
| `/fakta-jambore` | `FaktaJambore` | Lazy | Jamboree facts (placeholder) |
| `/filosofi` | `Filosofi` | Lazy, Full | Logo philosophy |
| `/achievements` | `Achievements` | Lazy, Full | Awards & achievements |
| `/admin` | `AdminApp` | Lazy | CMS admin panel |
| `*` | 404 Page | — | Not found fallback |

### Adding a New Route

1. Create your component in `src/components/YourComponent.jsx`
2. Add a lazy import at the top of `App.jsx`:
   ```jsx
   const YourComponent = React.lazy(() => import("./components/YourComponent"));
   ```
3. Add a `<Route>` inside the `<Routes>` block:
   ```jsx
   <Route path="/your-path" element={<RouteComponent Component={YourComponent} />} />
   ```
4. Add the title mapping in `routeTitles`
5. Add the route to `Navigation.jsx` menu items

---

## Component Guide

### Hero Section (`Hero/Hero.jsx`)

The hero is the most complex component, featuring:

- **Parallax background** that shifts with scroll (disabled on mobile)
- **Floating particles** (count adapts to screen size via `useWindowSize`)
- **Animated background layers** with pulsing lights
- **Interactive logos** — clicking on desktop opens a full-page modal
- **Responsive layout** — completely different layouts for mobile vs desktop

Key sub-components:
- `FloatingParticles` — Ambient particle animations
- `AnimatedBackground` — Multi-layer parallax background
- `LogoModal` — Full-screen reveal with clip-path animation

### Navigation (`Hero/Navigation.jsx`)

Responsive navigation with:
- Transparent header → solid on scroll (controlled by `isScrolled`)
- Desktop: Full horizontal menu with dropdowns
- Mobile: Slide-out hamburger menu
- Global search integration
- Auto-hides during modals (`isModalOpen` prop)

### Learning Material Pages

| Component | Status | Features |
|-----------|--------|----------|
| `SimpulIkatan` | ✅ Complete | Image lightbox, collapsible steps, search/filter, grid layout |
| `SejarahPramuka` | ✅ Complete | Interactive timeline, scroll-to navigation, era filtering |
| `MateriPramuka` | ✅ Complete | Card grid, search, pagination, dynamic CMS content |
| `SeragamPramuka` | ✅ Complete | Image carousel with touch gestures, keyboard navigation |
| `SandiPramuka` | 🚧 Placeholder | Coming soon page |
| `Peta` | 🚧 Placeholder | Coming soon page |
| `TokohPramuka` | 🚧 Placeholder | Coming soon page |
| `FaktaJambore` | 🚧 Placeholder | Coming soon page |

### Shared UI Components (`ui/`)

| Component | Description |
|-----------|-------------|
| `ImageLightbox` | Full-screen image viewer with zoom, pan, double-click zoom, keyboard controls, and touch support |
| `LoadingScreen` | Video-based loader for initial page load |
| `Breadcrumb` | Automatic route-based breadcrumbs |
| `navigation-menu` | Radix-based accessible dropdown menu |

---

## Hooks

### `useScrollAndAnimation`

Located in `src/hooks/useScrollAndAnimation.js`.

Manages scroll-triggered visibility for animated elements.

```jsx
// Usage:
const { isVisible, isScrolled } = useScrollAndAnimation();

// isVisible: object mapping element IDs → boolean visibility
// isScrolled: boolean, true when page is scrolled past threshold

// In JSX, mark elements with data-animate and a unique id:
<div id="my-section" data-animate className={isVisible["my-section"] ? "visible" : ""}>
```

### `useWindowSize`

Located in `src/hooks/useWindowSize.js`.

Debounced (150ms) window dimensions with computed breakpoint helpers.

```jsx
// Usage:
const { width, height, isMobile, isTablet, isDesktop, screenSize, particleCount } = useWindowSize();

// screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
// particleCount: responsive particle count (8-20)
```

---

## Data & CMS

### Static Data (`src/data/`)

| File | Content |
|------|---------|
| `index.js` | Leadership history (periods array), navigation items |
| `searchData.js` | Searchable index for global search overlay |
| `achievementsData.js` | Awards and achievements data |

### Sanity CMS (`src/sanity/`)

The site uses **Sanity.io** as a headless CMS for dynamic content.

**Client config:** `src/sanity/client.js`
- Project ID and dataset configured via environment variables
- Exports `client` instance and `urlFor()` image URL builder

**CMS Content Types:**
- `leadershipHistory` — Historical leadership periods (used by `LeadershipHistory.jsx`)
- Activity photos, galleries (used by `FotoKegiatan.jsx`, `FotoPurnaAmbalan.jsx`)
- Learning materials (used by `MateriPramuka.jsx`)

**Fallback Pattern:** Components always have static fallback data in `src/data/`. If the Sanity fetch fails, the static data is used:

```jsx
const [data, setData] = useState(fallbackData);  // static default

useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await client.fetch(query);
      if (result?.length > 0) setData(result);
    } catch (error) {
      console.error("Fetch failed, using fallback:", error);
    }
  };
  fetchData();
}, []);
```

---

## Styling & Design System

### Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Maroon | `#5c0b08` | Primary headings, emphasis, hero accent |
| Warm Brown | `#903d04` | Buttons, links, icons, secondary accent |
| Gold | `#9c7502` | Decorative highlights, dividers, badges |
| Amber Yellow | `#f9ba02` | Timeline dots, badges, accents |

### Design Tokens

Defined in `App.css` using CSS custom properties with Tailwind's `@theme inline` directive. Supports light and dark modes via `.dark` class.

### Common UI Patterns

- **Cards**: `rounded-[2rem]` or `rounded-[2.5rem]` with `border border-orange-100 shadow-xl`
- **Buttons**: Gradient `bg-gradient-to-r from-[#5c0b08] to-[#903d04]` with `rounded-2xl`
- **Backgrounds**: Dot pattern overlay with `radial-gradient` at 3% opacity
- **Containers**: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
- **Animations**: Framer Motion `whileHover`, `whileInView`, spring transitions

---

## Assets

### Image Directories

| Directory | Contents | Format |
|-----------|----------|--------|
| `public/images/landing/` | Hero backgrounds, light effects | WebP |
| `public/images/logo/` | Organization logos (L2, L3, etc.) | WebP |
| `public/images/Foto/` | Activity photos | WebP/JPG |
| `public/images/materi/` | Educational diagrams | PNG |
| `public/images/seragam/` | Uniform photos | JPG |

### Important Notes

- Hero images are **preloaded** in `index.html` for fast first paint
- Below-fold images use `loading="lazy"` and `decoding="async"`
- Images are optimized at build time by `vite-plugin-image-optimizer`
- Logo files should be in **WebP** format (not PNG) for consistency

---

## Build & Deployment

### Vite Configuration (`vite.config.js`)

Key features:
- **Manual chunks** — Splits vendor code into 5 separate bundles (react, router, motion, icons, sanity)
- **CSS code splitting** — Route-specific CSS loaded on demand
- **Console stripping** — `console.log` and `debugger` removed in production
- **Image optimization** — Via `ViteImageOptimizer` plugin
- **Pre-bundling** — Common deps included in `optimizeDeps.include`

### Netlify Configuration (`netlify.toml`)

- **SPA routing** — All paths redirect to `index.html`
- **Sanity studio proxy** — `/studio/*` proxied to `ambalan.sanity.studio`
- **Cache headers**:
  - Hashed assets (`/assets/*`): 1 year, immutable
  - Images: 1 week
  - Videos: 1 week
  - Fonts: 1 year, immutable

### Build Output

```bash
npm run build

# Expected output structure:
dist/
├── index.html
└── assets/
    ├── index-*.js           # Core + homepage (~301 KB, ~93 KB gzip)
    ├── vendor-react-*.js    # React runtime (~12 KB)
    ├── vendor-router-*.js   # React Router (~33 KB)
    ├── vendor-motion-*.js   # Framer Motion (~63 KB)
    ├── vendor-icons-*.js    # Lucide icons (~20 KB)
    ├── vendor-sanity-*.js   # Sanity client (~1 KB)
    ├── SejarahPramuka-*.js  # Lazy chunk (~21 KB)
    ├── MateriPramuka-*.js   # Lazy chunk (~12 KB)
    ├── SimpulIkatan-*.js    # Lazy chunk (~11 KB)
    ├── ...                  # More lazy chunks (1-15 KB each)
    └── index-*.css          # All styles (~90 KB, ~13 KB gzip)
```

---

## Performance Optimizations

| Optimization | Implementation |
|-------------|----------------|
| **Code Splitting** | 15 route components lazy-loaded via `React.lazy()` |
| **Vendor Chunking** | 5 separate vendor bundles for optimal caching |
| **Image Preloading** | Critical hero images preloaded in `<head>` |
| **Lazy Loading** | Below-fold images use `loading="lazy"` |
| **Component Memoization** | `React.memo` on `MateriCard`, `TimelineCard`, `KnotCard` |
| **Debounced Resize** | Shared `useWindowSize` hook with 150ms debounce |
| **Console Stripping** | `console.log`/`debugger` removed in production |
| **Cache Headers** | Immutable hashing for JS/CSS, 1-week for images |
| **Animation Variants** | Static objects defined at module scope |

---

## Common Patterns

### Creating a New Learning Material Page

Follow the pattern established by `SimpulIkatan.jsx`:

```jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ImageLightbox from "./ui/ImageLightbox";

const YourMaterialPage = () => {
  const [lightbox, setLightbox] = useState({ isOpen: false, item: null });

  return (
    <div className="min-h-screen relative bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern (consistent across all materi pages) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #5c0b08 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Back Button (always link to /materi-pramuka) */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link to="/materi-pramuka" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl border border-orange-100 text-[#903d04] font-bold text-sm hover:bg-[#903d04] hover:text-white transition-all shadow-sm group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Materi
          </Link>
        </motion.div>

        {/* Header Section */}
        {/* ... your content ... */}
      </div>

      {/* If you have images that should be zoomable: */}
      <ImageLightbox
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox({ isOpen: false, item: null })}
        imageSrc={lightbox.item?.image || ""}
        imageAlt={lightbox.item?.title || ""}
        title={lightbox.item?.title || ""}
      />
    </div>
  );
};

export default YourMaterialPage;
```

### Placeholder Pages Pattern

For pages under development, follow this pattern (see `SandiPramuka.jsx`, `Peta.jsx`, etc.):

```jsx
<motion.div className="bg-white rounded-[3rem] shadow-2xl p-12 sm:p-20 border border-orange-100 flex flex-col items-center justify-center min-h-[500px] text-center">
  <div className="relative mb-10">
    <div className="absolute inset-0 bg-orange-200 blur-2xl opacity-20 animate-pulse" />
    <div className="relative w-24 h-24 rounded-full border-4 border-orange-50 border-t-[#903d04] animate-spin" />
  </div>
  <h3 className="text-2xl font-bold text-[#5c0b08] mb-4">Sedang Menyiapkan Konten</h3>
  <p className="text-gray-500 max-w-sm leading-relaxed">Your description here.</p>
</motion.div>
```

---

## Troubleshooting

### Video Playback Crash (Chrome)

Chrome limits `playbackRate` to a max of 16. The `LoadingScreen` video previously set rates above this, causing crashes. **Fix:** Rate is clamped — see `FIXES.md`.

### Sanity CMS Not Loading

- Check that `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` environment variables are set
- Verify the Sanity project is accessible at `ambalan.sanity.studio`
- The app falls back to static data from `src/data/index.js` if Sanity fails

### Build Fails with "motion" Import Error

The project uses the `motion` package (Framer Motion's new import name). If you see import errors, ensure `package.json` has `"motion"` (not `"framer-motion"`).

### Images Not Showing on Production

- Ensure images are in `public/` directory (not `src/assets/`)
- Check that paths start with `/` (absolute from public root)
- Verify `ViteImageOptimizer` isn't corrupting the files — check build output

### Styling Issues After Tailwind Update

This project uses **Tailwind CSS v4** with the `@tailwindcss/vite` plugin. The config is in `App.css` (not `tailwind.config.js`). Custom theme tokens use `@theme inline`.

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SANITY_PROJECT_ID` | Sanity project ID | Yes (for CMS content) |
| `VITE_SANITY_DATASET` | Sanity dataset name | Yes (for CMS content) |

---

*Last updated: May 2026*
