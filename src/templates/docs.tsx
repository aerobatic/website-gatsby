import * as React from 'react';
import { graphql, Link } from 'gatsby';
import classnames from 'classnames';
import { MDXRenderer } from 'gatsby-mdx';
import { MDXProvider } from '@mdx-js/tag';
import styled from 'styled-components';
import mdxComponents from '../components/mdx';
import Page from '../components/Page';
import IndexLayout from '../layouts';
import { colors } from '../styles/variables';
import MdxContainer from '../components/mdx/Container';
import PromoFooter from '../components/PromoFooter';

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

const Sidebar = styled.section`
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style-type: none;
    padding: 0;
  }
  a {
    color: ${colors.gray};
    padding: 10px;
    display: block;
    &:hover {
      color: ${colors.darkGray};
      text-decoration: none;
      background-color: ${colors.hoverTile};
    }

    svg {
      margin-left: 8px;
      fill: ${colors.orange};
    }
  }
  a.active {
    font-weight: bold;
    color: ${colors.darkGray};
    &:hover {
      text-decoration: none;
    }

    &:active,
    &:focus {
      text-decoration: none;
    }

    svg {
      fill: ${colors.orange};
    }
  }
`;

interface DocSection {
  title: string;
  slug: string;
  children?: DocSection[];
  icon?: React.ReactNode;
}

const DOC_LINKS: DocSection[] = [
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
              <Sidebar>
                <ul>
                  {DOC_LINKS.map(link => (
                    <li key={link.slug}>
                      <Link
                        className={classnames({
                          active: location.pathname.startsWith(`/docs/${link.slug}`)
                        })}
                        to={`/docs/${link.slug}/`}
                      >
                        {link.title}
                        {link.icon && link.icon}
                      </Link>
                    </li>
                  ))}
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
