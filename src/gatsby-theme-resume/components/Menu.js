import React from 'react'
import styled from 'styled-components'
import PrinterIcon from './icons/printer'
import PdfIcon from './icons/pdf'
import { media } from '../tokens'

const MenuContainer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 15px;

  @media print {
    display: none;
  }

  @media ${media.medium} {
    display: none;
  }
`

const MenuButton = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  padding: 5px;
`

const ssrCompatibleWindow = typeof window !== 'undefined' && window

const Menu = () => {
  return (
    <MenuContainer>
      <MenuButton aria-label="Print" onClick={ssrCompatibleWindow.print}>
        <PrinterIcon />
      </MenuButton>
      <MenuButton
        as="a"
        href="Maxence-Poutord-Resume.pdf"
        aria-label="Download PDF"
        title="Maxence Poutord Resume"
        download
      >
        <PdfIcon />
      </MenuButton>
    </MenuContainer>
  )
}

export default Menu
