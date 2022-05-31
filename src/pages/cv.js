import React from 'react'
import Layout from '../components/Resume/Layout'
import SEO from '../components/Resume/Seo'
import Resume from '../components/Resume/Resume'
import useSiteResume from '../hooks/use-site-resume'

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
