# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # Start development server (port 3000)
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Architecture

**Stack**: Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4.1

**Structure**:
- `/src/app` - Next.js App Router pages and layouts
- `/src/components/ui` - Primitive UI components (shadcn-inspired, using @base-ui/react + CVA)
- `/src/components` - Page section components (Hero, Features, HowItWorks, etc.)
- `/src/lib/utils.ts` - Utility functions (cn for className merging)

**Page Composition**: The home page (`page.tsx`) is a vertical scroll journey composed of section components rendered against a fixed grid background with ambient glows.

## Key Patterns

**Component Styling**:
- CVA (class-variance-authority) for variant-based styling with size/variant props
- `data-slot` attributes on UI components for CSS targeting and composition identification
- oklch color space via CSS variables for theming (light/dark modes)
- Glassmorphism effects: `bg-white/[0.02] backdrop-blur-sm border-white/[0.05]`

**Visual Effects**:
- Gradient text: `bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent`
- Animated glow orbs with `blur-[100px]` and `animate-pulse`
- Hover transitions typically 300-500ms duration
- Decorative elements use `pointer-events-none`

**Responsive Design**:
- Mobile-first approach
- Breakpoints: `md:` (768px), `lg:` (1024px)
- Grid layouts: `grid md:grid-cols-2 lg:grid-cols-3`

**Import Aliases**:
- `@/components`, `@/lib`, `@/ui`, `@/hooks` → `./src/*`

## Form Components

The Field component (`/components/ui/field.tsx`) handles complex form layouts with:
- Orientation variants (vertical/horizontal/responsive)
- Error deduplication and multiple display modes
- Accessible fieldset/legend semantics
- Client component (`'use client'`)

## > [!IMPORTANT]
- Use /frontend-design skill for fronted always
- only change the minimum amount required to implement the most effective solution

## Technologies

- **UI**: @radix-ui primitives (24+ components), @base-ui/react, lucide-react icons
- **Forms**: react-hook-form + zod validation
- **Styling**: tailwind-merge, clsx, tw-animate-css
- **Fonts**: Geist, Geist Mono, Source Serif 4 (via next/font)
