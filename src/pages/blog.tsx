import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import Page from '../components/Page';
import IndexLayout from '../layouts';

interface IBlogPost {
  id: string;
  excerpt: string;
  frontmatter: {
    date: string;
    slug: string;
    title: string;
  };
}

interface IBlogIndexPageProps {
  data: {
    allMarkdownRemark: { edges: { node: IBlogPost }[] };
  };
}

const BlogIndexPage = (props: IBlogIndexPageProps) => {
  const posts = props.data.allMarkdownRemark.edges.map(edge => edge.node);

  return (
    <IndexLayout>
      <Page>
        <div className="container">
          {posts.map(post => (
            <Link to={`/blog/${post.frontmatter.slug}/`} key={post.id}>
              {post.frontmatter.title}
            </Link>
          ))}
        </div>
      </Page>
    </IndexLayout>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
          edges {
            node {
              id
              excerpt(pruneLength: 250)
              frontmatter {
                slug
                date(formatString: "MMMM DD, YYYY")
                title
              }
            }
          }
        }
      }
    `}
    render={data => <BlogIndexPage data={data} />}
  />
);
