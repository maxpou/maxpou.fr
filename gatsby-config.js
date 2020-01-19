const config = require('./data/siteConfig')

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    author: config.authorName,
    description: config.siteDescription,
    ...config,
  },
  pathPrefix: config.pathPrefix,
  plugins: [
    {
      resolve: 'gatsby-starter-morning-dew',
      options: {},
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: config.googleAnalyticsId,
      },
    },
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
        const siteUrl = site.siteMetadata.siteUrl;
        const postText = `
          <div style="margin-top=55px; font-style: italic;">(This is an article posted to my blog at maxpou.fr. You can read it online by <a href="${siteUrl +
            edge.node.frontmatter.slug}">clicking here</a>.)</div>
        `;
        let html = edge.node.html;
        // Hacky workaround for https://github.com/gaearon/overreacted.io/issues/65
        html = html
          .replace(/href="\//g, `href="${siteUrl}/`)
          .replace(/src="\//g, `src="${siteUrl}/`)
          .replace(/"\/static\//g, `"${siteUrl}/static/`)
          .replace(/,\s*\/static\//g, `,${siteUrl}/static/`);
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
        allMarkdownRemark(
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
