import fs from 'node:fs'
import https from 'node:https'
import { Client } from '@notionhq/client'
import type {
  BlockObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { NotionToMarkdown } from 'notion-to-md'

const NOTION_TOKEN = 'secret_VMuj8eNDHEfJp39DM0PWJTVtcZ9XnzTHPlZGGBHVd7y'
const DS_ID = '908d6a7b-4653-4d74-b34e-1d6b94a79f6f'

const notion = new Client({
  auth: NOTION_TOKEN,
})

const n2m = new NotionToMarkdown({ notionClient: notion })

async function getPages(): Promise<PageObjectResponse[]> {
  const pages = await notion.dataSources.query({
    data_source_id: DS_ID,
    filter: {
      and: [
        {
          property: 'Text ready',
          checkbox: {
            equals: true,
          },
        },
        {
          property: 'Has photo',
          checkbox: {
            equals: true,
          },
        },
      ],
    },
  })

  return pages.results as PageObjectResponse[]
}

async function getBlocks(blockId: string): Promise<BlockObjectResponse[]> {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 10000,
  })
  return response.results as BlockObjectResponse[]
}

function download(url: string, destination: string): void {
  const fileStream = fs.createWriteStream(destination)
  https.get(url, response => {
    response.pipe(fileStream)
    console.log('👨‍🍳 File downloaded', destination)
  })
}

async function cleanBlocksDownloadImgs(
  blocks: BlockObjectResponse[],
  fileName: string,
  indexPrefix = '',
): Promise<BlockObjectResponse[]> {
  let olCounter = 1

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    const blockIndex = indexPrefix ? `${indexPrefix}-${i}` : `${i}`

    if (block.type === 'image' && block.image.type === 'file') {
      const imgFileName = `${fileName}-${blockIndex}.jpg`
      const destination = `./src/content/recipes/assets/${imgFileName}`
      download(block.image.file.url, destination)
      block.image.file.url = `./assets/${imgFileName}`
    } else if (block.type === 'numbered_list_item') {
      olCounter =
        blocks[i - 1]?.type === 'numbered_list_item' ? olCounter + 1 : 1
      ;(block.numbered_list_item as { number?: number }).number = olCounter
    }

    if (block.has_children) {
      const children = await getBlocks(block.id)
      const processedChildren = await cleanBlocksDownloadImgs(
        children,
        fileName,
        blockIndex,
      )
      ;(block as { children?: BlockObjectResponse[] }).children =
        processedChildren
    }
  }

  return blocks
}

async function main(): Promise<void> {
  fs.rmSync('./src/content/recipes', { recursive: true, force: true })
  fs.mkdirSync('./src/content/recipes')
  fs.mkdirSync('./src/content/recipes/assets')

  const pages = await getPages()

  for (const page of pages) {
    const fileName = page.url.replace('https://www.notion.so/', '')

    const titleProperty = page.properties.Name
    const title =
      titleProperty.type === 'title'
        ? titleProperty.title.map(t => t.plain_text).join('')
        : ''

    const blocks = await getBlocks(page.id)

    const cleanBlocks = await cleanBlocksDownloadImgs(blocks, fileName)

    const mdblocks = await n2m.blocksToMarkdown(cleanBlocks)
    const mdString = n2m.toMarkdownString(mdblocks).parent

    const coverFileName = `${fileName}-cover.jpg`
    if (page.cover?.type === 'file') {
      download(
        page.cover.file.url,
        `./src/content/recipes/assets/${coverFileName}`,
      )
    }

    const header = `---
title: ${title}
date: ${page.created_time}
slug: ${fileName}
${page.cover ? `cover: ./assets/${coverFileName}` : ''}
---
`
    const fileContent = header + mdString

    fs.writeFile(`./src/content/recipes/${fileName}.mdx`, fileContent, () => {
      console.log(`👨‍🍳 File created: ${fileName}`)
    })
  }
}

main()
