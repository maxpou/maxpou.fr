import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'zod'

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
    generateId: ({ entry }) =>
      entry.replace(/\/index\.(md|mdx)$/, '').replace(/\.(md|mdx)$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date(),
      cover: image(),
      language: z.string().optional(),
      modified: z.coerce.date().optional(),
      unlisted: z.boolean().optional(),
      tags: z.array(z.string()),
      translations: z
        .array(
          z.object({
            link: z.string(),
            language: z.string(),
            hreflang: z.string().optional(),
          }),
        )
        .optional(),
      featured: z.boolean().optional(),
    }),
})

const pages = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/pages',
    generateId: ({ entry, data }) => {
      if (data.slug && typeof data.slug === 'string') return data.slug
      return entry.replace(/\/index\.(md|mdx)$/, '').replace(/\.(md|mdx)$/, '')
    },
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      cover: image(),
      webmentions: z.boolean(),
      description: z.string().optional(),
    }),
})

const recipes = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/recipes',
    generateId: ({ entry }) =>
      entry.replace(/\/index\.(md|mdx)$/, '').replace(/\.(md|mdx)$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      cover: image(),
      description: z.string().optional(),
    }),
})

export const collections = { blog, pages, recipes }
