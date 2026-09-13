import type { JsonLdDocument } from 'jsonld'
import { SITE_OWNER, SITE_URL } from '../consts'

// `parent` is the enclosing H2, so H3 subsections inherit "## Steps".
type Section = { heading: string; parent: string; lines: string[] }

// Recipes are imported verbatim from Notion, so ingredients and steps only exist
// as markdown. Parsing the body keeps the schema in sync across re-imports.
function splitSections(body: string): Section[] {
  const sections: Section[] = []
  let current: Section = { heading: '', parent: '', lines: [] }
  let parent = ''

  for (const line of body.split('\n')) {
    const heading = line.match(/^(#{2,3})\s+(.*)$/)
    if (heading) {
      sections.push(current)
      const text = heading[2].trim()
      if (heading[1] === '##') {
        parent = text
      }
      current = {
        heading: text,
        parent: heading[1] === '##' ? '' : parent,
        lines: [],
      }
    } else {
      current.lines.push(line)
    }
  }
  sections.push(current)

  return sections
}

function stripMarkdown(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function bulletItems(lines: string[]): string[] {
  return lines
    .filter(line => /^\s*[-*]\s+/.test(line))
    .map(line => stripMarkdown(line.replace(/^\s*[-*]\s+/, '')))
    .filter(Boolean)
}

// Numbered steps wrap over several lines, so continuation lines join the item above.
function orderedItems(lines: string[]): string[] {
  const items: string[] = []
  for (const line of lines) {
    if (/^\s*\d+[.)]\s+/.test(line)) {
      items.push(line.replace(/^\s*\d+[.)]\s+/, '').trim())
    } else if (items.length > 0 && /^\s+\S/.test(line)) {
      items[items.length - 1] += ` ${line.trim()}`
    } else if (line.trim() !== '' && items.length > 0) {
      break
    }
  }
  return items.map(stripMarkdown).filter(Boolean)
}

// Some recipes write their steps as plain paragraphs instead of a numbered list.
function paragraphItems(lines: string[]): string[] {
  return lines
    .join('\n')
    .split(/\n\s*\n/)
    .map(block => stripMarkdown(block))
    .filter(Boolean)
}

const isIngredients = (heading: string) => /ingredient/i.test(heading)
const isSteps = (heading: string) =>
  /^(steps|instructions|method|preparation)\b/i.test(heading)

function parseYield(headings: string[]): string | undefined {
  for (const heading of headings) {
    const match = heading.match(
      /\(([\d\s/]+)\s*(?:persons?|people|servings?)\)/i,
    )
    if (match) {
      // "3/4 persons" means "3 to 4", not a fraction.
      return `${match[1].trim().replace(/\s*\/\s*/, '-')} servings`
    }
  }
  return undefined
}

export function buildRecipeSchema({
  title,
  description,
  date,
  cover,
  body = '',
  url,
}: {
  title: string
  description?: string
  date: Date
  cover?: string
  body?: string
  url: string
}): JsonLdDocument {
  const sections = splitSections(body)

  const ingredients = sections
    .filter(s => isIngredients(s.heading) || isIngredients(s.parent))
    .flatMap(s => bulletItems(s.lines))

  const steps = sections
    .filter(s => isSteps(s.heading) || isSteps(s.parent))
    .flatMap(s => {
      const ordered = orderedItems(s.lines)
      return ordered.length > 0 ? ordered : paragraphItems(s.lines)
    })

  const recipeYield = parseYield(sections.map(s => s.heading))

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: title,
    description,
    url,
    datePublished: date.toISOString(),
    author: {
      '@type': 'Person',
      name: SITE_OWNER,
      url: SITE_URL,
    },
    image: cover ? `${SITE_URL}${cover}` : undefined,
    ...(recipeYield ? { recipeYield } : {}),
    ...(ingredients.length > 0 ? { recipeIngredient: ingredients } : {}),
    ...(steps.length > 0
      ? {
          recipeInstructions: steps.map((text, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            text,
          })),
        }
      : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    isPartOf: {
      '@type': 'Collection',
      name: 'Recipes',
      url: `${SITE_URL}/recipes/`,
    },
  }
}
