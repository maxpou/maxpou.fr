import React from 'react'
import styled from 'styled-components'
import QrCode from './qrcode'

const HeaderContainer = styled.header`
  vertical-align: middle;
  text-align: center;
  width: 100%;
  margin-bottom: 15px;
  padding: 8px;
  background-color: var(--color-cv-primary);
`

const Name = styled.h1`
  padding-bottom: 5px;
`

const Description = styled.p`
  font-size: 1.1em;
`

const Header = props => (
  <HeaderContainer>
    <Name>{props.basics.name}</Name>
    <Description>{props.basics.title}</Description>
    <QrCode url={props.basics.cvUrl} />
  </HeaderContainer>
)

export default Header
