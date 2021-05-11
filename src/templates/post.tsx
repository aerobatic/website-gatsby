import React from 'react';
import classnames from 'classnames';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-mdx';
import { MDXProvider } from '@mdx-js/tag';
import styled from 'styled-components';
import mdxComponents from '../components/mdx';
import Page from '../components/Page';
import IndexLayout from '../layouts';
import { breakpoints, colors } from '../styles/variables';
import { IBlogPost } from '../types';
import MdxContainer from '../components/mdx/Container';
import PromoFooter from '../components/PromoFooter';
import { legacyNavClassnames } from '../utils';

interface BlogTemplateProps {
  location: Location;
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
  font-size: 1.8em;
`;

const StyledDate = styled.div`
  color: ${colors.gray};
  margin-bottom: 15px;
  font-style: italic;
`;

const Sidebar = styled.section`
  @media (max-width: ${breakpoints.md}px) {
    margin-top: 20px;
  }

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

    &:last-child {
      border-bottom: none;
    }
    &.active {
      a {
        color: ${colors.darkGray};
        &:hover {
          text-decoration: none;
        }
      }
    }
  }
`;

const BlogTemplate: React.SFC<BlogTemplateProps> = ({ data, location }) => {
  return (
    <IndexLayout location={location}>
      <Page marginTop="20px">
        <div className="container">
          <div className="row">
            <div className="col-md-9 markdown">
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
                <ul className={classnames(legacyNavClassnames)}>
                  {data.allMdx.edges.map(({ node }) => (
                    <li
                      key={node.id}
                      className={classnames({
                        active: location.pathname === `/blog/${node.frontmatter.slug}/`
                      })}
                    >
                      <Link to={`/blog/${node.frontmatter.slug}/`}>{node.frontmatter.title}</Link>
                    </li>
                  ))}
                </ul>
              </Sidebar>
            </div>
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
    allMdx(
      filter: { fileAbsolutePath: { regex: "/blog/.*.mdx$/" } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 20
    ) {
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
