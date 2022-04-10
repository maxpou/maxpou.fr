import React from 'react'
import styled from 'styled-components'
import { Text } from './Commons'
import FollowMe from './FollowMe'
import useSiteMetadata from '../hooks/use-site-config'
import { StaticImage } from 'gatsby-plugin-image'

const BioWrapper = styled.div`
  & .author-image {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: block;
    position: absolute;
    top: -40px;
    left: 50%;
    margin-left: -40px;
    width: 80px;
    height: 80px;
    border-radius: 100%;
    overflow: hidden;
    padding: 6px;
    z-index: 2;
    box-shadow: #ececec 0 0 0 1px;
    background-color: var(--color-wrapperBackground);
  }

  & .author-image img {
    border-radius: 100%;
  }

  & .author-profile .author-image {
    position: relative;
    left: auto;
    top: auto;
    width: 120px;
    height: 120px;
    padding: 3px;
    margin: -100px auto 0 auto;
    box-shadow: none;
  }

  & .followMeWrapper {
    padding-top: 10px;
  }
`

const BioText = styled(Text)`
  & a {
    box-shadow: 0 2px 0 0 var(--color-secondary);
  }
  & a:hover {
    filter: brightness(150%);
    box-shadow: none;
  }
`

const Bio = () => {
  const { authorName, authorDescription } = useSiteMetadata()

  return (
    <BioWrapper>
      <figure className="author-image">
        <StaticImage src="../../content/images/avatar.jpeg" alt={authorName} />
      </figure>
      <section>
        <h2>About the author</h2>
        <BioText dangerouslySetInnerHTML={{ __html: authorDescription }} />
        <div className="followMeWrapper">
          <FollowMe />
        </div>
      </section>
    </BioWrapper>
  )
}

export default Bio
