/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const { kebabCase } = require('lodash')
const { createRemoteFileNode } = require('gatsby-source-filesystem')

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      title: String!
      featuredImgUrl: String
      featuredImgAlt: String
    }
  `)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  // For all MarkdownRemark nodes that have a featured image url, call createRemoteFileNode
  if (node.internal.type === 'Mdx' && !!node.frontmatter.featuredImgUrl) {
    const fileNode = await createRemoteFileNode({
      url: node.frontmatter.featuredImgUrl, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    })
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.featuredImg___NODE = fileNode.id
    }
  }
}

function groupCountBy(field, edges) {
  const groupCounts = edges.reduce((acc, { node }) => {
    const groups = node.frontmatter[field] || []
    groups.forEach(group => {
      acc[group] = (acc[group] || 0) + 1
    })
    return acc
  }, {})

  return Object.entries(groupCounts)
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  function createContentListPages({
    itemTotal,
    prefix,
    component,
    context,
    limit = 24,
  }) {
    const pageTotal = Math.ceil(itemTotal / limit)

    for (let page = 1; page <= pageTotal; page++) {
      const path = page > 1 ? `${prefix}/${page}` : `${prefix}`
      const skip = (page - 1) * limit

      createPage({
        path,
        component,
        context: {
          ...context,
          itemTotal,
          limit,
          page,
          pageTotal,
          prefix,
          skip,
        },
      })
    }
  }

  const BlogTemplate = path.resolve('src/templates/BlogTemplate.tsx')
  const TagTemplate = path.resolve('src/templates/TagTemplate.tsx')
  const SingleTemplate = path.resolve('src/templates/SingleTemplate.tsx')

  const { data, errors } = await graphql(`
    {
      allMdx(
        filter: {
          frontmatter: { draft: { ne: true } }
          fileAbsolutePath: { regex: "/blog/" }
        }
      ) {
        edges {
          node {
            parent {
              ... on File {
                name
                sourceInstanceName
              }
            }
            frontmatter {
              path
              tags
            }
          }
        }
      }
    }
  `)

  if (errors) {
    reporter.panicOnBuild('Error fetching data', errors)
    return
  }

  const edges = data.allMdx.edges

  edges.forEach(({ node }) => {
    const { frontmatter, parent } = node
    const path =
      frontmatter.path || `/${parent.sourceInstanceName}/${parent.name}`
    createPage({
      path,
      component: SingleTemplate,
    })
  })

  reporter.info(`Articles (${edges.length})`)

  createContentListPages({
    itemTotal: edges.length,
    prefix: '/blog',
    component: BlogTemplate,
  })

  reporter.info(`Index (${Math.ceil(edges.length / 24)})`)

  groupCountBy('tags', edges).forEach(([tag, itemTotal]) => {
    createContentListPages({
      itemTotal,
      prefix: `/tags/${kebabCase(tag)}`,
      component: TagTemplate,
      context: { tag },
    })

    reporter.info(`Tag: ${tag} (${Math.ceil(itemTotal / 24)})`)
  })
}
