# Agent.md

> This document provides context for AI agents working on this codebase.

## Project Overview

Personal website and blog of **Maxence Poutord** ([maxpou.fr](https://www.maxpou.fr)), built with Astro. The site includes a blog, portfolio, recipes section, CV page, and several interactive apps (calculators).

## Tech Stack

- **Framework**: [Astro](https://astro.build/) v5 with SSG (Static Site Generation)
- **UI Libraries**: Preact for interactive components (`.tsx` files)
- **Styling**: Tailwind CSS v4 with `@tailwindcss/typography` plugin
- **Content**: Astro Content Collections with MDX support
- **Code Highlighting**: `astro-expressive-code` (Material Theme Palenight)
- **Linting/Formatting**: Biome
- **Language**: TypeScript

## Project Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable Astro and Preact components
│   ├── icons/       # Icon components (JSX)
│   └── MDX/         # Custom MDX components (Info, Warning, Danger blocks)
├── content/         # Content collections
│   ├── blog/        # Blog posts organized by year (e.g., blog/2024/)
│   ├── pages/       # Static pages (about, speaking, uses)
│   └── recipes/     # Recipe collection (auto-imported from Notion)
├── layouts/         # Page layouts (BlogPost.astro)
├── pages/           # Route pages
│   ├── apps/        # Interactive calculator apps
│   ├── blog/        # Blog routes with pagination
│   ├── og/          # Dynamic OG image generation
│   ├── recipes/     # Recipe routes
│   └── tags/        # Tag pages
├── styles/          # Global CSS
└── utils/           # Utility functions
```

## Commands

| Command                | Description                           |
| ---------------------- | ------------------------------------- |
| `npm start` / `npm run dev` | Start dev server                  |
| `npm run build`        | Type-check and build for production   |
| `npm run preview`      | Preview production build              |
| `npm run format`       | Format code with Biome                |
| `npm run deploy`       | Build and deploy to GitHub Pages      |
| `npm run import-recipes` | Import recipes from Notion          |

## Content Collections

### Blog Posts (`src/content/blog/`)

Organized by year in folders like `2024/2024-01-15-post-slug/`. Each post folder contains:
- `index.md` or `index.mdx` - Post content
- `cover.jpeg` (or `.jpg`/`.png`) - Cover image

**Frontmatter schema:**
```yaml
title: string          # Required
date: date             # Required (YYYY-MM-DD)
cover: image           # Required (relative path to image)
tags: string[]         # Required (e.g., ['JavaScript', 'Testing'])
description: string    # Optional
language: string       # Optional (e.g., 'fr' for French)
modified: date         # Optional (last update date)
unlisted: boolean      # Optional (hide from listings)
featured: boolean      # Optional
translations:          # Optional (links to translated versions)
  - link: string
    language: string
    hreflang: string
```

### Pages (`src/content/pages/`)

Static content pages (about, uses, speaking).

### Recipes (`src/content/recipes/`)

Auto-generated from Notion via `npm run import-recipes`. Do not edit manually.

## Code Style & Conventions

### Biome Configuration

- **Indent**: Spaces (2)
- **Semicolons**: As needed (no trailing semicolons)
- **Quotes**: Single quotes
- **Arrow functions**: Parentheses as needed

### Component Conventions

- **Astro components** (`.astro`): Used for static/server-rendered UI
- **Preact components** (`.tsx`): Used for interactive client-side features (with `client:*` directives)
- **Icons**: JSX components in `src/components/icons/`

### Tailwind Theme

Custom colors defined in `tailwind.config.mjs`:
- `mainYellow: #ffdc4e` - Primary accent
- `lightYellow: #f9e892`
- `blueGreyed: #546c77`
- `darkBlue: #022a4b`
- `lightBlue: #eff6ff`
- `beige: #fff9d9`

Dark mode uses the `class` strategy (toggle via `dark` class on HTML element).

## Key Files

| File | Purpose |
| ---- | ------- |
| `src/consts.ts` | Site-wide constants (title, URL, description) |
| `src/content/config.ts` | Content collection schemas |
| `src/utils/301.ts` | Legacy URL redirections |
| `astro.config.mjs` | Astro configuration |
| `tailwind.config.mjs` | Tailwind CSS configuration |

## Important Notes

1. **Legacy URL redirections**: Old blog post URLs (without `/blog/` prefix) are redirected via `src/utils/301.ts`
2. **OG Images**: Automatically generated at build time via `/og/[...slug].png.ts`
3. **RSS Feed**: Available at `/rss.xml`
4. **Sitemap**: Auto-generated via `@astrojs/sitemap`
5. **Recipes are read-only**: Content is imported from Notion; edits should be made in Notion
6. **Multilingual support**: Some posts have translations (FR/EN) linked via `translations` frontmatter
