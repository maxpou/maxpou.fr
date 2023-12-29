const { createFilePath } = require('gatsby-source-filesystem')
const readingTime = require('reading-time')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const BlogPostTemplate = require.resolve('./src/templates/blog-post.js')
  const PageTemplate = require.resolve('./src/templates/page.js')
  const RecipeTemplate = require.resolve('./src/templates/recipe.js')
  const PostsBytagTemplate = require.resolve('./src/templates/tags.js')
  const ListPostsTemplate = require.resolve(
    './src/templates/blog-list-template.js'
  )

  const allMarkdownQuery = await graphql(`
    {
      allMarkdown: allMdx(
        sort: { frontmatter: { date: DESC } }
        filter: { frontmatter: { published: { ne: false } } }
        limit: 1000
      ) {
        edges {
          node {
            internal {
              contentFilePath
            }
            fields {
              timeToRead {
                text
              }
            }
            frontmatter {
              title
              slug
              tags
              language
              featured
              cover {
                publicURL
                childImageSharp {
                  gatsbyImageData(width: 640)
                }
              }
              unlisted
            }
            excerpt
          }
        }
      }
    }
  `)

  if (allMarkdownQuery.errors) {
    reporter.panic(allMarkdownQuery.errors)
  }

  const postPerPageQuery = await graphql(`
    {
      site {
        siteMetadata {
          postsPerPage
        }
      }
    }
  `)

  const markdownFiles = allMarkdownQuery.data.allMarkdown.edges

  const posts = markdownFiles.filter(item =>
    item.node.internal.contentFilePath.includes('/content/posts/')
  )

  const listedPosts = posts.filter(
    item => item.node.frontmatter.unlisted !== true
  )

  const featuredPosts = listedPosts.filter(
    item => item.node.frontmatter.featured === true
  )

  // generate paginated post list
  const postsPerPage = postPerPageQuery.data.site.siteMetadata.postsPerPage
  const nbPages = Math.ceil(listedPosts.length / postsPerPage)

  Array.from({ length: nbPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/pages/${i + 1}`,
      component: ListPostsTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        currentPage: i + 1,
        nbPages: nbPages,
      },
    })
  })

  // generate blog posts
  // posts.forEach((post, index, posts) => {
  //   const shuffleFeaturedPosts = featuredPosts
  //     .filter(p => p.node.frontmatter.slug !== post.node.frontmatter.slug)
  //     .sort(() => 0.5 - Math.random())
  //   const [previous, next] = shuffleFeaturedPosts.slice(0, 2)
  //   createPage({
  //     path: post.node.frontmatter.slug,
  //     component: `${BlogPostTemplate}?__contentFilePath=${post.node.internal.contentFilePath}`,
  //     context: {
  //       slug: post.node.frontmatter.slug,
  //       previous: previous.node,
  //       next: next.node,
  //     },
  //   })
  // })

  // generate pages
  markdownFiles
    .filter(item =>
      item.node.internal.contentFilePath.includes('/content/pages/')
    )
    .forEach(page => {
      createPage({
        path: page.node.frontmatter.slug,
        component: `${PageTemplate}?__contentFilePath=${page.node.internal.contentFilePath}`,
        context: {
          slug: page.node.frontmatter.slug,
        },
      })
    })

  // generate recipes
  markdownFiles
    .filter(item =>
      item.node.internal.contentFilePath.includes('/content/recipes/')
    )
    .forEach(recipe => {
      createPage({
        path: 'kitchen/' + recipe.node.frontmatter.slug,
        component: `${RecipeTemplate}?__contentFilePath=${recipe.node.internal.contentFilePath}`,
        context: {
          slug: recipe.node.frontmatter.slug,
        },
      })
    })

  // generate tag page
  markdownFiles
    .filter(item => item.node.frontmatter.tags !== null)
    .reduce(
      (acc, cur) => [...new Set([...acc, ...cur.node.frontmatter.tags])],
      []
    )
    .forEach(uniqTag => {
      createPage({
        path: `tags/${uniqTag}`,
        component: PostsBytagTemplate,
        context: {
          tag: uniqTag,
        },
      })
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    createNodeField({
      node,
      name: `timeToRead`,
      value: readingTime(node.body),
    })
  }

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
