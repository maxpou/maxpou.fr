import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { colors } from '../tokens'

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Lato", sans-serif;
  color: ${colors.text};
  background-color: ${colors.background};
}

@media print {
  @page {
    size: A4;
    margin: 10mm 17mm 10mm 17mm;
  }
  html, body {
    width: 210mm;
    height: 282mm;
    font-size: 14px;
    background: #FFF;
    overflow: visible;
  }
  body {
    padding-top: 0mm;
  }
}
`

export const SectionTitle = styled.h2`
  display: inline-block;
  color: ${colors.text};
  margin-bottom: 10px;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    margin-top: -1px;
    background-color: ${colors.primary};
  }
`

export const SectionCategory = styled.section`
  margin-bottom: 20px;
  page-break-inside: avoid;
`

export const Link = styled.a.attrs(props => ({
  target: '_blank',
  rel: 'noopener noreferrer',
}))`
  color: ${colors.text};
  text-decoration: none;

  &:hover {
    border-bottom: 1px solid ${colors.link};
    color: ${colors.textLight};
  }
`
