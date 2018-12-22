import React, { SFC } from 'react';
// import styled from 'styled-components';

interface ImageProps {
  src: string;
}

// export default styled.div`
//   color: blue;
// `;
const Image: SFC<ImageProps> = props => {
  return <img id="bar" src={props.src} />;
};

export default Image;
