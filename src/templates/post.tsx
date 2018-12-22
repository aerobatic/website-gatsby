import * as React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { MDXProvider } from '@mdx-js/tag';
import mdxComponents from '../components/mdx';
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

const BlogTemplate: React.SFC<BlogTemplateProps> = ({ data }) => {
  console.log(data);
  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>{data.mdx.frontmatter.title}</h1>
          <MDXProvider components={mdxComponents}>
            {/* {JSON.stringify(data.mdx)} */}
            <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
            {/* <div dangerouslySetInnerHTML={{ __html: data.mdx.html }} /> */}
          </MDXProvider>
        </Container>
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
