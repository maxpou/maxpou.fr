import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import PostsList from '../components/PostsList'
import Wrapper from '../components/Wrapper'
import SEO from '../components/SEO'
import Hero from '../components/Hero'

const PageTitle = styled.h1`
  padding-bottom: 10px;
`

function Tags({ data, pageContext, location }) {
  const posts = data.posts.edges

  return (
    <Layout location={location}>
      <SEO title={`Top blog posts on ${pageContext.tag}`} />
      <Hero title={`#${pageContext.tag}`} />

      <Wrapper>
        <PageTitle>Posts tagged as {pageContext.tag}</PageTitle>
        <PostsList posts={posts} />
      </Wrapper>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query PostsByTag($tag: String!) {
    posts: allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          tags: { eq: $tag }
          published: { ne: false }
          unlisted: { ne: true }
        }
      }
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
