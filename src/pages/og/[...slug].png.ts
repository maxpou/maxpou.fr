import type { ImageFunction } from 'astro:content'
import { getCollection } from 'astro:content'
import fs from 'node:fs'
import path from 'node:path'
import { ImageResponse } from '@vercel/og'
import type { z } from 'astro/zod'
import type { ReactNode } from 'preact/compat'

type AstroImage = z.infer<ReturnType<ImageFunction>>

interface Props {
  params: { slug: string }
  props: {
    title: string
    image: AstroImage
  }
}

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
}

function buildCard(title: string, cover: string | null): ReactNode {
  const background: ReactNode = cover
    ? {
        type: 'img',
        props: {
          tw: 'h-full w-full',
          height: 630,
          width: 1200,
          src: cover,
          style: {
            objectFit: 'cover',
          },
        },
      }
    : {
        type: 'div',
        props: {
          tw: 'h-[630px] w-[1200px]',
          style: { backgroundColor: '#3e4047' },
        },
      }

  return {
    type: 'div',
    props: {
      tw: 'flex h-[630px] w-[1200px]',
      children: [
        {
          type: 'div',
          props: {
            tw: 'relative top-0 flex h-full w-full',
            children: [
              background,
              {
                type: 'div',
                props: {
                  style: {
                    backgroundImage:
                      'linear-gradient(to bottom, rgb(0, 0, 0, 0.33), rgb(0, 0, 0, 0.9))',
                  },
                  tw: 'absolute top-0 h-[630px] w-[1200px] ',
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'absolute top-0 flex h-[630px] w-[1200px] flex-col items-center justify-center text-white text-center',
                  children: [
                    {
                      type: 'div',
                      props: {
                        tw: 'text-6xl px-52 font-black mt-24',
                        style: {
                          fontFamily: 'Roboto Bold',
                        },
                        children: title,
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        tw: 'text-4xl mt-20',
                        style: {
                          fontFamily: 'Roboto Bold',
                          color: '#ffdc4e',
                        },
                        children: 'maxpou.fr',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  }
}

export async function GET({ props }: Props) {
  const robotoMedium = fs.readFileSync(
    path.resolve('./src/assets/fonts/Roboto-Medium.ttf'),
  )
  const robotoBold = fs.readFileSync(
    path.resolve('./src/assets/fonts/Roboto-Bold.ttf'),
  )
  const coverPath =
    process.env.NODE_ENV === 'development'
      ? path.resolve(props.image.src.replace(/\?.*/, '').replace('/@fs', ''))
      : path.resolve(props.image.src.replace('/', 'dist/'))
  // satori only accepts a URL or a data URI for `src`; a raw buffer renders
  // nothing at all.
  const postCover = `data:${MIME_TYPES[path.extname(coverPath).toLowerCase()]};base64,${fs.readFileSync(coverPath).toString('base64')}`

  const options = {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Roboto',
        data: new Uint8Array(robotoMedium).buffer,
        style: 'normal' as const,
      },
      {
        name: 'Roboto Bold',
        data: new Uint8Array(robotoBold).buffer,
        style: 'normal' as const,
      },
    ],
  }

  // ImageResponse renders lazily, so the body has to be consumed here for a
  // decoding failure to be catchable.
  const render = async (cover: string | null) => {
    const png = await new ImageResponse(
      buildCard(props.title, cover),
      options,
    ).arrayBuffer()
    return new Response(png, { headers: { 'Content-Type': 'image/png' } })
  }

  // A cover satori cannot decode must not break the whole build: fall back to
  // the plain dark card instead.
  try {
    return await render(postCover)
  } catch (error) {
    console.warn(
      `[og] cover unusable for "${props.title}", rendering without it:`,
      error,
    )
    return await render(null)
  }
}

export async function getStaticPaths() {
  const allBlogPosts = await getCollection('blog')
  const allPages = await getCollection('pages')
  const allRecipes = await getCollection('recipes')
  const indexPage = allPages
    .filter(page => page.data.slug === 'speaking')
    .map(page => {
      return {
        data: {
          slug: 'home',
          title: 'Maxence Poutord',
          cover: page.data.cover,
        },
      }
    })[0]

  return [indexPage, ...allBlogPosts, ...allPages, ...allRecipes].map(page => {
    return {
      params: {
        slug: page.data.slug,
      },
      props: {
        title: page.data.title,
        image: page.data.cover,
      },
    }
  })
}
