import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { Location } from '../types';

import '../styles/bootstrap.css';
import '../styles/global.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LayoutMain from '../components/LayoutMain';
import BackToTop from '../components/BackToTop';

interface ISiteMetadata {
  title: string;
  description: string;
  siteUrl: string;
  keywords: string;
}

interface IProps {
  siteMetadata: ISiteMetadata;
  location: Location;
}

class IndexLayout extends Component<IProps> {
  render() {
    const props = this.props;
    return (
      <main>
        <a id="top" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
        />
        <Helmet
          title={props.siteMetadata.title}
          meta={[
            { name: 'description', content: props.siteMetadata.description },
            { name: 'keywords', content: props.siteMetadata.keywords },
            { name: 'og:image', content: '/opengraph-image.png' },
            { name: 'og:image:width', content: '495' },
            { name: 'og:image:height', content: '259' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:domain', content: props.siteMetadata.siteUrl },
            {
              name: 'twitter:image',
              content: `${props.siteMetadata.siteUrl}/img/twitter-card.png`
            },
            { name: 'twitter:description', content: props.siteMetadata.description }
          ]}
        >
          <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css?family=Muli:400,700" rel="stylesheet" />
        </Helmet>
        <Header title={props.siteMetadata.title} />
        <LayoutMain>
          {props.children}
          <BackToTop />
        </LayoutMain>
        <Footer />
      </main>
    );
  }
}

export default (props: { location: Location; children: any }) => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
            keywords
            siteUrl
          }
        }
      }
    `}
    render={(data: { site: { siteMetadata: ISiteMetadata } }) => (
      <IndexLayout
        siteMetadata={data.site.siteMetadata}
        children={props.children}
        location={props.location}
      />
    )}
  />
);
