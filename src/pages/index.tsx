import { graphql } from 'gatsby'
import React from 'react'

import { ContentList } from '~/components/ContentList'
import { MdxConnection } from '~/generated/graphql'

import { Layout } from '../components/Layout'

export default function HomePage({
  data,
}: {
  data: { allMdx: MdxConnection }
}) {
  return (
    <Layout>
      <ContentList edges={data.allMdx.edges} />
    </Layout>
  )
}

export const query = graphql`
  query HomePage {
    allMdx(
      filter: {
        frontmatter: { draft: { ne: true } }
        fileAbsolutePath: { regex: "/blog/" }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 24
    ) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            path
            title
          }
          featuredImg {
            childImageSharp {
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
