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
        extensions: ['.md', '.mdx']
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'QuickStarts',
        path: `${__dirname}/src/data/quickstarts`
      }
    },
    {
      resolve: 'gatsby-transformer-json',
      options: {
        path: `./src/data/**/*.json`
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap'
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
    //       output: '/feed.xml',
    //       title: 'Aerobatic RSS Feed'
    //     }
    //   ]
    // },
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
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-48559935-3'
      }
    }
  ]
};
