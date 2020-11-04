import React from 'react'
import styled from 'styled-components'
import cleanupUrl from '../lib/cleanupUrl'

const FooterPrintWrapper = styled.div`
  @media screen {
    display: none;
  }
  @media print {
    position: fixed;
    bottom: 0;
    text-align: center;
    width: 100%;
  }
`

const FooterPrint = ({ name, cvUrl, lastUpdate }) => (
  <FooterPrintWrapper>
    {name} - {cleanupUrl(cvUrl)} - last update {lastUpdate}
  </FooterPrintWrapper>
)

export default FooterPrint
