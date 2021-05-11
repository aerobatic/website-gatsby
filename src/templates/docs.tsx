import * as React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/tag';
import styled from 'styled-components';
import mdxComponents from '../components/mdx';
import Page from '../components/Page';
import IndexLayout from '../layouts';
import MdxContainer from '../components/mdx/Container';
import SidebarNav from '../components/SidebarNav';
import MobileNavSelect from '../components/MobileNavSelect';
import { breakpoints } from '../styles/variables';

import KeyIcon from '../icons/key';
import AsteriskIcon from '../icons/asterisk';
import { INavLink } from '../types';

interface DocsTemplateProps {
  location: Location;
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    mdx: {
      body: string;
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

const StyledTemplate = styled.div`
  @media (max-width: ${breakpoints.md}px) {
    .sidebar {
      display: none;
    }
  }
`;

const DOC_LINKS: INavLink[] = [
  { title: 'Getting Started', slug: 'getting-started' },
  { title: 'Overview', slug: 'overview' },
  { title: 'Deployment', slug: 'deployment' },
  { title: 'CLI', slug: 'cli' },
  { title: 'Static Website Serving', slug: 'static-serving' },
  { title: 'Custom Domains / SSL', slug: 'custom-domains-ssl' },
  { title: 'Static Site Generators', slug: 'static-site-generators' },
  { title: 'Configuration', slug: 'configuration' },
  { title: 'Access Control', slug: 'access-control', icon: <KeyIcon /> },
  { title: 'Plugins', slug: 'plugins' },
  { title: "What's New", slug: 'whats-new', icon: <AsteriskIcon width="18px" height="18px" /> }
];

const DocsTemplate: React.SFC<DocsTemplateProps> = ({ data, location }) => {
  return (
    <IndexLayout location={location}>
      <Page marginTop="20px">
        <StyledTemplate className="container">
          <div className="row">
            <div className="col-md-3 sidebar">
              <SidebarNav links={DOC_LINKS} pathPrefix="docs/" location={location} />
            </div>
            <div className="col-md-9 markdown">
              <MobileNavSelect links={DOC_LINKS} pathPrefix="docs/" location={location} />
              <StyledHeading>{data.mdx.frontmatter.title}</StyledHeading>
              <MdxContainer>
                <MDXProvider components={mdxComponents}>
                  <MDXRenderer>{data.mdx.body}</MDXRenderer>
                </MDXProvider>
              </MdxContainer>
            </div>
          </div>
        </StyledTemplate>
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
      body
    }
  }
`;
