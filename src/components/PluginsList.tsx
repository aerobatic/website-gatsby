import React from 'react';
import { chunk } from 'lodash-es';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { colors } from '../styles/variables';

interface Plugin {
  name: string;
  description: string;
  icon?: any;
}

const Auth0Logo = (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 64 64">
    <path
      d="M49.012 51.774L42.514 32l17.008-12.219H38.503L32.005.007V0h21.032l6.498 19.781h.007c3.768 11.468-.118 24.521-10.53 31.993zm-34.022 0L31.998 64l17.014-12.226-17.007-12.219zm-10.516-32c-3.976 12.1.64 24.918 10.509 32.007v-.007L21.482 32 4.474 19.774l21.025.007L31.998.007V0H10.972z"
      fill="#eb5424"
    />
  </svg>
);

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
    }
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
                {plugin.icon && plugin.icon}
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
