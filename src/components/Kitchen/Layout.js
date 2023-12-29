import React from 'react'
import { Helmet } from 'react-helmet'
import { GlobalStyle } from '../Commons'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Footer = styled.footer`
  padding: 20px;
  background-color: var(--color-primary);
  color: var(--color-white);
  text-align: center;
`

const FooterLink = styled(Link)`
  color: var(--color-white);
  &:hover {
    color: var(--color-white);
    text-decoration: underline;
  }
`

export const Layout = ({ children }) => {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap"
          media="print"
          onload="this.media='all'"
        />
      </Helmet>
      <GlobalStyle />
      {children}
      <Footer>
        <FooterLink to="/">Maxence Poutord</FooterLink> ©{' '}
        {new Date().getFullYear()}
      </Footer>
    </>
  )
}
