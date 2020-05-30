import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { IQuickStart } from '../../types';
import QuickStartLayout from '../../layouts/QuickStart';

export default (props: { location: Location }) => (
  <StaticQuery
    query={graphql`
      {
        allJekyllJson {
          edges {
            node {
              id
              slug
              description
              demoAppId
              demoAppName
              siteType
              title
              repoUrl
            }
          }
        }
      }
    `}
    render={(data) => (
      <QuickStartLayout
        quickstarts={data.allJekyllJson.edges.map((edge: any) => edge.node as IQuickStart)}
        type="jekyll"
        cliSample="agency"
        location={props.location}
      />
    )}
  />
);
