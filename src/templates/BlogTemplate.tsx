import { graphql, Link } from 'gatsby'
import React from 'react'
import { Helmet } from 'react-helmet'

import { ContentList } from '../components/ContentList'
import { Layout } from '../components/Layout'
import { Pager } from '../components/Pager'

interface BlogPageProps {
  readonly data: any
  readonly pageContext: any
}

const BlogTemplate = ({ data, pageContext }: BlogPageProps) => (
  <Layout>
    <Helmet
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <h1>Blog</h1>
    <ContentList edges={data.allMdx.edges} />
    <Pager
      page={pageContext.page}
      prefix={pageContext.prefix}
      total={pageContext.pageTotal}
    />
    <hr />
    <Link to="/tags">All tags</Link>
  </Layout>
)

export default BlogTemplate

export const query = graphql`
  query BlogPage($skip: Int!, $limit: Int!) {
    allMdx(
      filter: {
        frontmatter: { draft: { ne: true } }
        fileAbsolutePath: { regex: "/blog/" }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: $limit
      skip: $skip
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
