import React, { Fragment } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import styled from 'styled-components'
import useSiteMetadata from '../hooks/use-site-config'
import TagList from './TagList'
import Flag from './Flag'
import { ReadingTime, Bull } from './Commons'

const PreviewContainer = styled.aside`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 810px;
  margin: 0 auto;
`

const PreviewLink = styled(Link)`
  height: 100%;
  display: block;
`

const Preview = styled.article`
  cursor: pointer;
  flex: 1 1 300px;
  align-self: stretch;
  background-color: var(--color-secondaryContentBackground);
  box-shadow: 0 0 0 0, 0 6px 12px rgba(0, 0, 0, 0.1);
  margin: 20px 20px;
  border-radius: 5px;

  &:hover {
    box-shadow: 0 0 0 0, 0 6px 12px var(--color-grey300);
    transition: all 0.3s ease;
    transform: translate3D(0, -1px, 0);
  }
`

const PreviewCover = styled.div`
  & > * {
    height: 200px;
    border-radius: 5px 5px 0 0;
  }
`

const PreviewContent = styled.div`
  padding: 20px;
  height: calc(100% - 200px);
  flex-direction: column;
  flex-grow: inherit;
  justify-content: space-between;
  display: flex;

  header {
    padding: 0 0 10px 0;
  }
  section {
    padding-bottom: 10px;
  }
  footer {
    align-items: flex-end;
    font-size: 0.8em;
  }
`

const PrevNextPost = props => {
  const { previous, next } = props
  const articles = [previous, next].filter(i => i).map(item => ({ node: item }))
  const { defaultLang } = useSiteMetadata()

  return (
    <Fragment>
      <PreviewContainer>
        {articles.map((article, i) => {
          const { excerpt, timeToRead } = article.node
          const {
            tags,
            cover,
            title,
            slug,
            language,
          } = article.node.frontmatter
          const image = getImage(cover)

          return (
            <Preview key={`prev-next-${i}`}>
              <PreviewLink to={`/${slug}`} aria-label={`View ${title} article`}>
                <PreviewCover>
                  <GatsbyImage image={image} alt={`View ${title} article`} />
                </PreviewCover>
                <PreviewContent>
                  <header>
                    <h2>
                      {defaultLang !== language && <Flag language={language} />}
                      {title}
                    </h2>
                  </header>
                  <section>
                    <p>{excerpt}</p>
                  </section>
                  <footer>
                    <ReadingTime min={timeToRead} />
                    {Array.isArray(tags) && (
                      <>
                        <Bull />
                        <TagList tags={tags} noLink={true} />
                      </>
                    )}
                  </footer>
                </PreviewContent>
              </PreviewLink>
            </Preview>
          )
        })}
      </PreviewContainer>
    </Fragment>
  )
}

export default PrevNextPost
