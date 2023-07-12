import React from 'react'
import styled from 'styled-components'
import useReddit from '../hooks/use-reddit'
import { StaticImage } from 'gatsby-plugin-image'

const RedditContainer = styled.div`
  display: inline;
  color: #ff4500;
  padding-left: 12px;
  & > a {
    color: #ff4500;
    & > * {
      transform: translateX(5%) translateY(10%);
    }
  }
`

const RedditScoreWrapper = props => {
  const [score] = useReddit(props.redditPostId)
  return (
    <RedditContainer>
      <a
        href={`https://www.reddit.com/${props.redditPostId}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        {score}
        <StaticImage
          src="./icons/reddit-up.png"
          alt="score Reddit"
          height={20}
          width={32}
        />
      </a>
    </RedditContainer>
  )
}

export default RedditScoreWrapper
