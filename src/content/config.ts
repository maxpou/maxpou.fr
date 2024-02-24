import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date(), // Transform string to Date object
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
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      cover: image(),
      webmentions: z.boolean(),
      description: z.string().optional(),
    }),
})

const recipes = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(), // Transform string to Date object
      cover: image(),
      description: z.string().optional(),
    }),
})

export const collections = { blog, pages, recipes }
