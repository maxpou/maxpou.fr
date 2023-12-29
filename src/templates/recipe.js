import React from 'react'
import { Link, graphql } from 'gatsby'

import Content from '../components/Content'
import OriginalWrapper from '../components/Wrapper'
import SEO from '../components/SEO'
import styled from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Layout } from '../components/Kitchen/Layout'

const Title = styled.h1`
  text-align: center;
  font-weight: 700;
  font-size: 3rem;
  margin: 10px 50px;
`

const Wrapper = styled(OriginalWrapper)`
  top: 0;
  margin-top: 30px;
  margin-bottom: 30px;
`

function Page({ data, location, children }) {
  const page = data.page
  const cover = getImage(page.frontmatter.cover)

  return (
    <Layout>
      <SEO
        title={page.frontmatter.title}
        description={page.excerpt}
        path={page.frontmatter.slug}
        cover={page.frontmatter.cover?.publicURL}
      />

      <Wrapper>
        <article>
          <Content>
            <div>
              <Link to="/kitchen">All recipes</Link> ﹥ {page.frontmatter.title}
            </div>
            <Title>{page.frontmatter.title}</Title>

            {page.frontmatter.cover && (
              <GatsbyImage
                layout="fullWidth"
                placeholder="blurred"
                alt={page.frontmatter.title}
                image={cover}
                formats={['auto', 'webp', 'avif']}
              />
            )}
            {children}
          </Content>
        </article>
      </Wrapper>
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
        date(formatString: "DD MMMM YYYY")
        slug
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
