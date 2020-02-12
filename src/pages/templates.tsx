/** @jsx jsx */

import { graphql } from 'gatsby'
import { jsx } from 'theme-ui'

import { Layout } from '~/components/Layout'
import TemplateCard from '~/components/TemplateCard'
import { MdxConnection } from '~/generated/graphql'

interface TemplatesPageData {
  allMdx: MdxConnection
}

const TemplatesPage = ({ data }: { data: TemplatesPageData }) => {
  return (
    <Layout>
      <h1>Templates</h1>
      <div sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
        {data.allMdx.edges.map(({ node }) => (
          <div key={node.id} sx={{ p: 2, width: ['100%', '50%', '33.33%'] }}>
            <TemplateCard node={node} />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default TemplatesPage

export const query = graphql`
  query TemplatePage {
    allMdx(
      filter: {
        frontmatter: { draft: { ne: true } }
        fileAbsolutePath: { regex: "/template/" }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
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
