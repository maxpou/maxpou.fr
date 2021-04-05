import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import useSiteMetadata from '../hooks/use-site-config'
import BirdHeartIcon from './icons/bird-heart.png'
import LikeIcon from './icons/like'
import RetweetIcon from './icons/retweet'
import { Text, Link, Bull } from './Commons'

const LikedByImg = styled.img`
  margin-right: 25px;
  display: inline-block;
`

const MentionTitle = styled.h2`
  display: inline;
`

const LikeContainer = styled.div`
  display: inline;
  color: #e0245e;
  padding-right: 3px;
  & > svg {
    transform: translateX(-15%) translateY(25%);
  }
`
const RetweetContainer = styled.div`
  display: inline;
  color: #17bf63;
  & > svg {
    transform: translateX(0%) translateY(20%);
  }
`

const LikeListContainer = styled.div`
  margin-top: 1em;
`

const UserLikeList = styled.ul`
  display: inline;
  padding: 10px 0 10px 10px;
  margin: 0;
  list-style: none;
  flex-wrap: wrap;
`

const UserLikeListItem = styled.li`
  display: inline-block;
  &:nth-child(n + 2) {
    margin-left: -13px;
  }
`

const UserImg = styled.img`
  border-radius: 40px;
  height: 48px;
`

const WebmentionsWrapper = props => {
  const { siteUrl } = useSiteMetadata()
  const currentUrl = siteUrl + '/' + props.slug

  const [likesUsers, setLikesUsers] = useState([])
  const [retweets, setRetweets] = useState(0)
  const [likes, setLikes] = useState(0)
  useEffect(() => {
    fetch(`https://webmention.io/api/count.json?target=${currentUrl}/`)
      .then(response => response.json())
      .then(resultData => {
        setLikes(resultData.type.like || 0)
        setRetweets(resultData.type.repost || 0)
      })
  }, [])
  useEffect(() => {
    fetch(
      `https://webmention.io/api/mentions.jf2?per-page=100&target=${currentUrl}/`
    )
      .then(response => response.json())
      .then(resultData => {
        const mentions = resultData.children
        setLikesUsers(mentions.filter(m => m['wm-property'] === 'like-of'))
      })
  }, [])

  return (
    <div>
      <MentionTitle>Webmentions</MentionTitle>
      <Bull />
      <LikeContainer>
        {likes} <LikeIcon height="24px" width="24px" />
      </LikeContainer>
      <RetweetContainer>
        {retweets} <RetweetIcon height="24px" width="24px" />
      </RetweetContainer>

      {likesUsers.length > 0 && (
        <LikeListContainer>
          <LikedByImg
            src={BirdHeartIcon}
            alt="Liked by:"
            height="48px"
            width="56px"
          />
          <UserLikeList>
            {likesUsers.map(mention => (
              <UserLikeListItem key={`liked-by-${mention['wm-id']}`}>
                <a href={mention.author.url}>
                  <UserImg
                    src={mention.author.photo}
                    alt={mention.author.name}
                    width="48px"
                    height="48px"
                  />
                </a>
              </UserLikeListItem>
            ))}
          </UserLikeList>
        </LikeListContainer>
      )}

      <Text>
        <Link href={`https://twitter.com/search?q=${currentUrl}`}>
          You can like or tweet about this post
        </Link>{' '}
        and it will show up here!
      </Text>
    </div>
  )
}

export default WebmentionsWrapper
