import React, { ReactNode } from 'react';
import { chunk } from 'lodash-es';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { breakpoints, colors } from '../styles/variables';
import Auth0Logo from '../icons/auth0';

interface Plugin {
  name: string;
  description: string;
  icon?: () => ReactNode;
}

const StyledItem = styled.div`
  height: 150px;
  margin-bottom: 20px;

  a {
    position: relative;
    background-color: ${colors.lightGray};
    display: block;
    width: 100%;
    height: 100%;
    padding: 15px;
    color: ${colors.black};

    &:hover {
      color: ${colors.black};
      text-decoration: none;
      background-color: ${colors.softBlue};
    }

    h3 {
      margin: 0;
      color: ${colors.black};
    }

    svg {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 24px;
      height: 24px;
      fill: ${colors.darkOrange};
    }
  }

  @media (max-width: ${breakpoints.md}px) {
    height: auto;
  }
`;

const PLUGINS: Plugin[] = [
  {
    name: 'redirect',
    description: 'Define HTTP redirect rules'
  },
  {
    name: 'password-protect',
    description: 'Apply password protection to your website'
  },
  {
    name: 'custom-errors',
    description: 'Custom pages for 404 and other error statuses'
  },
  {
    name: 'http-proxy',
    description: 'Proxy http calls to remote endpoints'
  },
  {
    name: 'auth0',
    description: 'Auth0 identity management for your site',
    icon: Auth0Logo
  },
  {
    name: 'authorized',
    description: 'Auth0 role-based authorization',
    icon: Auth0Logo
  },
  {
    name: 'form-submit',
    description: 'Collect form submissions and forward via email and webhooks'
  },
  {
    name: 'keyword-search',
    description: 'Customizable full-text search of your website content'
  },
  {
    name: 's3-proxy',
    description: 'Serve assets directly from your S3 buckets'
  },
  {
    name: 'http-headers',
    description: 'Append security and custom HTTP headers to your responses'
  },
  {
    name: 'i18n',
    description: 'Redirect to the correct locale based on visitor country or language'
  },
  {
    name: 'client-config',
    description: 'Expose config settings to client JavaScript'
  },
  {
    name: 'webpage',
    description: 'Control webpage serving and pushState'
  },
  {
    name: 'cors',
    description: 'Make certain resources available via CORS'
  },
  {
    name: 'health-check',
    description: 'Dedicated endpoint for your health monitoring service'
  }
];

export default () => {
  const rows = chunk(PLUGINS, 3) as Plugin[][];

  return (
    <div>
      {rows.map((row, index) => (
        <div key={index} className="row">
          {row.map((plugin: Plugin) => (
            <StyledItem key={plugin.name} className="col-md-4">
              <Link to={`/docs/plugins/${plugin.name}/`}>
                {plugin.icon && plugin.icon()}
                <h3>{plugin.name}</h3>
                <p>{plugin.description}</p>
              </Link>
            </StyledItem>
          ))}
        </div>
      ))}
    </div>
  );
};
