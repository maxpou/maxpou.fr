import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Content from '../components/Content'
import Wrapper from '../components/Wrapper'
import Hero from '../components/Hero'
import SEO from '../components/SEO'
import Webmentions from '../components/Webmentions'

function Page({ data, location, children }) {
  const page = data.page

  return (
    <Layout location={location}>
      <SEO
        title={page.frontmatter.title}
        description={page.excerpt}
        path={page.frontmatter.slug}
        cover={page.frontmatter.cover && page.frontmatter.cover.publicURL}
      />

      <Hero heroImg={page.frontmatter.cover} title={page.frontmatter.title} />

      <Wrapper>
        <article>
          <Content date={page.frontmatter.date}>{children}</Content>
        </article>
      </Wrapper>

      {page.frontmatter.webmentions && (
        <Wrapper as="aside">
          <Webmentions
            slug={page.frontmatter.slug}
            title={page.frontmatter.title}
          />
        </Wrapper>
      )}
    </Layout>
  )
}

export default Page

export const pageQuery = graphql`
  query ($slug: String!) {
    page: mdx(frontmatter: { slug: { eq: $slug } }) {
      excerpt
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
        webmentions
        cover {
          publicURL
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`
