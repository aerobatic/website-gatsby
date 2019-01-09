import React from 'react';
import styled from 'styled-components';
import { breakpoints } from '../styles/variables';

const StyledSection = styled.section`
  background-color: #4e7ce5;
  padding: 20px 0 40px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 30px;

  h1 {
    color: #fff;
    font-size: 38px;
    font-weight: 100;
    margin-top: 0;
    margin-bottom: 15px;
    padding-top: 45px;
    position: relative;
    -webkit-font-smoothing: antialiased;
  }

  p {
    max-width: 600px;
    display: inline-block;
    font-size: 18px;
    margin: 0 0 15px;
  }

  @media (max-width: ${breakpoints.md}px) {
    h1 {
      padding-top: 15px;
      font-size: 32px;
    }
  }
}
`;

const Jumbotron: React.SFC = ({ children }) => (
  <StyledSection>
    <div className="container">
      <div className="row">
        <div className="col-lg-12">{children}</div>
      </div>
    </div>
  </StyledSection>
);

export default Jumbotron;
