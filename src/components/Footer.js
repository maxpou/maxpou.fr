import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import useSiteMetadata from '../hooks/use-site-config'
import { colors } from '../tokens'

const FooterWrapper = styled.footer`
  text-align: left;
  padding-top: 30px;
  padding-bottom: 50px;
  background-color: ${colors.primary};
  color: ${colors.textLightest};
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;

  & nav {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    max-width: 900px;
    margin: 0 auto;

    .footer-col {
      flex: 1 auto;
      display: inline-flex;
      flex-direction: column;
      margin-bottom: 1em;
      padding-right: 1em;
    }
  }

  & a {
    color: ${colors.textLightest};
    font-weight: bold;

    &:hover {
      color: ${colors.textLightestHover};
      /* border-bottom: 1px dotted ${colors.textLightestHover}; */
    }
  }

  .footer-col > p {
    margin: 0;
  }
  .footer-title {
    margin: 0 0 1rem;
  }

  .footer-item {
    padding: 0.25rem 0;
    color: ${colors.textLightest};
  }

  .footer-heart {
    color: ${colors.heartFooter};
  }

  .footer-item-text {
    padding: 0.1rem 0;
    color: ${colors.textLightest};
  }

  .footer-header {
    order: 1;
    margin: 0 0.25rem;
    margin-right: 0.25rem;
    padding: 0.25rem;
  }

  @media (max-width: 564px) {
    .footer-col:first-child {
      width: 100%;
    }
  }
`

const Footer = () => {
  const { authorName, websiteHost, footerLinks } = useSiteMetadata()

  const FooterItem = ({ item }) => {
    if (item.url.startsWith('/')) {
      return (
        <span className="footer-item">
          <Link className="footer-link" to={item.url}>
            {item.label}
          </Link>
        </span>
      )
    }
    return (
      <span className="footer-item">
        <a className="footer-link" href={item.url}>
          {item.label}
        </a>
      </span>
    )
  }

  const FooterColumn = ({ column }) => {
    return (
      <div className="footer-col">
        <h5 className="footer-title" key={column.sectionName}>
          {column.sectionName}
        </h5>
        {column.links.map((item, i) => {
          return <FooterItem item={item} key={`footer-column-item-${i}`} />
        })}
      </div>
    )
  }

  return (
    <FooterWrapper>
      <nav>
        <div className="footer-col">
          <h5 className="footer-title">
            {authorName} © {new Date().getFullYear()}
          </h5>
          <p className="footer-item-text">
            Built with{' '}
            <a className="footer-link" href="https://www.gatsbyjs.org">
              Gatsby
            </a>
            .
          </p>
          <p className="footer-item-text">
            Theme using{' '}
            <a
              className="footer-link"
              href="https://github.com/maxpou/gatsby-starter-morning-dew"
            >
              gatsby-starter-morning-dew
            </a>
            .
          </p>
          <p className="footer-item-text">
            Hosted with <span className="footer-heart">❤</span> by{' '}
            <a className="footer-link" href={websiteHost.url}>
              {websiteHost.name}
            </a>
            .
          </p>
        </div>
        {footerLinks.map((column, i) => {
          return <FooterColumn column={column} key={`footer-column-${i}`} />
        })}
      </nav>
    </FooterWrapper>
  )
}

export default Footer
