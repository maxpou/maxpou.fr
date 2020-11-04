import React from 'react'
import Layout from '../gatsby-theme-resume/components/layout'
import SEO from '../gatsby-theme-resume/components/seo'
import Resume from '../gatsby-theme-resume/components/Resume'
import useSiteResume from '../gatsby-theme-resume/hooks/use-site-resume'

const IndexPage = () => {
  const resume = useSiteResume()

  return (
    <Layout>
      <SEO title={`${resume.basics.name} resume`} />
      <Resume {...resume} />
    </Layout>
  )
}

export default IndexPage
