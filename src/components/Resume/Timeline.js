import React from 'react'
import styled from 'styled-components'

const TimelineContainer = styled.div``

const TimelineItem = styled.div`
  display: table;
  table-layout: fixed;
  position: relative;
  width: 100%;
  padding-bottom: 15px;
  page-break-inside: avoid;
`

const Section = styled.div`
  width: 100%;
  display: table-cell;
  padding-left: 25px;
  padding-right: 15px;
`

const Separator = styled.div`
  position: absolute;
  background-color: darkgray;
  width: 1px;
  top: 0;
  left: 10px;
  bottom: 0;

  &::after {
    content: '';
    display: block;
    margin-top: 5px;
    width: 11px;
    height: 11px;
    margin-left: -7px;
    border-radius: 8px;
    border: 2px solid var(--color-cv-primary);
    background-color: var(--color-cv-background);
  }

  @media print {
    border-left: 0.5px solid darkgray;
    border-right: 0.5px solid darkgray;
  }
`

const Title = styled.h3`
  margin-bottom: 5px;
`

const SubTitle = styled.p`
  color: var(--color-cv-textLight);
  margin-bottom: 15px;
`

const Period = styled.p`
  color: var(--color-cv-textLight);
`

const Content = styled.p`
  margin-top: 5px;
  margin-bottom: 10px;
`

const TimeLineItemContainer = props => (
  <TimelineItem>
    <Separator />
    <Section>
      <Title>{props.title}</Title>
      <Period>{props.period}</Period>
      <SubTitle>{props.subtitle}</SubTitle>
      {props.content.map((contentItem, i) => (
        <Content key={`timeline-container-item-${i}`}>{contentItem}</Content>
      ))}
    </Section>
  </TimelineItem>
)

const Timeline = props => {
  return (
    <TimelineContainer>
      {props.data.map((timelineItemData, i) => (
        <TimeLineItemContainer
          key={`timeline-container-${i}`}
          {...timelineItemData}
        />
      ))}
    </TimelineContainer>
  )
}

export default Timeline
