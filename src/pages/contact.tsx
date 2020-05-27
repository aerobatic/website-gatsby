import React, { ReactNode } from 'react';
import { Link } from 'gatsby';
import { Location } from '../types';
import Page from '../components/Page';
import IndexLayout from '../layouts';
import styled from 'styled-components';
import { colors } from '../styles/variables';
import EmailIcon from '../icons/email';
import SlackIcon from '../icons/slack';

const Styled = styled.section`
  margin: 80px auto;
  background-color: ${colors.lightGray};
  width: 600px;
  max-width: 90%;
  padding: 20px;

  h1 {
    margin-top: 0;
  }

  ul {
    list-type: none;

    li {
      margin-bottom: 20px;
      display: flex;
      svg {
        width: 24px;
        height: 24px;
        fill: ${colors.gray};
      }
      span {
        margin-left: 20px;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

interface IContactMethod {
  icon: () => ReactNode;
  content: () => ReactNode;
}

const CONTACT_METHODS: IContactMethod[] = [
  {
    icon: EmailIcon,
    content: () => (
      <span>
        Email us at <a href="mailto:support@aerobatic.com">support@aerobatic.com</a>
      </span>
    )
  },
  {
    icon: SlackIcon,
    content: () => (
      <span>
        Join us on <Link to="/slack">Slack</Link>
      </span>
    )
  }
];

export default (props: { location: Location }) => (
  <IndexLayout location={props.location}>
    <Page>
      <Styled>
        <h1>Contact Us</h1>
        <ul>
          {CONTACT_METHODS.map((method, i) => (
            <li key={i}>
              {method.icon()}
              {method.content()}
            </li>
          ))}
        </ul>
      </Styled>
    </Page>
  </IndexLayout>
);
