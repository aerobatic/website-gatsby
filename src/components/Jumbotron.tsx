import React from 'react';
import styled from 'styled-components';

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

  @media screen and (min-width: 768px)
  .jumbotron .h1, .jumbotron h1 {
    font-size: 63px;
  }

  p {
    max-width: 600px;
    display: inline-block;
    font-size: 18px;
    margin: 10px 0 15px;
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
