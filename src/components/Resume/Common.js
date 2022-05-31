import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-cv-primary: #ffdc4e;
    --color-cv-link: #3359dc;
    --color-cv-text: #3E4047;
    --color-cv-textLight: #6a6f73;
    --color-cv-background: #ffffff;
  }

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Lato", sans-serif;
  color: var(--color-cv-text);
  background-color: var(--color-cv-background);
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
  color: var(--color-cv-text);
  margin-bottom: 10px;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    margin-top: -1px;
    background-color: var(--color-cv-primary);
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
  color: var(--color-cv-text);
  text-decoration: none;

  &:hover {
    border-bottom: 1px solid var(--color-cv-link);
    color: var(--color-cv-textLight);
  }
`
