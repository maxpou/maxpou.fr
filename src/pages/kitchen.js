import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'

import SEO from '../components/SEO'
import { Text } from '../components/Commons'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Layout } from '../components/Kitchen/Layout'

const MainTitle = styled.h1`
  margin-top: 50px;
  line-height: 1.5;
  text-align: center;
  font-size: 3rem;
`

const Articles = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  padding: 50px;

  @media (max-width: 780px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 30px;
    padding: 20px;
  }

  & article {
    height: 100%;
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid var(--color-border);
    background-color: var(--color-secondaryContentBackground);
    display: flex;
    flex-direction: column;
    box-shadow:
      0 0 0 0,
      0 6px 12px rgba(0, 0, 0, 0.1);
    &:hover {
      box-shadow:
        0 0 0 0,
        0 6px 12px var(--color-grey300);
      transition: all 0.3s ease;
      transform: translate3D(0, -1px, 0);
    }
    & div {
      padding: 20px;
    }
  }
`

const Intro = styled(Text)`
  margin: 0 auto;
  max-width: 450px;
  text-align: center;
`

const MyKitchen = props => {
  const data = useStaticQuery(graphql`
    query recipesList {
      posts: allMdx(
        sort: { frontmatter: { date: DESC } }
        filter: {
          internal: { contentFilePath: { regex: "//content/recipes//" } }
        }
      ) {
        edges {
          node {
            excerpt
            frontmatter {
              date(formatString: "DD MMMM YYYY")
              title
              slug
              cover {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  `)

  const recipes = data.posts.edges

  return (
    <Layout>
      <SEO title="Max's kitchen" />

      <MainTitle>Max's kitchen</MainTitle>
      <Intro>
        Welcome to my culinary haven! I'm Max, a passionate foodie eager to
        share my favourite recipes. I hope you enjoy them as much as I do!
      </Intro>
      <Articles>
        {recipes.map(({ node }, i) => {
          const title = node.frontmatter.title
          return (
            <Link
              to={`/kitchen/${node.frontmatter.slug}`}
              aria-label={`${title} recipe`}
              key={i}
            >
              <article key={node.frontmatter.slug}>
                {node.frontmatter.cover && (
                  <GatsbyImage
                    layout="fullWidth"
                    placeholder="blurred"
                    alt={node.frontmatter.title}
                    image={getImage(node.frontmatter.cover)}
                    formats={['auto', 'webp', 'avif']}
                    style={{
                      height: '200px',
                      borderRadius: '8px 8px 0px 0px',
                    }}
                  />
                )}
                <div>
                  <header>
                    <h2>{title}</h2>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: node.excerpt,
                      }}
                    />
                  </section>
                </div>
              </article>
            </Link>
          )
        })}
      </Articles>
    </Layout>
  )
}

export default MyKitchen
