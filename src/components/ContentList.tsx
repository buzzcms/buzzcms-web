/** @jsx jsx */

import { jsx } from 'theme-ui'

import { MdxEdge } from '~/generated/graphql'

import PostCard from './PostCard'

interface ContentListProps {
  readonly edges: MdxEdge[]
}

export const ContentList = ({ edges }: ContentListProps) => (
  <ul
    sx={{ display: 'flex', flexWrap: 'wrap', mx: -2, listStyle: 'none', p: 0 }}
  >
    {edges.map(({ node }) => {
      if (!node.frontmatter) {
        return null
      }
      return (
        <li key={node.id} sx={{ p: 2, width: ['100%', '50%', '33.33%'] }}>
          <PostCard node={node} />
        </li>
      )
    })}
  </ul>
)
