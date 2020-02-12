/** @jsx jsx */

import { Link } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import { jsx } from 'theme-ui'

import Card from '~/components/Card'
import { Mdx } from '~/generated/graphql'

export default function PostCard({ node }: { node: Mdx }) {
  const { path, title, date } = node.frontmatter || {}
  return (
    <Card sx={{ p: 0 }}>
      <Link to={path || '/blog'}>
        {node.featuredImg?.childImageSharp?.fluid && (
          <GatsbyImage fluid={node.featuredImg?.childImageSharp?.fluid} />
        )}
      </Link>
      <div sx={{ p: [2, 3] }}>
        <Link to={path || '/blog'}>
          <h3 sx={{ mt: 1, mb: 2 }}>{title}</h3>
        </Link>
        <div>{date}</div>
      </div>
    </Card>
  )
}
