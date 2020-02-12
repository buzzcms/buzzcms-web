/** @jsx jsx */

import { Link } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import { jsx } from 'theme-ui'

import Card from '~/components/Card'
import { Mdx } from '~/generated/graphql'

export default function TemplateCard({ node }: { node: Mdx }) {
  const { path, title } = node.frontmatter || {}
  return (
    <Card sx={{ p: 0 }}>
      <Link to={path || '/templates'}>
        {node.featuredImg?.childImageSharp?.fluid && (
          <GatsbyImage fluid={node.featuredImg?.childImageSharp?.fluid} />
        )}
      </Link>
      <div sx={{ p: [2, 3] }}>
        <Link to={path || '/templates'}>{title}</Link>
      </div>
    </Card>
  )
}
