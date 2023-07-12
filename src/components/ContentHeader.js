import React, { Fragment } from 'react'
import styled from 'styled-components'
import TagList from './TagList'
import Translations from './Translations'
import Time from './Time'
import { Bull } from './Commons'

const Header = styled.header`
  margin-bottom: 2rem;
  color: var(--color-textSecondary);
  font-size: 0.9em;
`

function ContentHeader({ date, tags, translations }) {
  return (
    <Header>
      {date && <Time date={date} />}
      {date && Array.isArray(tags) && tags.length > 0 && <Bull />}
      {Array.isArray(tags) && tags.length > 0 && (
        <Fragment>
          <TagList tags={tags} />
        </Fragment>
      )}

      {translations && <Translations translations={translations} />}
    </Header>
  )
}

export default ContentHeader
