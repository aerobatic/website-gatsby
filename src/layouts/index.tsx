import * as React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { Location } from '../types';

import '../styles/bootstrap.css';
import '../styles/global.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LayoutRoot from '../components/LayoutRoot';
import LayoutMain from '../components/LayoutMain';
import BackToTop from '../components/BackToTop';

type StaticQueryProps = {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      siteUrl: string;
      keywords: string;
    };
  };
};

interface IProps {
  location: Location;
}

const IndexLayout: React.SFC<IProps> = props => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
            keywords
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => (
      <LayoutRoot>
        <a id="top" />
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { name: 'keywords', content: data.site.siteMetadata.keywords }
          ]}
        >
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css?family=Muli:400,700" rel="stylesheet" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
          />
          <link
            rel="alternate"
            href={`${data.site.siteMetadata.siteUrl}/feed.xml`}
            type="application/rss+xml"
            title="Aerobatic"
          />
        </Helmet>
        <Header title={data.site.siteMetadata.title} location={location} />
        <LayoutMain>
          {props.children}
          <BackToTop />
        </LayoutMain>
        <Footer />
      </LayoutRoot>
    )}
  />
);

export default IndexLayout;
