import React from 'react'
import styled from 'styled-components'
import { SectionCategory, SectionTitle } from './Common'

const Content = styled.p``

const Interests = props => {
  return (
    <SectionCategory>
      <SectionTitle>Interests</SectionTitle>
      <Content>{props.hobbies}</Content>
    </SectionCategory>
  )
}

export default Interests
