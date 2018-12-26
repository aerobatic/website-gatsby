import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-mdx';
import { MDXProvider } from '@mdx-js/tag';
import styled from 'styled-components';
import mdxComponents from '../components/mdx';
import Page from '../components/Page';
import IndexLayout from '../layouts';
import { colors } from '../styles/variables';
import MdxContainer from '../components/mdx/Container';

interface DocsTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    mdx: {
      code: { body: string };
      frontmatter: {
        title: string;
      };
    };
  };
}

const StyledHeading = styled.h1`
  font-weight: 300;
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.8em;
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

const Footer = styled.footer`
  margin-top: 20px;
  padding: 15px;
  background-color: ${colors.lightGray};
  h3 {
    margin: 0 0 10px 0;
  }
  p {
    margin: 0;
    margin-bottom: 10px;
  }
`;

const DocsTemplate: React.SFC<DocsTemplateProps> = ({ data }) => {
  return (
    <IndexLayout>
      <Page marginTop="20px">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Sidebar>
                <ul>
                  {/* {sidebarLinks.map(({ node }) => (
                    <li key={node.id}>
                      <Link activeClassName="active" to={`/blog/${node.frontmatter.slug}/`}>
                        {node.frontmatter.title}
                      </Link>
                    </li>
                  ))} */}
                </ul>
              </Sidebar>
            </div>
            <div className="col-md-9">
              <StyledHeading>{data.mdx.frontmatter.title}</StyledHeading>
              <MdxContainer>
                <MDXProvider components={mdxComponents}>
                  <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
                </MDXProvider>
              </MdxContainer>
              <Footer>
                <h3>Ready to try Aerobatic?</h3>
                <p>You can have your first website live in 30 seconds!</p>
                <a
                  className="btn btn-success btn-lg"
                  rel="external"
                  target="_blank"
                  href="https://dashboard.aerobatic.com/register"
                >
                  Create free account
                </a>
              </Footer>
            </div>
          </div>
        </div>
      </Page>
    </IndexLayout>
  );
};

export default DocsTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`;
