import { graphql, Link } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import { ContentList } from '../components/ContentList'
import { Layout } from '../components/Layout'
import { Pager } from '../components/Pager'

interface TagTemplateProps {
  readonly data: any
  readonly pageContext: any
}

const TagTemplate = (props: TagTemplateProps) => {
  const { edges } = props.data.allMdx
  const { page, prefix, pageTotal, tag } = props.pageContext

  return (
    <Layout>
      <Helmet title={`Content Tagged "${tag}"`} />
      <h2>{`Content tagged with "${tag}"`}</h2>
      <ContentList edges={edges} />
      <Pager page={page} prefix={prefix} total={pageTotal} />
      <hr />
      <Link to="/tags">All tags</Link>
    </Layout>
  )
}

export default TagTemplate

export const query = graphql`
  query TagPage($tag: String!, $skip: Int!, $limit: Int!) {
    allMdx(
      filter: { frontmatter: { draft: { ne: true }, tags: { in: [$tag] } } }
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
        }
      }
    }
  }
`
