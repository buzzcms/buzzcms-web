/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')

const gatsbyRemarkPlugins = [
  {
    resolve: 'gatsby-remark-smartypants',
    options: {
      dashes: 'oldschool',
    },
  },
  {
    resolve: 'gatsby-remark-images',
    options: {
      maxWidth: 1200,
    },
  },
  {
    resolve: 'gatsby-remark-copy-linked-files',
    options: {},
  },
]

module.exports = {
  siteMetadata: {
    title: 'Buzzcms',
    author: 'Buzzcms',
    description: 'Next generation headless cms, built marketer & site owner',
    siteUrl: 'https://www.buzzcms.co',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        '~': path.join(__dirname, 'src'),
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Open Sans`,
            variants: [`400`, `700`],
            subsets: ['vietnamese'],
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'blog',
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'template',
        path: `${__dirname}/content/templates`,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#ff5700',
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: gatsbyRemarkPlugins,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],
        gatsbyRemarkPlugins,
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        /**
         * no need to specify the other options, since they will be merged with this
         */
        feeds: [
          {
            title: 'Feed',
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(({ node }) => {
                return {
                  ...node.frontmatter,
                  description: node.excerpt,
                  url: site.siteMetadata.siteUrl + node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + node.frontmatter.path,
                  custom_elements: [{ 'content:encoded': node.html }],
                }
              })
            },
            query: `
              {
                allMdx(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { draft: { ne: true } } }
                ) {
                  edges {
                    node {
                      frontmatter {
                        path
                        title
                        date
                      }
                      excerpt
                      html
                    }
                  }
                }
              }
            `,
            output: 'rss.xml',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-typescript',
        short_name: 'GatsbyTS',
        start_url: '/',
        background_color: '#f7f0eb',
        theme_color: '#a2466c',
        display: 'minimal-ui',
        icons: [
          {
            // Everything in /static will be copied to an equivalent
            // directory in /public during development and build, so
            // assuming your favicons are in /static/favicon,
            // you can reference them here
            src: '/favicon/192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon/512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
  ],
}
