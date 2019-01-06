import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/variables';

const StyledSection = styled.div`
  h1,
  h4 {
    text-align: center;
  }
  h1 {
    font-size: 38px;
    font-weight: 100;
    margin-bottom: 10px;
  }
  h4 {
    font-weight: 100;
    margin-top: 0;
    color: ${colors.gray};
    margin-bottom: 50px;
    font-size: 18px;
  }
`;

export default (props: { header: string; subHeader: string }) => (
  <StyledSection>
    <h1>{props.header}</h1>
    <h4>{props.subHeader}</h4>
  </StyledSection>
);
