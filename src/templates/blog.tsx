import * as React from 'react';
import { graphql } from 'gatsby';

import Page from '../components/Page';
import Container from '../components/Container';
import IndexLayout from '../layouts';

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
    markdownRemark: {
      html: string;
      excerpt: string;
      frontmatter: {
        title: string;
        date: string;
      };
    };
  };
}

const BlogTemplate: React.SFC<BlogTemplateProps> = ({ data }) => {
  return (
    <IndexLayout>
      <Page>
        <Container>
          {data.markdownRemark}
          {/* <h1>{data.markdownRemark.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} /> */}
        </Container>
      </Page>
    </IndexLayout>
  );
};

export default BlogTemplate;

export const query = graphql`
  query BlogTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        slug
      }
    }
  }
`;
