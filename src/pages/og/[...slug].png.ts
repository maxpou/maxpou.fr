import type { ImageFunction, z } from 'astro:content'
import { getCollection } from 'astro:content'
import fs from 'node:fs'
import path from 'node:path'
import { ImageResponse } from '@vercel/og'
import type { ReactNode } from 'preact/compat'

type AstroImage = z.infer<ReturnType<ImageFunction>>

interface Props {
  params: { slug: string }
  props: {
    title: string
    image: AstroImage
  }
}

export async function GET({ props }: Props) {
  const robotoMedium = fs.readFileSync(
    path.resolve('./src/assets/fonts/Roboto-Medium.ttf'),
  )
  const robotoBold = fs.readFileSync(
    path.resolve('./src/assets/fonts/Roboto-Bold.ttf'),
  )
  const postCover = fs.readFileSync(
    process.env.NODE_ENV === 'development'
      ? path.resolve(props.image.src.replace(/\?.*/, '').replace('/@fs', ''))
      : path.resolve(props.image.src.replace('/', 'dist/')),
  )

  // supported HTML - https://github.com/vercel/satori?tab=readme-ov-file#documentation
  const html: ReactNode = {
    type: 'div',
    props: {
      tw: 'flex h-[630px] w-[1200px]',
      children: [
        {
          type: 'div',
          props: {
            tw: 'relative top-0 flex h-full w-full',
            children: [
              {
                type: 'img',
                tw: 'h-full w-full',
                props: {
                  height: 630,
                  width: 1200,
                  src: postCover.buffer,
                  style: {
                    objectFit: 'cover',
                  },
                },
              },
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
                        children: props.title,
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

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Roboto',
        data: new Uint8Array(robotoMedium).buffer,
        style: 'normal',
      },
      {
        name: 'Roboto Bold',
        data: new Uint8Array(robotoBold).buffer,
        style: 'normal',
      },
    ],
  })
}

export async function getStaticPaths() {
  const allBlogPosts = await getCollection('blog')
  const allPages = await getCollection('pages')
  const allRecipes = await getCollection('recipes')
  const indexPage = allPages
    .filter(page => page.slug === 'speaking')
    .map(page => {
      return {
        slug: 'home',
        data: {
          title: 'Maxence Poutord',
          cover: page.data.cover,
        },
      }
    })[0]

  return [indexPage, ...allBlogPosts, ...allPages, ...allRecipes].map(page => {
    return {
      params: {
        slug: page.slug,
      },
      props: {
        title: page.data.title,
        image: page.data.cover,
      },
    }
  })
}
