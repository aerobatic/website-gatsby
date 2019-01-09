import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Page from '../components/Page';
import IndexLayout from '../layouts';
import { colors } from '../styles/variables';

const Styled = styled.section`
  margin: 80px auto;
  background-color: ${colors.lightGray};
  width: 600px;
  max-width: 90%;
  padding: 20px;

  h1 {
    margin-top: 0;
  }
`;

const NotFoundPage = (props: { location: Location }) => (
  <IndexLayout location={props.location}>
    <Page>
      <Styled>
        <h1>404: Page not found</h1>
        <p>
          Checkout our <Link to="/docs/getting-started">Getting Started</Link> page.
        </p>
      </Styled>
    </Page>
  </IndexLayout>
);

export default NotFoundPage;
