import React from 'react'
import styled from 'styled-components'

const MessageWrapper = styled.aside`
  color: var(--color-grey500);
  box-sizing: border-box;
  background-color: #bfe2ff;
  border-left: 5px solid #0165b7;
  margin: 30px 0px;
  padding: 20px;
  border-radius: 0 8px 8px 0;

  a {
    color: var(--color-grey500); // for darkmode
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

const Info = ({ children, title }) => {
  return (
    <MessageWrapper>
      {title && <MessageHeader>{title}</MessageHeader>}
      {children}
    </MessageWrapper>
  )
}

export default Info
