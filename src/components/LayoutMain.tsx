import * as React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/variables';

const StyledLayoutMain = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  border-top: solid 1px ${colors.lightGray};
`;

interface LayoutMainProps {
  className?: string;
}

const LayoutMain: React.SFC<LayoutMainProps> = ({ children, className }) => (
  <StyledLayoutMain className={className}>{children}</StyledLayoutMain>
);

export default LayoutMain;
