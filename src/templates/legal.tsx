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
import SidebarNav from '../components/SidebarNav';
import { INavLink } from '../types';
import { breakpoints } from '../styles/variables';
import MobileNavSelect from '../components/MobileNavSelect';

interface LegalTemplateProps {
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

const StyledTemplate = styled.div`
  @media (max-width: ${breakpoints.md}px) {
    .sidebar {
      display: none;
    }
  }
`;

const LEGAL_LINKS: INavLink[] = [
  { title: 'Terms of Service', slug: 'tos' },
  { title: 'Acceptable Use Policy', slug: 'aup' },
  { title: 'Service Level Agreement', slug: 'sla' },
  { title: 'Privacy', slug: 'privacy' },
  { title: 'Copyright', slug: 'copyright' }
];

const DocsTemplate: React.SFC<LegalTemplateProps> = ({ data, location }) => {
  return (
    <IndexLayout location={location}>
      <Page marginTop="20px">
        <StyledTemplate className="container">
          <div className="row">
            <div className="col-md-3 sidebar">
              <SidebarNav links={LEGAL_LINKS} pathPrefix="legal/" />
            </div>
            <div className="col-md-9">
              <MobileNavSelect links={LEGAL_LINKS} pathPrefix="legal/" location={location} />
              <StyledHeading>{data.mdx.frontmatter.title}</StyledHeading>
              <MdxContainer>
                <MDXProvider components={mdxComponents}>
                  <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
                </MDXProvider>
              </MdxContainer>
              <PromoFooter />
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
      code {
        body
      }
    }
  }
`;
