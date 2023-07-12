import React from 'react'
import styled from 'styled-components'
import WarningIcon from '../icons/warning.js'

const MessageWrapper = styled.aside`
  color: var(--color-grey500);
  box-sizing: border-box;
  background-color: #fdf4ba;
  border-left: 5px solid var(--color-grey600);
  margin: 30px 0px;
  padding: 20px;
  border-radius: 0 8px 8px 0;

  & a {
    color: var(--color-primary);
  }
`
const MessageHeader = styled.div`
  font-weight: bold;
  & > svg {
    position: relative;
    top: 5px;
    width: 25px;
    height: 25px;
    padding-right: 5px;
  }
`

const Warning = ({ children, title }) => {
  return (
    <MessageWrapper>
      <MessageHeader>
        <WarningIcon />
        {title}
      </MessageHeader>
      <div>{children}</div>
    </MessageWrapper>
  )
}

export default Warning
