'use strict';

const path = require('path');
const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Sometimes, optional fields tend to get not picked up by the GraphQL
  // interpreter if not a single content uses it. Therefore, we're putting them
  // through `createNodeField` so that the fields still exist and GraphQL won't
  // trip up. An empty string is still required in replacement to `null`.

  switch (node.internal.type) {
    case 'Mdx': {
      const { slug, layout, date } = node.frontmatter;
      const { relativePath } = getNode(node.parent);
      // const value = createFilePath({ node, getNode });

      // let slug = permalink;

      // if (!slug) {
      //   slug = `/${relativePath.replace('.md', '')}/`;
      // }

      // Used to generate URL to view this content.
      createNodeField({
        node,
        name: 'slug',
        value: slug || ''
      });

      // Used to determine a page layout.
      createNodeField({
        node,
        name: 'layout',
        value: layout || ''
      });

      createNodeField({
        name: 'keywords',
        node,
        value: node.frontmatter.keywords || []
      });

      // createNodeField({
      //   node,
      //   name: 'description',
      //   value: description
      // });
    }
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components')
      }
    }
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // const fileRegex = '"/blog/.*.md$/"';
  const fileRegex = '"/blog/.*announcing-i18n-plugin.md$/"';

  const { data, errors } = await graphql(`
    query {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            excerpt(pruneLength: 250)
            frontmatter {
              title
              slug
              date(formatString: "DDDD, MMM DD, YYYY")
            }
            fields {
              slug
            }
            code {
              scope
            }
          }
        }
      }
    }
  `);

  // const allBlogPosts = await graphql(`
  //   {
  //     query {
  //     allMdx(filter: { fileAbsolutePath: { regex: ${fileRegex} } }, sort: { order: DESC, fields: [frontmatter___date] }) {
  //       edges {
  //         node {
  //           excerpt(pruneLength: 250)
  //           id
  //           fields {
  //             slug
  //           }
  //           frontmatter {
  //             slug
  //             title
  //             date(formatString: "DDD, MMM DD, YYYY")
  //           }
  //           code {
  //             scope
  //           }
  //         }
  //       }
  //     }
  //   }
  //   }`);

  if (errors) {
    console.error(errors);
    throw new Error(errors);
  }

  const { edges } = data.allMdx;

  edges.forEach(({ node }, index) => {
    const { slug, layout, date } = node.frontmatter;

    const prev = index === 0 ? null : edges[index - 1].node;
    const next = index === edges.length - 1 ? null : edges[index + 1].node;

    console.log(`Create page for slug ${slug}`);
    createPage({
      path: `/blog/${slug}/`,
      // This will automatically resolve the template to a corresponding
      // `layout` frontmatter in the Markdown.
      //
      // Feel free to set any `layout` as you'd like in the frontmatter, as
      // long as the corresponding template file exists in src/templates.
      // If no template is set, it will fall back to the default `page`
      // template.
      //
      // Note that the template has to exist first, or else the build will fail.
      component: componentWithMDXScope(path.resolve(`./src/templates/post.tsx`), node.code.scope, __dirname),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
        date,
        prev,
        next
      }
    });
  });
};
