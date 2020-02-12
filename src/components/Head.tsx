import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Helmet } from 'react-helmet'

import { Site } from '~/generated/graphql'

export default function Head() {
  const data = useStaticQuery<{
    site: Site
  }>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)
  const siteMetadata = data.site.siteMetadata
  if (!siteMetadata) {
    return null
  }
  return (
    <Helmet
      titleTemplate={`%s - ${siteMetadata.title}`}
      defaultTitle={siteMetadata.title}
      meta={[
        {
          name: 'description',
          content: siteMetadata.description,
        },
        {
          name: 'keywords',
          content: 'gatsby, gatsbyjs, sample, demo, typescript',
        },
      ]}
    />
  )
}
