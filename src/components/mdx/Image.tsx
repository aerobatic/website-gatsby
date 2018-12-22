import React, { SFC } from 'react';
import styled from 'styled-components';

interface ImageProps {
  src: string;
  align: 'center' | 'left' | 'right';
  width?: string;
}

const StyledImage = styled.div`
  text-align: ${(props: ImageProps) => props.align};
  img {
    max-width: 100%;
  }
`;

const MdxImage: SFC<ImageProps> = props => {
  const imgProps: Pick<ImageProps, 'width' | 'src'> = props;

  return (
    <StyledImage {...props}>
      <img src={props.src} {...imgProps} />
    </StyledImage>
  );
};

MdxImage.defaultProps = {
  align: 'center'
};

export default MdxImage;
