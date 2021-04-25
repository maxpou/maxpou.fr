import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const result = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteTitle
          siteUrl
          siteCover
          authorName
          authorAvatar
          authorDescription
          siteDescription
          seoDescription
          twitterUsername
          defaultLang
          headerTitle
          headerLinks {
            label
            url
          }
          websiteHost {
            name
            url
          }
          footerLinks {
            sectionName
            links {
              label
              url
              rel
            }
          }
        }
      }
    }
  `)
  return result.site.siteMetadata
}

export default useSiteMetadata
