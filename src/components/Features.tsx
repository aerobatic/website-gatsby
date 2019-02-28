import React, { ReactNode } from 'react';
import GlobeIcon from '../icons/globe';
import PadlockIcon from '../icons/padlock';
import DeployIcon from '../icons/deploy';
import ContinuousIcon from '../icons/ci';
import PluginIcon from '../icons/plugin';
import ChecklistIcon from '../icons/checklist';
import PasswordIcon from '../icons/password';
import IpAddressIcon from '../icons/ip';
import Auth0Icon from '../icons/auth0';

import { chunk } from 'lodash-es';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { colors } from '../styles/variables';
import SectionHeader from './SectionHeader';

interface IFeatureHighlight {
  title: string;
  caption: string;
  href: string;
  icon: () => ReactNode;
}

const MAIN_FEATURES: IFeatureHighlight[] = [
  {
    title: 'Global Distribution',
    href: '/docs/overview/#performance',
    caption:
      "Each deployment is replicated to multiple AWS regions and fronted by the CloudFront CDN with nodes around the world. Give all your visitors a fast experience, no matter where they're at.",
    icon: GlobeIcon
  },
  {
    title: 'Secure out of the box',
    href: '/docs/overview/#security',
    caption:
      'All padlocks, all the time. We auto redirect HTTP to HTTPS. Custom domains include an auto-rewewing wildcard SSL certificate.',
    icon: PadlockIcon
  },
  {
    title: 'Deploy like a Pro',
    href: '/docs/deployment',
    caption:
      'It\'s as simple as "aero deploy" and your changes are live to the world in seconds. Harness deploy stages to run test instances on unique sub-domains. Keep your team in the loop with email or Slack alerts.',
    icon: DeployIcon
  },
  {
    title: 'Continuous delivery',
    caption:
      'Easily integrate Aerobatic into your build pipeline using the Aerobatic CLI. Automatically deploy to various stages each time you push to your source repo.',
    href: '/docs/deployment/#continuous-deployment',
    icon: ContinuousIcon
  },
  {
    title: 'Go further with Plugins',
    caption:
      'Configure plugins in your aerobatic.yml file to enhance the capabilities of your static site. Redirects, password protection, form submissions, http proxy, custom 404s, just to name a few.',
    href: '/docs/plugins/',
    icon: PluginIcon
  },
  {
    title: 'Little things done right',
    caption:
      "Cache headers, pretty URLs, trailing slashes, gzip compression, HTTP/2, SSL enforcement&mdash;there's a lot of details to get right. Let us take care of the minutiae so you can focus on great websites.",
    href: '/docs/static-serving/',
    icon: ChecklistIcon
  }
];

const ACCESS_CONTROL_FEATURES = [
  {
    title: 'Password Protect',
    caption: 'Simple password protection. Use our standard login page, or implement a custom one.',
    href: '/docs/plugins/password-protect/',
    icon: PasswordIcon
  },
  {
    title: 'Client IP Ranges',
    caption: 'Restrict access to specific client IP address ranges.',
    href: '/docs/access-control/#client-ip-ranges',
    icon: IpAddressIcon
  },
  {
    title: 'Auth0',
    caption:
      'Built-in integration with Auth0 for more advanced auth scenarios including OAuth and SSO.',
    href: '/docs/plugins/auth0/',
    icon: Auth0Icon
  }
];

const StyledHighlight = styled.div`
  a {
    display: block;
    position: relative;
    padding-left: 60px;
    text-decoration: none !important;

    &:hover {
      h3 {
        color: ${colors.primaryDark};
      }
      svg {
        fill: ${colors.primaryDark};
      }
    }

    h3 {
      color: ${colors.darkGray};
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 18px;
      font-weight: bold;
    }

    svg {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 0px;
      left: 10px;
      fill: #272e39;
    }

    p {
      font-size: 15px;
      color: ${colors.darkGray};
    }
  }
`;

const renderFeature = (highlight: IFeatureHighlight) => {
  return (
    <StyledHighlight>
      <Link to={highlight.href}>
        <h3>{highlight.title}</h3>
        {highlight.icon()}
        <p dangerouslySetInnerHTML={{ __html: highlight.caption }} />
      </Link>
    </StyledHighlight>
  );
};

const renderFeatureGrid = (features: IFeatureHighlight[]) => {
  const rows = chunk(features, 3) as IFeatureHighlight[][];

  return (
    <>
      {rows.map((row, i) => {
        return (
          <div className="row" key={i}>
            {row.map((highlight, j) => (
              <div className="col-md-4" key={j}>
                {renderFeature(highlight)}
              </div>
            ))}
          </div>
        );
      })}{' '}
    </>
  );
};

export default () => {
  return (
    <section id="features" className="features-section">
      <div className="container">
        <SectionHeader
          header="Give your static website wings"
          subHeader="Stop getting grounded by DevOps. We'll have you soaring in no time."
        />
        {renderFeatureGrid(MAIN_FEATURES)}

        <SectionHeader
          header="Access Control"
          subHeader="More ways to lock down access to your site than any other static host."
        />

        {renderFeatureGrid(ACCESS_CONTROL_FEATURES)}
      </div>
    </section>
  );
};
