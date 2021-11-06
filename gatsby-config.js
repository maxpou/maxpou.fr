const path = require('path')
const config = require('./data/siteConfig')
const resume = require('./data/resume-maxpou')

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    author: config.authorName,
    description: config.siteDescription,
    ...config,
    resume,
  },
  pathPrefix: config.pathPrefix,
  plugins: [
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: `maxpou.fr`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'posts',
        path: 'content/posts',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'pages',
        path: 'content/pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'images',
        path: 'content/images',
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: path.join(__dirname, `src`, `pages`),
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve('./src/templates/page.js'),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
              withWebp: true,
            },
          },
          { resolve: 'gatsby-remark-prismjs' },
          { resolve: 'gatsby-remark-responsive-iframe' },
          { resolve: 'gatsby-remark-copy-linked-files' },
          { resolve: 'gatsby-remark-smartypants' },
          { resolve: 'gatsby-remark-autolink-headers' },
        ],
      },
    },
    // Reminder (https://github.com/gatsbyjs/gatsby/issues/15486#issuecomment-509405867)
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-images`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteTitle,
        short_name: config.siteTitle,
        start_url: config.pathPrefix,
        background_color: config.background_color,
        theme_color: config.theme_color,
        display: config.display,
        icon: 'content/images/avatar.jpeg',
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          getBlogFeed('eq: "en"', {
            output: '/rss-en.xml',
            title: 'Maxence Poutord • Maxpou Blog (EN)',
          }),
          getBlogFeed('ne: "en"', {
            output: '/rss-fr.xml',
            title: 'Maxence Poutord • Maxpou Blog (FR)',
          }),
          getBlogFeed(null, {
            output: '/rss.xml',
            title: 'Maxence Poutord • Maxpou Blog',
          }),
        ],
      },
    },
  ],
}

function getBlogFeed(filter, overrides) {
  const queryFilter = filter ? `language: {${filter}}` : ''

  return {
    serialize: ({ query: { site, allMarkdownRemark } }) => {
      return allMarkdownRemark.edges.map(edge => {
        const siteUrl = site.siteMetadata.siteUrl
        const postText = `
          <div style="margin-top=55px; font-style: italic;">(This is an article posted to my blog at maxpou.fr. You can read it online by <a href="${
            siteUrl + edge.node.frontmatter.slug
          }">clicking here</a>.)</div>
        `
        let html = edge.node.html
        // Hacky workaround for https://github.com/gaearon/overreacted.io/issues/65
        html = html
          .replace(/href="\//g, `href="${siteUrl}/`)
          .replace(/src="\//g, `src="${siteUrl}/`)
          .replace(/"\/static\//g, `"${siteUrl}/static/`)
          .replace(/,\s*\/static\//g, `,${siteUrl}/static/`)
        return Object.assign({}, edge.node.frontmatter, {
          description: edge.node.excerpt,
          date: edge.node.frontmatter.date,
          url: site.siteMetadata.siteUrl + '/' + edge.node.frontmatter.slug,
          guid: site.siteMetadata.siteUrl + '/' + edge.node.frontmatter.slug,
          custom_elements: [{ 'content:encoded': html + postText }],
        })
      })
    },
    query: `
      {
        allMarkdownRemark: allMdx(
          sort: { order: DESC, fields: [frontmatter___date] },
          filter: {
            fileAbsolutePath: {regex: "/content/posts/"}
            frontmatter: { 
              published: { ne: false } 
              ${queryFilter}
            }
          }
        ) {
          edges {
            node {
              excerpt(pruneLength: 250)
              html
              frontmatter {
                title
                date
                slug
              }
            }
          }
        }
      }
    `,
    ...overrides,
  }
}
