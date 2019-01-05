import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { IQuickStart } from '../../types';
import QuickStartLayout from '../../layouts/QuickStart';

export default () => (
  <StaticQuery
    query={graphql`
      {
        allHtml5Json {
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
    render={data => (
      <QuickStartLayout
        quickstarts={data.allHtml5Json.edges.map((edge: any) => edge.node as IQuickStart)}
        type="html5"
      />
    )}
  />
);
