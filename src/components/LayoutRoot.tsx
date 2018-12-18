import * as React from 'react';
// import styled from 'react-emotion';

// const StyledLayoutRoot = styled.div`
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;
// `;

interface LayoutRootProps {
  className?: string;
}

const LayoutRoot: React.SFC<LayoutRootProps> = ({ children, className }) => <div className={className}>{children}</div>;

export default LayoutRoot;
