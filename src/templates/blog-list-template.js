import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Wrapper from '../components/Wrapper'
import Hero from '../components/Hero'
import PostsList from '../components/PostsList'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'

function BlogList({ data, pageContext, location }) {
  const { title, description } = data.site.siteMetadata
  const posts = data.posts.edges

  return (
    <Layout location={location}>
      <SEO
        imageShare={
          data.imageShare.childImageSharp.gatsbyImageData.images.fallback.src
        }
      />
      <Hero title={title} subTitle={description} />

      <Wrapper>
        <PostsList posts={posts} />
      </Wrapper>

      <Pagination
        nbPages={pageContext.nbPages}
        currentPage={pageContext.currentPage}
      />
    </Layout>
  )
}

export default BlogList

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    imageShare: file(relativePath: { eq: "cover.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    posts: allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: {
        internal: { contentFilePath: { regex: "//content/posts//" } }
        frontmatter: { published: { ne: false }, unlisted: { ne: true } }
      }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            timeToRead {
              text
            }
          }
          frontmatter {
            title
            tags
            language
            slug
          }
        }
      }
    }
  }
`
