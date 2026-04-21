# Just Website — Premium Agency Landing Page Design Spec

**Date:** 2026-04-21  
**Status:** Approved  
**Author:** Claude (brainstorming skill)

---

## Goal

Build a single-page premium animated agency landing page for "Just Website" — light-mode, mouse-reactive hero, scroll-driven storytelling, feature-folder architecture.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| Component Animations | Framer Motion |
| Scroll Animations | GSAP + ScrollTrigger |
| Smooth Scroll | Lenis |
| UI Primitives | shadcn/ui + Radix UI |
| Premium Components | Aceternity UI |
| Class Utilities | clsx + tailwind-merge |
| Viewport Triggers | react-intersection-observer |
| Icons | Lucide React |
| Fonts | Geist (headings) + Inter (body) via next/font |

---

## Design Tokens

```css
/* Backgrounds */
--bg-base:     #F7F8FA;
--bg-surface:  #FFFFFF;
--bg-elevated: #F1F3F6;
--bg-dark:     #0F172A;

/* Text */
--text-primary:   #0F172A;
--text-secondary: #475569;
--text-muted:     #94A3B8;

/* Accents */
--accent-lavender: #7C6EFF;
--accent-cyan:     #14B8A6;
--accent-coral:    #F97373;

/* Glass */
--glass-light: rgba(255,255,255,0.6);
--glass-border: rgba(255,255,255,0.2);
```

Typography scale:
- H1: 72–96px, Geist, weight 700, tight leading
- H2: 48–56px, Geist, weight 600
- H3: 28–32px, Geist, weight 600
- Body: 16–18px, Inter, weight 400
- Eyebrow: 12px, Inter, weight 600, letter-spacing 0.15em, uppercase

Easing constants (shared across all animations):
```ts
EASE_OUT_EXPO  = [0.16, 1, 0.3, 1]      // snappy entries
EASE_IN_OUT    = [0.4, 0, 0.2, 1]       // transitions
EASE_SPRING    = { type: "spring", stiffness: 100, damping: 20 }
```

---

## Architecture — Feature-Folder (Option C)

```
src/
  app/
    layout.tsx               # Root layout: Lenis init, GSAP ScrollTrigger sync, font vars
    page.tsx                 # Assembles all sections in order
    globals.css              # Design tokens as CSS vars, Tailwind base layer

  components/
    ui/                      # Atomic UI: Button, Badge, Input, Textarea, Card (shadcn + custom)
      Button.tsx
      Badge.tsx
      GlassCard.tsx          # Reusable glass-morphism card
      MagneticButton.tsx     # Hover magnetic effect wrapper
      MarqueeStrip.tsx       # Continuous horizontal scroll strip

    layout/
      Navbar.tsx             # Floating pill navbar with scroll shrink
      Footer.tsx             # Minimal footer

    sections/
      hero/
        index.tsx               # HeroSection — assembles canvas + content
        HeroCanvas.tsx          # Full-viewport canvas: particles + gradient orbs
        HeroContent.tsx         # Headline, subline, CTAs, scroll indicator
        useParticlePhysics.ts   # Particle system: init, update, mouse repulsion (canvas-local)
        constants.ts            # PARTICLE_COUNT, ORB_COLORS, REPULSION_RADIUS

      services/
        index.tsx            # ServicesSection — grid layout + scroll trigger
        ServiceCard.tsx      # Individual card: icon, title, desc, arrow
        useServicesAnimation.ts  # Stagger entry via GSAP ScrollTrigger
        constants.ts         # SERVICE_ITEMS array

      work/
        index.tsx            # WorkSection — dark bg, stacked case studies
        CaseStudyCard.tsx    # Full-bleed card with hover overlay
        useWorkAnimation.ts  # ScrollTrigger slide-in per card
        constants.ts         # CASE_STUDIES array

      about/
        index.tsx            # AboutSection — sticky story + stats + marquee
        StoryBlock.tsx       # Left col: 3 scroll-triggered paragraphs
        StatCards.tsx        # Right col: animated stat numbers
        useAboutAnimation.ts # Pin + stagger via ScrollTrigger
        constants.ts         # STATS, STORY_PARAGRAPHS, TECH_LOGOS

      contact/
        index.tsx            # ContactSection — dark bg, form UI only
        ContactForm.tsx      # shadcn Input + Textarea + Button, no backend

  lib/
    animations/
      gsap.ts              # GSAP + ScrollTrigger registration, shared helpers
      lenis.ts             # Lenis instance creation + RAF loop
      variants.ts          # Shared Framer Motion variants (fadeUp, stagger, etc.)
      easings.ts           # Easing constant exports

    hooks/
      useMousePosition.ts  # Global mouse position tracker (used by hero)
      useScrollProgress.ts # 0–1 scroll progress for a ref element
      useInView.ts         # Thin wrapper over react-intersection-observer
```

**Boundaries:**
- Animation logic never lives in JSX — always in co-located `use*.ts` hooks
- GSAP owns scroll-driven animations; Framer Motion owns component-level (hover, entry, microinteractions)
- Lenis is initialized once in `layout.tsx` and exposed via context; GSAP ScrollTrigger is synced to Lenis' scroll events

---

## Section Specs

### 1. Navbar

**File:** `components/layout/Navbar.tsx`

- Floating pill, centered horizontally, `position: fixed`, top 20px
- Default: `backdrop-filter: blur(16px); background: rgba(247,248,250,0.8); border: 1px solid rgba(255,255,255,0.3)`
- On scroll past 80px: pill shrinks padding, shadow deepens — GSAP ScrollTrigger scrub
- Logo: "Just Website" wordmark, Geist Bold, left side
- Links: "Work", "Services", "About", "Contact" — center, Inter Medium
- Link hover: lavender underline slides in from left (CSS pseudo-element, transition 0.3s)
- CTA button right: "Get Started" — lavender fill, glow on hover (`box-shadow: 0 0 20px rgba(124,110,255,0.4)`)
- Framer Motion: `initial={{ y: -80, opacity: 0 }}` → `animate={{ y: 0, opacity: 1 }}` on mount, 0.6s EASE_OUT_EXPO

---

### 2. Hero Section

**Files:** `components/sections/hero/`

#### Canvas Background (`HeroCanvas.tsx` + `useParticles.ts`)

**Particles:**
- Count: 60 particles
- Colors: `#7C6EFF` (lavender), `#14B8A6` (cyan), `#F97373` (coral) — random assignment
- Opacity: 0.06–0.12 per particle
- Size: 2–5px radius
- Each particle has `vx`, `vy` velocity, drifts slowly
- Mouse interaction: within `REPULSION_RADIUS = 150px`, particles are pushed away — force = `(1 - dist/radius) * 2.5`, applied to velocity, velocity decays by 0.96 per frame
- Particles wrap around edges (toroidal)

**Gradient Orbs:**
- Two `<div>` elements (not canvas), absolutely positioned
- Orb 1: 600×600px, `radial-gradient(circle, rgba(124,110,255,0.08), transparent)`, starts top-left, drifts to cursor at 8% lerp speed
- Orb 2: 500×500px, `radial-gradient(circle, rgba(20,184,166,0.08), transparent)`, starts bottom-right, drifts at 5% lerp speed
- CSS `filter: blur(80px)` on each orb

#### Hero Content (`HeroContent.tsx`)

Layout: centered, `min-height: 100vh`, flex column center.

Glass card wrapping text:
```css
backdrop-filter: blur(12px);
background: rgba(255,255,255,0.55);
border: 1px solid rgba(255,255,255,0.4);
border-radius: 24px;
padding: 48px 64px;
```

Content with Framer Motion stagger container:
1. **Eyebrow:** `"Digital Agency"` — Badge component, muted text, delay 0
2. **H1 line 1:** `"We build things"` — word-by-word stagger, each word: `translateY: 40 → 0, opacity: 0 → 1`, 0.05s between words, delay 0.1s
3. **H1 line 2:** `"that just work."` — same stagger, delay 0.4s, `"work."` gets lavender color
4. **Subline:** `"Premium design & engineering for brands that mean it."` — fade in after heading, delay 0.9s
5. **CTA row:**
   - Primary: `MagneticButton` wrapping filled lavender button — `"See Our Work"`, glow on hover
   - Ghost: bordered button `"Get in Touch"` — border animates `#94A3B8 → #7C6EFF` on hover
   - Delay 1.1s, slide up
6. **Scroll indicator:** animated chevron-down icon, opacity pulse (0.4→0.8→0.4, 2s loop), `"scroll"` label in muted text

---

### 3. Services Section

**Files:** `components/sections/services/`

Background: `#F7F8FA`. Full width, `padding: 120px 0`.

**Section heading:**
- Eyebrow: `"What We Do"`
- H2: `"Services built for`  
  `modern brands."` — second line in lavender
- Reveal: ScrollTrigger, `y: 40 → 0`, `opacity: 0 → 1`, triggered at 80% viewport

**Grid:** `display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px` (collapses to 2-col mobile)

**ServiceCard:**
```
GlassCard base (white bg, subtle border, 16px border-radius)
  Icon (Lucide, 32px, lavender color, inside 56px rounded bg square)
  Title (H3, 20px, Geist SemiBold)
  Description (2 lines, Inter, text-secondary)
  "Learn more →" link (muted → lavender on hover, arrow slides right 4px)
```

Hover state:
- `translateY: 0 → -4px` (Framer Motion spring)
- Border: `rgba(0,0,0,0.06) → rgba(124,110,255,0.3)` transition
- Icon bg: lavender tint deepens

**Four services (from `constants.ts`):**
1. Creative Direction — `Lightbulb` icon — "We shape ideas into visual narratives that command attention."
2. UI/UX Design — `Layers` icon — "Interfaces that feel inevitable. Designed for humans, optimized for metrics."
3. Web Engineering — `Code2` icon — "Production-grade Next.js applications. Fast, accessible, bulletproof."
4. Motion & Animation — `Sparkles` icon — "GSAP, Framer Motion, and raw canvas — breathing life into pixels."

**Stagger animation (`useServicesAnimation.ts`):**  
ScrollTrigger on grid container: each card staggers with `gsap.fromTo`, `y: 50 → 0, opacity: 0 → 1`, `stagger: 0.12s`, `ease: "expo.out"`, triggered at `start: "top 75%"`.

---

### 4. Work / Case Studies Section

**Files:** `components/sections/work/`

Background: `#0F172A` (dark). `padding: 120px 0`.

**Section heading:**
- Eyebrow: `"Selected Work"` — in muted white
- H2: `"Projects that`  
  `move the needle."` — white, second line in cyan `#14B8A6`

**Layout:** Vertically stacked cards, max-width 900px, centered.

**CaseStudyCard (`CaseStudyCard.tsx`):**
```
height: 420px
border-radius: 20px
overflow: hidden
position: relative

Background: gradient mockup (each unique gradient using accent colors)
Content overlay (bottom 40%):
  - Category badge (glass pill)
  - Client name (H3, white)
  - Outcome line (body, muted white)
  - "View Case →" — hidden by default, slides up on hover

Hover:
  - image/bg: scale 1.05 (Framer Motion, spring)
  - dark overlay: opacity 0.3 → 0.6
  - "View Case →" slides up from bottom
```

**Three case studies (from `constants.ts`):**
1. Helix — Brand Identity — "Redesigned visual system; 40% increase in brand recall."  
   Gradient: `linear-gradient(135deg, #7C6EFF 0%, #14B8A6 100%)`
2. Orbit — Web Platform — "0 → 100k users in 6 months post-launch."  
   Gradient: `linear-gradient(135deg, #0F172A 0%, #7C6EFF 60%, #F97373 100%)`
3. Pulse — Motion System — "Component library with 200+ animated primitives."  
   Gradient: `linear-gradient(135deg, #14B8A6 0%, #0F172A 100%)`

**Scroll animation (`useWorkAnimation.ts`):**  
Each card: `gsap.fromTo(card, { y: 80, opacity: 0 }, { y: 0, opacity: 1, scrollTrigger: { trigger: card, start: "top 85%", ease: "expo.out" } })`

---

### 5. About Section

**Files:** `components/sections/about/`

Background: `#F7F8FA`. `padding: 120px 0`.

**Two-column layout:** `grid-template-columns: 1fr 1fr; gap: 80px; align-items: start`.

**Left column — `StoryBlock.tsx`:**
- Sticky: `position: sticky; top: 120px`
- Eyebrow: `"About Us"`
- H2: `"We obsess over`  
  `craft."`
- Three paragraphs, each revealed independently on scroll:
  1. "Just Website was born from a simple belief — the web should be beautiful and fast. We've spent years mastering the tools that make that possible."
  2. "We work with a small number of clients at a time. Not because we can't scale, but because we refuse to compromise on quality."
  3. "Every project ships with production-grade code, obsessive attention to detail, and zero excuses."

Each paragraph: `gsap.fromTo(p, { opacity: 0, y: 20 }, { opacity: 1, y: 0, scrollTrigger: { trigger: p, start: "top 80%" } })`

**Right column — `StatCards.tsx`:**
- Three stat cards stacked with 16px gap
- Each card: `GlassCard` (white bg, border, shadow)
  - Large number (H2 size, lavender, Geist Bold) — counter animates 0 → target on entry
  - Label below (Inter, text-secondary)
- Stats: `12+` Years Experience / `80+` Projects Shipped / `4.9★` Average Rating
- Entry: stagger via Framer Motion, `translateY: 30 → 0`, 0.15s between cards

**Bottom — `MarqueeStrip.tsx`:**
- Full-width continuous horizontal scroll strip
- Background: `#F1F3F6` band
- Content: tech logo names as styled text pills: `Next.js · Figma · GSAP · Framer Motion · TypeScript · Tailwind · Radix UI · Vercel`
- Duplicated for seamless loop
- CSS `animation: marquee 20s linear infinite`
- On hover: pauses animation

---

### 6. Contact Section

**Files:** `components/sections/contact/`

Background: `#0F172A`. `padding: 160px 0`. Centered layout.

**Content:**
- Eyebrow: `"Get In Touch"` — muted white
- H2: `"Let's build`  
  `something great."` — white, `"great."` in coral `#F97373`
- Subline: `"Tell us about your project. We read every message."` — muted white

**ContactForm (`ContactForm.tsx`):**
- Max-width: 560px, centered
- Fields (shadcn): Name, Email, Message (Textarea, 4 rows)
- Field styling: dark surface bg (`rgba(255,255,255,0.05)`), white text, border `rgba(255,255,255,0.1)` → lavender on focus
- Submit button: full-width, lavender fill, `"Send Message"`, glow on hover (`box-shadow: 0 0 32px rgba(124,110,255,0.5)`)
- No backend wiring — UI only

**Framer Motion:** Entire form fades up on entry, fields stagger 0.1s apart.

---

### 7. Footer

**File:** `components/layout/Footer.tsx`

Background: `#0A0F1E` (deeper dark). `padding: 40px 0`.  
Two columns: left — `"Just Website"` wordmark + `"© 2026"`. Right — social links (Twitter/X, GitHub, LinkedIn) as icon buttons with hover glow.  
Top border: `1px solid rgba(255,255,255,0.06)`.

---

## Animation System Summary

| Trigger | Library | What |
|---|---|---|
| Page load / mount | Framer Motion | Navbar slide-down, Hero stagger |
| Mouse move | Canvas API + rAF | Particle repulsion, orb follow |
| Scroll enter (one-shot) | GSAP ScrollTrigger | Services stagger, Work cards, About paragraphs |
| Hover | Framer Motion | Card lift, button glow, link underline |
| Scroll progress | GSAP ScrollTrigger scrub | Navbar shrink |
| Continuous | CSS animation | Marquee strip |

**Lenis ↔ GSAP sync (`lib/animations/lenis.ts`):**
```ts
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

**GPU acceleration:** All animated properties restricted to `transform` and `opacity` — no layout-triggering properties animated.

---

## Responsive Breakpoints

| Breakpoint | Change |
|---|---|
| `< 768px` | Services grid: 1-col; Hero text smaller; Navbar links hidden → hamburger menu (shadcn `Sheet`, no animation required in v1) |
| `768–1024px` | Services grid: 2-col; About: single column |
| `> 1024px` | Full layout as designed |

---

## Performance Constraints

- Particle canvas: capped at 60fps with `requestAnimationFrame`, skips frame if tab hidden
- GSAP instances cleaned up in `useEffect` return (ScrollTrigger.kill)
- Framer Motion `LazyMotion` with `domAnimation` feature bundle only
- All section components wrapped in `React.memo` where props are stable
- Fonts: `display: swap`, preloaded in `<head>`
