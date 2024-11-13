import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import preact from '@astrojs/preact'
import tailwind from '@astrojs/tailwind'
import astroExpressiveCode from 'astro-expressive-code'
import { SITE_URL } from './src/consts'
import { getLegacyPostRedirections } from './src/utils/301'

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
const astroExpressiveCodeOptions = {
  site: 'https://www.maxpou.fr',
  themes: ['material-theme-palenight'],
  styleOverrides: {
    textMarkers: {
      markBorderColor: '#ffdc4e',
    },
  },
}

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  redirects: {
    '/blog/pages/1': '/blog',
    ...getLegacyPostRedirections(),
  },
  integrations: [
    astroExpressiveCode(astroExpressiveCodeOptions),
    mdx(),
    sitemap(),
    tailwind(),
    preact(),
  ],
})
