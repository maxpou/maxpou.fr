import React from 'react'
import styled from 'styled-components'
import { SectionCategory, SectionTitle } from './Common'

const Category = styled.p`
  font-weight: bold;
  &:not(:first-child) {
    padding-top: 7px;
  }
`

const Content = styled.p`
  padding-left: 10px;
`

const Level = level => {
  return (
    <>
      <Category>{level.level}</Category>
      {level.language.map((language, i) => (
        <Content key={i}>{language}</Content>
      ))}
    </>
  )
}

const Languages = props => {
  return (
    <SectionCategory>
      <SectionTitle>Languages</SectionTitle>
      <div>
        {props.languages.map((level, i) => (
          <Level key={i} {...level} />
        ))}
      </div>
    </SectionCategory>
  )
}

export default Languages
