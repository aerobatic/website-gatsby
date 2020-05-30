import * as React from 'react';
import styled from 'styled-components';

// import { dimensions } from '../styles/variables'

const StyledPage = styled.div`
  display: block;
  flex: 1;
  position: relative;
  margin-bottom: 3rem;
  margin-top: ${(props: PageProps) => props.marginTop};
`;

interface PageProps {
  className?: string;
  marginTop?: string;
}

const Page: React.SFC<PageProps> = (props) => {
  return <StyledPage {...props}>{props.children}</StyledPage>;
};

Page.defaultProps = {
  marginTop: '0'
};

export default Page;
