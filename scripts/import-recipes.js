const { Client } = require('@notionhq/client')
const { NotionToMarkdown } = require('notion-to-md')
const fs = require('fs')
var http = require('https')

const notion = new Client({
  auth: 'secret_VMuj8eNDHEfJp39DM0PWJTVtcZ9XnzTHPlZGGBHVd7y',
})
const DB_ID = 'f604b2ed72554739b31315ad9050c7f8'

const n2m = new NotionToMarkdown({ notionClient: notion })

async function getPages() {
  const pages = await notion.databases.query({
    database_id: DB_ID,
    filter: {
      property: 'Ready',
      checkbox: {
        equals: true,
      },
    },
  })
  return pages.results
}

const getBlocks = async blockId => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  })
  return response.results
}

const download = (url, destination) => {
  const fileStream = fs.createWriteStream(destination)
  http.get(url, function (response) {
    response.pipe(fileStream)
    console.log('👨‍🍳 File downloaded', destination)
  })
}

;(async () => {
  fs.rmdirSync('./content/recipes', { recursive: true })
  fs.mkdirSync('./content/recipes')
  fs.mkdirSync('./content/recipes/assets')
  const pages = await getPages()

  for (const page of pages) {
    const fileName = page.url.replace('https://www.notion.so/', '')
    const title = page.properties.Name.title.map(t => t.plain_text).join()
    const blocks = await getBlocks(page.id)

    let olCounter = 1
    const cleanBlocks = blocks.map((block, i) => {
      if (block.type === 'image') {
        const imgFileName = `${fileName}-${i}.jpg`
        const destination = './content/recipes/assets/' + imgFileName
        download(block.image.file.url, destination)
        block.image.file.url = './assets/' + imgFileName
      } else if (block.type === 'numbered_list_item') {
        olCounter =
          blocks[i - 1]?.type === 'numbered_list_item' ? olCounter + 1 : 1
        block.numbered_list_item.number = olCounter
      }
      return block
    })

    const mdblocks = await n2m.blocksToMarkdown(cleanBlocks)
    const mdString = n2m.toMarkdownString(mdblocks).parent
    const coverFileName = `${fileName}-cover.jpg`
    page.cover &&
      download(page.cover.file.url, './content/recipes/assets/' + coverFileName)

    const header = `---
title: ${title}
date: ${page.created_time}
slug: ${fileName}
${page.cover ? `cover: ./assets/${coverFileName}` : ''}
---
    `
    const fileContent = header + mdString

    fs.writeFile(`./content/recipes/${fileName}.mdx`, fileContent, () => {
      console.log(`👨‍🍳 File downloaded: ${fileName}`)
    })
  }
})()
