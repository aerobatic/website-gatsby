import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { IQuickStart } from '../../types';
import QuickStartLayout from '../../layouts/QuickStart';

export default () => (
  <StaticQuery
    query={graphql`
      {
        allHugoJson {
          edges {
            node {
              id
              slug
              demoAppId
              demoAppName
              siteType
              title
            }
          }
        }
      }
    `}
    render={data => (
      <QuickStartLayout
        quickstarts={data.allHugoJson.edges.map((edge: any) => edge.node as IQuickStart)}
        type="hugo"
      />
    )}
  />
);
