import React from 'react'
import styled from 'styled-components'
import { SectionCategory, SectionTitle, Link } from './Common'
import cleanupUrl from '../../lib/cleanupUrl'

const Highlights = styled.ul`
  padding-left: 18px;
`

const Highlight = styled.li`
  margin-top: 2px;
  margin-bottom: 3px;
`

const ProjectUrl = styled(Link)`
  color: var(--color-cv-link);
  font-weight: normal;
`

const SeeUrl = styled.span`
  font-size: 0.8em;
`

const Projects = props => {
  return (
    <SectionCategory>
      <SectionTitle>Highlights</SectionTitle>
      <Highlights>
        {props.highlights.map((highlight, i) => (
          <Highlight key={i}>
            {highlight.description}

            {highlight.url && (
              <SeeUrl>
                &nbsp;(see{' '}
                <ProjectUrl href={highlight.url}>
                  {cleanupUrl(highlight.url)}
                </ProjectUrl>
                )
              </SeeUrl>
            )}
          </Highlight>
        ))}
      </Highlights>
    </SectionCategory>
  )
}

export default Projects
