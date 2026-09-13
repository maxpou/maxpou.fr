import { getCollection } from 'astro:content'
import type { APIRoute } from 'astro'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '../consts'

type Link = {
  title: string
  url: string
  description?: string
}

const toLine = ({ title, url, description }: Link) =>
  `- [${title}](${url})${description ? `: ${description.replace(/\s+/g, ' ').trim()}` : ''}`

const section = (heading: string, links: Link[]) =>
  `## ${heading}\n\n${links.map(toLine).join('\n')}\n`

export const GET: APIRoute = async () => {
  const [blog, pages, recipes] = await Promise.all([
    getCollection('blog'),
    getCollection('pages'),
    getCollection('recipes'),
  ])

  const posts = blog
    .filter(post => !post.data.unlisted)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map(post => ({
      title: post.data.title,
      url: `${SITE_URL}/blog/${post.data.slug}/`,
      description: post.data.description,
    }))

  const content = [
    `# ${SITE_TITLE}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    'Maxence Poutord is a software engineer and public speaker. This site holds his blog (web development, engineering culture, career), a few free web apps, and a personal recipe collection. Content is written in English unless noted otherwise.',
    '',
    section('Blog posts', posts),
    section(
      'Pages',
      pages.map(page => ({
        title: page.data.title,
        url: `${SITE_URL}/${page.data.slug}/`,
        description: page.data.description,
      })),
    ),
    section('Apps', [
      {
        title: 'Pizza dough calculator',
        url: `${SITE_URL}/apps/pizza-dough-calculator/`,
      },
      {
        title: 'Compound interest calculator',
        url: `${SITE_URL}/apps/compound-interest-calculator/`,
      },
      { title: 'Runner dashboard', url: `${SITE_URL}/apps/runner-dashboard/` },
    ]),
    section(
      'Recipes',
      recipes.map(recipe => ({
        title: recipe.data.title,
        url: `${SITE_URL}/recipes/${recipe.data.slug}/`,
        description: recipe.data.description,
      })),
    ),
    section('Optional', [
      { title: 'Projects', url: `${SITE_URL}/projects/` },
      { title: 'Resume', url: `${SITE_URL}/cv/` },
      { title: 'RSS feed', url: `${SITE_URL}/rss.xml` },
      { title: 'Sitemap', url: `${SITE_URL}/sitemap-index.xml` },
    ]),
  ].join('\n')

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
