import { graphql, Link } from 'gatsby'
import { kebabCase } from 'lodash'
import React from 'react'
import Helmet from 'react-helmet'

import { MdxConnection } from '~/generated/graphql'

import { Layout } from '../components/Layout'

interface TagsPageProps {
  readonly data: {
    allMdx: MdxConnection
  }
}

const TagsPage = ({ data }: TagsPageProps) => {
  return (
    <Layout>
      <Helmet title="Tags" />
      <div>
        <h2>Tags</h2>
        <ul>
          {data.allMdx.group.map(({ fieldValue: tag, totalCount }) => (
            <li key={tag}>
              <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link> ({totalCount})
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default TagsPage

export const query = graphql`
  query TagListPage {
    allMdx(filter: { frontmatter: { draft: { ne: true } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
