import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-mdx';
import { MDXProvider } from '@mdx-js/tag';
import styled from 'styled-components';
import mdxComponents from '../components/mdx';
import Page from '../components/Page';
import IndexLayout from '../layouts';
import { colors } from '../styles/variables';
import { IBlogPost } from '../types';
import MdxContainer from '../components/mdx/Container';

interface BlogTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        author: {
          name: string;
          url: string;
        };
      };
    };
    mdx: {
      code: { body: string };
      excerpt: string;
      frontmatter: {
        title: string;
        date: string;
      };
    };
    allMdx: {
      edges: { node: IBlogPost }[];
    };
  };
}

const StyledHeading = styled.h1`
  font-weight: 300;
  margin-top: 0;
  margin-bottom: 10px;
`;

const StyledDate = styled.div`
  color: ${colors.gray};
  margin-bottom: 15px;
  font-style: italic;
`;

const Sidebar = styled.section`
  h3 {
    margin: 0;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style-type: none;
    padding: 10px 0;
    border-bottom: solid 1px ${colors.lightGray};
  }
  a.active {
    color: ${colors.darkGray};
    &:hover {
      text-decoration: none;
    }
  }
`;

const BlogTemplate: React.SFC<BlogTemplateProps> = ({ data }) => {
  console.log(data);
  return (
    <IndexLayout>
      <Page>
        <div className="container">
          <div className="col-md-9">
            <StyledHeading>{data.mdx.frontmatter.title}</StyledHeading>
            <StyledDate>{data.mdx.frontmatter.date}</StyledDate>
            <MdxContainer>
              <MDXProvider components={mdxComponents}>
                <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
              </MDXProvider>
            </MdxContainer>
          </div>
          <div className="col-md-3">
            <Sidebar>
              <h3>Blog Posts</h3>
              <ul>
                {data.allMdx.edges.map(({ node }) => (
                  <li key={node.id}>
                    <Link activeClassName="active" to={`/blog/${node.frontmatter.slug}/`}>
                      {node.frontmatter.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Sidebar>
          </div>
        </div>
      </Page>
    </IndexLayout>
  );
};

export default BlogTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      code {
        body
      }
    }
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }, limit: 20) {
      edges {
        node {
          id
          frontmatter {
            slug
            title
          }
        }
      }
    }
  }
`;
