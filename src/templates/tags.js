import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import PostsList from '../components/PostsList/PostsList'
import Wrapper from '../components/Wrapper/Wrapper'
import SEO from '../components/SEO/SEO'
import Hero from '../components/Hero/Hero'

class Tags extends React.Component {
  render() {
    const pageTitle = `#${this.props.pageContext.tag}`
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Layout location={this.props.location} title={pageTitle}>
        <SEO title={pageTitle} />
        <Hero title={pageTitle} />

        <Wrapper>
          <h1>Posts tagged as "{this.props.pageContext.tag}"</h1>
          <PostsList posts={posts} />
        </Wrapper>
      </Layout>
    )
  }
}

export default Tags

export const pageQuery = graphql`
  query PostsByTag($tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { eq: $tag } } }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
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
