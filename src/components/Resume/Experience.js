import React from 'react'
import Timeline from './Timeline'
import { SectionTitle } from './Common'

const formatProps = props => {
  return props.map(prop => ({
    title: prop.position,
    subtitle: `${prop.company}, ${prop.location}`,
    period: prop.period,
    content: prop.activities,
  }))
}

const Experience = props => {
  const formatedData = formatProps(props.experiences)
  return (
    <section>
      <SectionTitle>Experience</SectionTitle>
      <Timeline data={formatedData} />
    </section>
  )
}

export default Experience
