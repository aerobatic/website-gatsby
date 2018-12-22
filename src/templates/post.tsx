import * as React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-mdx';
import { MDXProvider } from '@mdx-js/tag';
import styled from 'styled-components';
import mdxComponents from '../components/mdx';
import Page from '../components/Page';
import IndexLayout from '../layouts';
import { colors } from '../styles/variables';
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

const BlogTemplate: React.SFC<BlogTemplateProps> = ({ data }) => {
  console.log(data);
  return (
    <IndexLayout>
      <Page>
        <div className="container">
          <StyledHeading>{data.mdx.frontmatter.title}</StyledHeading>
          <StyledDate>{data.mdx.frontmatter.date}</StyledDate>
          <MdxContainer>
            <MDXProvider components={mdxComponents}>
              <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
            </MDXProvider>
          </MdxContainer>
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
  }
`;
