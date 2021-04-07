import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import Header from './Header'
import Footer from './Footer'
import 'prismjs/themes/prism-tomorrow.css'
import { GlobalStyle } from './Commons'
import { media } from '../tokens'

const SiteContent = styled.div`
  margin: 0 0;
  background-color: var(--color-siteBackground);

  @media ${media.medium} {
    padding: 60px 0;
  }
`

class Template extends React.Component {
  render() {
    const { children } = this.props

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
        <Header />
        <SiteContent>{children}</SiteContent>
        <Footer />
      </>
    )
  }
}

export default Template
