import styled from 'styled-components';

const StyledBlockquote = styled.blockquote`
  p {
    font-size: 1.1em;
    font-style: italic;
  }
`;

export default (props: any) => {
  return <StyledBlockquote>{props.children}</StyledBlockquote>;
};
