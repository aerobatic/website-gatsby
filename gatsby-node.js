'use strict';

const path = require('path');
const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Sometimes, optional fields tend to get not picked up by the GraphQL
  // interpreter if not a single content uses it. Therefore, we're putting them
  // through `createNodeField` so that the fields still exist and GraphQL won't
  // trip up. An empty string is still required in replacement to `null`.

  switch (node.internal.type) {
    case 'Mdx': {
      const { slug, layout, date } = node.frontmatter;
      // const { relativePath } = getNode(node.parent);

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

const createBlogPosts = async (createPage, graphql) => {
  const { data, errors } = await graphql(`
    query {
      allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { regex: "/blog/.*.mdx$/" } }
      ) {
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

  if (errors) {
    console.error(errors);
    throw new Error(errors);
  }

  const { edges } = data.allMdx;

  edges.forEach(({ node }, index) => {
    const { slug, date } = node.frontmatter;

    const prev = index === 0 ? null : edges[index - 1].node;
    const next = index === edges.length - 1 ? null : edges[index + 1].node;

    createPage({
      path: `/blog/${slug}/`,
      component: componentWithMDXScope(
        path.resolve(`./src/templates/post.tsx`),
        node.code.scope,
        __dirname
      ),
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

const createDocPages = async (createPage, graphql) => {
  const { data, errors } = await graphql(`
    query {
      allMdx(filter: { fileAbsolutePath: { regex: "/docs/.*.mdx$/" } }) {
        edges {
          node {
            id
            frontmatter {
              slug
              title
              plugin
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

  if (errors) {
    console.error(errors);
    throw new Error(errors);
  }

  const { edges } = data.allMdx;

  edges.forEach(({ node }, index) => {
    const { slug, plugin } = node.frontmatter;

    createPage({
      path: plugin ? `/docs/plugins/${slug}/` : `/docs/${slug}/`,
      component: componentWithMDXScope(
        path.resolve(`./src/templates/docs.tsx`),
        node.code.scope,
        __dirname
      ),
      context: {
        slug
      }
    });
  });
};

const createLegalPages = async (createPage, graphql) => {
  const { data, errors } = await graphql(`
    query {
      allMdx(filter: { fileAbsolutePath: { regex: "/legal/.*.mdx$/" } }) {
        edges {
          node {
            id
            frontmatter {
              slug
              title
              plugin
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

  if (errors) {
    console.error(errors);
    throw new Error(errors);
  }

  const { edges } = data.allMdx;

  edges.forEach(({ node }, index) => {
    const { slug, plugin } = node.frontmatter;

    createPage({
      path: `/legal/${slug}/`,
      component: componentWithMDXScope(
        path.resolve(`./src/templates/legal.tsx`),
        node.code.scope,
        __dirname
      ),
      context: {
        slug
      }
    });
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  await Promise.all([
    await createDocPages(createPage, graphql),
    await createBlogPosts(createPage, graphql),
    await createLegalPages(createPage, graphql)
  ]);
};
