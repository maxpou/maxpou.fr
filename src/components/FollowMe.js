import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import useSiteMetadata from '../hooks/use-site-config'
import TwitterIcon from '../gatsby-theme-resume/components/icons/twitter'

const TwitterButton = styled.a`
  background-color: #1da1f2;
  border-color: #1da1f2;
  color: #fff;
  font-size: 0.9rem;
  border-radius: 3px;
  padding: 10px 20px 10px 25px;
  font-weight: 600;

  &:hover {
    background-color: #fff;
    color: #1da1f2;
    border: 1px solid #1da1f2;
  }

  & > svg {
    transform: translateX(-50%) translateY(15%);
  }
`

const FollowMe = () => {
  const { twitterUsername } = useSiteMetadata()
  return (
    <TwitterButton
      rel="noopener"
      target="_blank"
      href={`https://twitter.com/intent/follow?screen_name=${twitterUsername}`}
    >
      <TwitterIcon />
      Follow @{twitterUsername}
    </TwitterButton>
  )
}

export default FollowMe
