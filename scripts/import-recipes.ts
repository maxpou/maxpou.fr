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
  const results: BlockObjectResponse[] = []
  let cursor: string | undefined

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      start_cursor: cursor,
    })
    results.push(...(response.results as BlockObjectResponse[]))
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
  } while (cursor)

  return results
}

function download(url: string, destination: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(destination)
    https
      .get(url, response => {
        if (response.statusCode && response.statusCode >= 400) {
          reject(new Error(`HTTP ${response.statusCode} downloading ${url}`))
          return
        }
        response.pipe(fileStream)
        fileStream.on('finish', () => {
          console.log('👨‍🍳 File downloaded', destination)
          resolve()
        })
        fileStream.on('error', reject)
      })
      .on('error', reject)
  })
}

async function cleanBlocksDownloadImgs(
  blocks: BlockObjectResponse[],
  fileName: string,
  fileIdToLocalPath: Map<string, string>,
  indexPrefix = '',
): Promise<BlockObjectResponse[]> {
  let olCounter = 1

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    const blockIndex = indexPrefix ? `${indexPrefix}-${i}` : `${i}`

    if (block.type === 'image' && block.image.type === 'file') {
      const url = block.image.file.url
      const imgFileName = `${fileName}-${blockIndex}.jpg`
      const destination = `./src/content/recipes/assets/${imgFileName}`
      const localPath = `./assets/${imgFileName}`
      await download(url, destination)
      block.image.file.url = localPath

      // Extract Notion file UUID from the S3 URL (stable across URL refreshes)
      const fileIdMatch = url.match(/amazonaws\.com\/[^/]+\/([a-f0-9-]+)\//)
      if (fileIdMatch) {
        fileIdToLocalPath.set(fileIdMatch[1], localPath)
      }
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
        fileIdToLocalPath,
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

    const fileIdToLocalPath = new Map<string, string>()
    const cleanBlocks = await cleanBlocksDownloadImgs(
      blocks,
      fileName,
      fileIdToLocalPath,
    )

    const mdblocks = await n2m.blocksToMarkdown(cleanBlocks)
    let mdString = n2m.toMarkdownString(mdblocks).parent

    // notion-to-md re-fetches children from Notion, getting fresh (different) S3 URLs.
    // Post-process to replace any remaining S3 URLs using the stable Notion file UUID.
    mdString = mdString.replace(
      /\(https:\/\/prod-files-secure\.s3[^)]+\)/g,
      match => {
        const url = match.slice(1, -1)
        const fileIdMatch = url.match(/amazonaws\.com\/[^/]+\/([a-f0-9-]+)\//)
        const localPath = fileIdMatch && fileIdToLocalPath.get(fileIdMatch[1])
        return localPath ? `(${localPath})` : match
      },
    )

    const coverExt =
      page.cover?.type === 'file'
        ? (new URL(page.cover.file.url).pathname.split('.').pop() ?? 'jpg')
        : 'jpg'
    const coverFileName = `${fileName}-cover.${coverExt}`
    if (page.cover?.type === 'file') {
      await download(
        page.cover.file.url,
        `./src/content/recipes/assets/${coverFileName}`,
      )
    }

    const header = `---
title: ${title}
date: ${page.created_time}
slug: ${fileName}
${page.cover?.type === 'file' ? `cover: ./assets/${coverFileName}` : ''}
---
`
    const fileContent = header + mdString

    await fs.promises.writeFile(
      `./src/content/recipes/${fileName}.mdx`,
      fileContent,
    )
    console.log(`👨‍🍳 File created: ${fileName}`)
  }
}

main()
