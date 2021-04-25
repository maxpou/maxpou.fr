import React from 'react'
import { withPrefix } from 'gatsby'
import styled from 'styled-components'
import useSiteMetadata from '../hooks/use-site-config'
import useSiteImages from '../hooks/use-site-images'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'

const HeroContainer = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  height: 400px;
`

const TitleContainer = styled.div`
  grid-area: 1/1;
  position: relative;
  place-items: center;
  display: grid;
`

const HeroTitle = styled.h1`
  text-align: center;
  font-weight: 700;
  font-size: 3rem;
  margin: 10px 50px;
  color: var(--color-white);
  text-shadow: 1px 1px 4px rgba(34, 34, 34, 0.85);
`

const HeroSubTitle = styled.h2`
  margin: 10px 50px;
  color: var(--color-white);
  text-shadow: 1px 1px 4px rgba(34, 34, 34, 0.85);
`

const Hero = props => {
  const siteCoverPath = `../../content/images/cover.jpg`
  const heroImg = getImage(props.heroImg) || siteCoverPath
  const isDynamic = !!getImage(props.heroImg)

  return (
    <HeroContainer style={{ display: 'grid' }}>
      {isDynamic && (
        <GatsbyImage
          style={{
            gridArea: '1/1',
          }}
          layout="fullWidth"
          placeholder="blurred"
          alt=""
          image={heroImg}
          formats={['auto', 'webp', 'avif']}
        />
      )}
      {!isDynamic && (
        <StaticImage
          style={{
            gridArea: '1/1',
          }}
          layout="fullWidth"
          placeholder="blurred"
          alt=""
          src={siteCoverPath}
          formats={['auto', 'webp', 'avif']}
        />
      )}
      <TitleContainer>
        <div>
          <HeroTitle>{props.title}</HeroTitle>
          {props.subTitle && <HeroSubTitle>{props.subTitle}</HeroSubTitle>}
        </div>
      </TitleContainer>
    </HeroContainer>
  )
}

export default Hero
