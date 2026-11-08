# AGENT.md

> This document provides context for AI agents working on this codebase.

## Project Overview

Personal website and blog of **Maxence Poutord** ([maxpou.fr](https://www.maxpou.fr)), built with Astro. The site includes a blog (with interactive demos in some posts), a projects page, a recipes section, CV pages (EN/FR), a speaking page, and calculator apps.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) v7 with SSG (Static Site Generation)
- **UI Libraries**: Preact for interactive components (`.tsx` files)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`) with `@tailwindcss/typography` plugin
- **Content**: Astro Content Collections (glob loaders) with MDX support
- **Code Highlighting**: `astro-expressive-code` (Material Theme Palenight)
- **Linting/Formatting**: Biome (Prettier is only used to format imported recipes)
- **Language**: TypeScript

## Project Structure

```
scripts/
└── import-recipes.ts   # Notion → src/content/recipes importer
src/
├── assets/             # Static assets (images, fonts, project images)
├── components/         # Reusable Astro and Preact components
│   ├── apps/           # Preact calculators (used by src/pages/apps/)
│   │   └── blog/       # Interactive Preact demos embedded in blog posts
│   │       └── diagrams/  # Static Astro diagrams embedded in blog posts
│   ├── icons/          # Icon components (JSX)
│   └── MDX/            # Custom MDX components (Info, Warning, Danger, FollowMe)
├── content/            # Content collections + typed data files
│   ├── blog/           # Blog posts organized by year (e.g., blog/2026/)
│   ├── pages/          # Static pages (about, personal-user-manual, speaking, uses)
│   ├── recipes/        # Recipe collection (auto-imported from Notion)
│   ├── cv.ts, cv-fr.ts # CV data (EN/FR)
│   ├── projects.ts     # Projects data
│   ├── talks.ts        # Talks data
│   └── sport.ts        # Sport data
├── layouts/            # Page layouts (BlogPost, Cv, Page)
├── pages/              # Route pages
│   ├── apps/           # Calculator apps (compound interest, pizza dough)
│   ├── blog/           # Blog routes with pagination (blog/pages/[page])
│   ├── og/             # Dynamic OG image generation
│   ├── recipes/        # Recipe routes
│   ├── tags/           # Tag pages
│   ├── [...slug].astro # Routes for the `pages` collection
│   ├── cv.astro, cv-fr.astro, projects.astro, speaking.astro
│   ├── llms.txt.ts     # /llms.txt generation
│   └── rss.xml.js      # RSS feed
├── styles/             # Global CSS (Tailwind entry + @theme)
├── utils/              # Utility functions (301 redirects, reading time, recipe helpers)
├── consts.ts           # Site-wide constants
└── content.config.ts   # Content collection schemas
```

## Commands

| Command                  | Description                                       |
| ------------------------ | ------------------------------------------------- |
| `npm start`              | Start dev server, exposed on the network (`--host`) |
| `npm run dev`            | Start dev server                                  |
| `npm run build`          | Type-check (`astro check`) and build for production |
| `npm run preview`        | Preview production build                          |
| `npm run format`         | Lint and format `src/` and `scripts/` with Biome  |
| `npm run deploy`         | Type-check, build and deploy to GitHub Pages      |
| `npm run import-recipes` | Import recipes from Notion and format them        |

## Content Collections

Schemas are in `src/content.config.ts`.

### Blog Posts (`src/content/blog/`)

Organized by year in folders like `2026/2026-11-01-post-slug/`. Each post folder contains:
- `index.md` or `index.mdx` - Post content
- `cover.jpeg` (or `.jpg`/`.png`) - Cover image

The URL comes from the `slug` frontmatter field (`/blog/<slug>/`), not from the folder name.

`src/content/blog/00-frontmatter-placeholder/` is an unlisted placeholder post. Do not delete it.

**Frontmatter schema:**
```yaml
title: string          # Required
slug: string           # Required (used in the URL)
date: date             # Required (YYYY-MM-DD)
cover: image           # Required (relative path to image)
tags: string[]         # Required (e.g., ['JavaScript', 'Testing'])
description: string    # Optional
language: string       # Optional (e.g., 'en', 'fr')
modified: date         # Optional (last update date)
unlisted: boolean      # Optional (hide from listings)
featured: boolean      # Optional
translations:          # Optional (links to translated versions)
  - link: string
    language: string
    hreflang: string   # Optional
```

**Interactive content in posts**: MDX posts import Preact components from `src/components/apps/blog/` and render them with `client:visible` (e.g., `<RetrievalComponent client:visible />`). Static diagrams come from `src/components/apps/blog/diagrams/`. Imports use relative paths (e.g., `../../../../components/MDX/Info.astro`).

### Pages (`src/content/pages/`)

Static content pages (about, personal-user-manual, speaking, uses), served by `src/pages/[...slug].astro`.

Frontmatter: `title`, `slug`, `cover`, `webmentions` (boolean) are required; `description` is optional.

### Recipes (`src/content/recipes/`)

Auto-generated from Notion via `npm run import-recipes`. Do not edit manually.

Frontmatter: `title`, `slug`, `date`, `cover` are required; `description` and `tags` (default `[]`) are optional.

## Code Style & Conventions

### Biome Configuration

- **Indent**: Spaces (2)
- **Semicolons**: As needed (no trailing semicolons)
- **Quotes**: Single quotes
- **Arrow functions**: Parentheses as needed
- **Linter**: Recommended rules (some rules are relaxed in `.astro` files)

### Component Conventions

- **Astro components** (`.astro`): Used for static/server-rendered UI
- **Preact components** (`.tsx`): Used for interactive client-side features (with `client:*` directives)
- **Icons**: JSX components in `src/components/icons/`

### Tailwind Theme

Custom colors are defined in two places. Keep them in sync:
- `tailwind.config.mjs` (loaded via `@config` in `src/styles/global.css`)
- `@theme` block in `src/styles/global.css`

Colors:
- `mainYellow: #ffdc4e` - Primary accent
- `lightYellow: #f9e892`
- `blueGreyed: #546c77`
- `darkBlue: #022a4b`
- `lightBlue: #eff6ff`
- `beige: #fff9d9`
- Custom `gray` scale (100–900)

Dark mode uses the `class` strategy (toggle via `dark` class on HTML element, see `DarkModeButton.tsx`).

## Key Files

| File | Purpose |
| ---- | ------- |
| `src/consts.ts` | Site-wide constants (title, URL, description) |
| `src/content.config.ts` | Content collection schemas |
| `src/utils/301.ts` | Legacy URL redirections |
| `astro.config.mjs` | Astro configuration (redirects, integrations, markdown processor) |
| `tailwind.config.mjs` | Tailwind CSS configuration |
| `src/styles/global.css` | Tailwind entry point and `@theme` colors |

## Important Notes

1. **Legacy URL redirections**: Old blog post URLs (without `/blog/` prefix) are redirected via `src/utils/301.ts`. Other redirects are in `astro.config.mjs`.
2. **Markdown processor**: `astro.config.mjs` forces the `unified()` markdown processor. Astro 7's default processor ignores rehype plugins, and `astro-expressive-code` needs them. Do not remove it.
3. **OG Images**: Automatically generated at build time via `/og/[...slug].png.ts`
4. **RSS Feed**: Available at `/rss.xml`
5. **llms.txt**: Generated at `/llms.txt` from the blog, pages, recipes and projects
6. **Sitemap**: Auto-generated via `@astrojs/sitemap`
7. **Recipes are read-only**: Content is imported from Notion; edits should be made in Notion
8. **Multilingual support**: Some posts have translations (FR/EN) linked via `translations` frontmatter
