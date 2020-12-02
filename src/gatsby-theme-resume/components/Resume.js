import React from 'react'
import styled from 'styled-components'
import Menu from '../components/Menu'
import Header from '../components/Header'
import Highlights from '../components/Highlights'
import Experience from '../components/Experience'
import Education from '../components/Education'
import Profile from '../components/Profile'
import Skills from '../components/Skills'
import Languages from '../components/Languages'
import Interests from '../components/Interests'
import FooterPrint from '../components/FooterPrint'
import { media } from '../tokens'

const Layout = styled.div`
  display: flex;
  width: 100%;
  @media ${media.medium} {
    display: block;
  }
`

const LeftColumn = styled.div`
  order: 1;
  width: 30%;

  & > div {
    padding-right: 10px;
  }
  @media ${media.medium} {
    width: 100%;
  }
`

const Main = styled.div`
  order: 2;
  width: 70%;

  @media ${media.medium} {
    width: 100%;
  }
`

const Description = styled.div`
  margin-bottom: 15px;
  line-height: 1.5;
`

const Resume = resume => (
  <>
    <Header basics={resume.basics} />
    <Description>{resume.basics.description}</Description>
    <Menu />
    <Layout>
      <LeftColumn>
        <Profile {...resume.basics} />
        <Skills skills={resume.skills} />
        <Languages languages={resume.languages} />
        <Interests hobbies={resume.hobbies} />
      </LeftColumn>
      <Main>
        <Highlights highlights={resume.highlights} />
        <Experience experiences={resume.experiences} />
        <Education education={resume.education} />
      </Main>
    </Layout>
    <FooterPrint {...resume.basics} />
  </>
)

export default Resume
