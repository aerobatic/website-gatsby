'use strict';

module.exports = {
  siteMetadata: {
    title: 'Aerobatic',
    description: 'Turbocharged static hosting',
    siteUrl: 'https://www.aerobatic.com',
    keywords: 'static hosting, cdn',
    author: {
      name: 'David Von Lehman',
      url: '',
      email: 'david@aerobatic.com'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: ['.md', '.mdx'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true
            }
          }
        ]
      }
    },

    // {
    //   resolve: 'gatsby-plugin-feed',
    //   options: {
    //     query: `
    //       {
    //         site {
    //           siteMetadata {
    //             title
    //             description
    //             siteUrl
    //             site_url: siteUrl
    //           }
    //         }
    //       }
    //     `
    //   },
    //   feeds: [
    //     {
    //       serialize: ({ query: { site, allMdx } }) => {
    //         return allMdx.edges.map(edge => {
    //           return Object.assign({}, edge.node.frontmatter, {
    //             description: edge.node.excerpt,
    //             date: edge.node.frontmatter.date,
    //             url: site.siteMetadata.siteUrl + edge.node.fields.slug,
    //             guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
    //             custom_elements: [{ 'content:encoded': edge.node.html }]
    //           });
    //         });
    //       },
    //       query: `
    //         {
    //           allMdx(
    //             limit: 1000,
    //             sort: { order: DESC, fields: [frontmatter___date] },
    //             filter: {frontmatter: { draft: { ne: true } }}
    //           ) {
    //             edges {
    //               node {
    //                 excerpt
    //                 html
    //                 fields { slug }
    //                 frontmatter {
    //                   title
    //                   date
    //                   slug
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       `,
    //       output: '/rss.xml',
    //       title: 'Aerobatic RSS Feed'
    //     }
    //   ]
    // },
    // {
    //   resolve: 'gatsby-transformer-remark',
    //   options: {
    //     plugins: [
    //       {
    //         resolve: 'gatsby-remark-responsive-iframe',
    //         options: {
    //           wrapperStyle: 'margin-bottom: 1rem'
    //         }
    //       },
    //       'gatsby-remark-prismjs',
    //       'gatsby-remark-copy-linked-files',
    //       'gatsby-remark-smartypants',
    //       {
    //         resolve: 'gatsby-remark-images',
    //         options: {
    //           maxWidth: 1140,
    //           quality: 90,
    //           linkImagesToOriginal: false
    //         }
    //       }
    //     ]
    //   }
    // },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://www.aerobatic.com'
      }
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-emotion',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet'
  ]
};
