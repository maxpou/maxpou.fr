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

const Info = ({ children }) => {
  return <MessageWrapper>{children}</MessageWrapper>
}

export default Info
