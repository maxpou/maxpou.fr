import React from 'react'
import styled from 'styled-components'
import { SectionCategory, SectionTitle, Link } from './Common'
import cleanupUrl from '../lib/cleanupUrl'
import EmailIcon from './icons/email'
import GithubIcon from './icons/github'
import LinkedinIcon from './icons/linkedin'
import TwitterIcon from './icons/twitter'
import WebIcon from './icons/web'

const Content = styled.p`
  line-height: 1.4;
`

const ProfileLink = styled(Link)`
  & > :first-child {
    margin-right: 3px;
  }
`
const ageShown = age => `${age} years old`

const formatPhone = phone =>
  phone.replace(/(\d{3})(\d{2})(\d{3})(\d{4})/, '$1 $2 $3 $4')

const icons = {
  email: <EmailIcon />,
  github: <GithubIcon />,
  linkedin: <LinkedinIcon />,
  twitter: <TwitterIcon />,
  web: <WebIcon />,
}

const Profile = basics => {
  return (
    <SectionCategory>
      <SectionTitle>About</SectionTitle>
      <Content>
        {basics.nationality},&nbsp;
        {basics.age && ageShown(basics.age)}
      </Content>
      <Content>
        <ProfileLink href={`tel:${basics.phone}`}>
          {formatPhone(basics.phone)}
        </ProfileLink>
      </Content>
      <Content>
        <ProfileLink href={`mailto:${basics.email}`}>
          {icons.email}
          {basics.email}
        </ProfileLink>
      </Content>
      <Content>
        <ProfileLink href={basics.website}>
          {icons.web}
          {cleanupUrl(basics.website)}
        </ProfileLink>
      </Content>
      {basics.profiles.map((link, i) => (
        <Content key={i}>
          <ProfileLink href={link.url}>
            {icons[link.network.toLowerCase()]}
            {cleanupUrl(link.url)}
          </ProfileLink>
        </Content>
      ))}
    </SectionCategory>
  )
}

export default Profile
