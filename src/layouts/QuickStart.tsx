import React from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';
import Page from '../components/Page';
import IndexLayout from './index';
import styled from 'styled-components';
import { IQuickStart, QuickStartSiteType } from '../types';
import Jumbotron from '../components/Jumbotron';
import { colors } from '../styles/variables';

interface IProps {
  type: QuickStartSiteType;
  quickstarts: IQuickStart[];
}

const SiteTypeMenu = styled.ul`
  padding: 0;
  margin-bottom: 20px;
  list-style: none;
  li {
    display: inline-block;
    a {
      display: block;
      padding: 10px 15px;
      text-decoration: none;

      &.active {
        color: ${colors.darkGray};
        font-weight: bold;
      }
      &:hover {
        background-color: ${colors.lightGray};
      }
    }
  }
`;

const QuickStartLayout = (props: IProps) => {
  return (
    <IndexLayout>
      <Page>
        <Jumbotron>
          <h1>Quick Starts</h1>
          <p>Quick starts are a great way to get a new website up and running fast</p>
        </Jumbotron>

        <div className="container">
          <SiteTypeMenu>
            {['HTML5', 'Jekyll', 'Hugo'].map(name => (
              <li key={name.toLowerCase()}>
                <Link
                  to={`/quickstarts/${name.toLowerCase()}/`}
                  className={classnames({ active: name.toLowerCase() === props.type })}
                >
                  {name}
                </Link>
              </li>
            ))}
          </SiteTypeMenu>

          {props.quickstarts.map(quickstart => (
            <div key={quickstart.slug}>{quickstart.title}</div>
          ))}
        </div>
      </Page>
    </IndexLayout>
  );
};

export default QuickStartLayout;
