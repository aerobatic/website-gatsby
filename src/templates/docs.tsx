import * as React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-mdx';
import { MDXProvider } from '@mdx-js/tag';
import styled from 'styled-components';
import mdxComponents from '../components/mdx';
import Page from '../components/Page';
import IndexLayout from '../layouts';
import MdxContainer from '../components/mdx/Container';
import PromoFooter from '../components/PromoFooter';
import SidebarNav, { ISidebarLink } from '../components/SidebarNav';

import KeyIcon from '../icons/key';
import AsteriskIcon from '../icons/asterisk';

interface DocsTemplateProps {
  location: Location;
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

const DOC_LINKS: ISidebarLink[] = [
  { title: 'Getting Started', slug: 'getting-started' },
  { title: 'Overview', slug: 'overview' },
  { title: 'Deployment', slug: 'deployment' },
  { title: 'CLI', slug: 'cli' },
  { title: 'Static Website Serving', slug: 'static-serving' },
  { title: 'Custom Domains / SSL', slug: 'custom-domains-ssl' },
  { title: 'Static Site Generators', slug: 'static-site-generators' },
  { title: 'Configuration', slug: 'configuration' },
  { title: 'Access Control', slug: 'access-control', icon: <KeyIcon /> },
  { title: 'Site Optimizer', slug: 'site-optimizer' },
  { title: 'Plugins', slug: 'plugins' },
  { title: "What's New", slug: 'whats-new', icon: <AsteriskIcon width="18px" height="18px" /> }
];

const DocsTemplate: React.SFC<DocsTemplateProps> = ({ data, location }) => {
  return (
    <IndexLayout location={location}>
      <Page marginTop="20px">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <SidebarNav links={DOC_LINKS} pathPrefix="docs/" />
            </div>
            <div className="col-md-9">
              <StyledHeading>{data.mdx.frontmatter.title}</StyledHeading>
              <MdxContainer>
                <MDXProvider components={mdxComponents}>
                  <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
                </MDXProvider>
              </MdxContainer>
              <PromoFooter />
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
