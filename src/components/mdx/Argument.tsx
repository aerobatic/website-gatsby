import styled from 'styled-components';

const StyledArgument = styled.div`
  margin-bottom: 15px;
  > code {
    display: inline-block;
    margin-bottom: 7px;
    font-weight: bold;
    border: 1px solid #ddd;
    border-radius: 3px;
  }
  p {
    margin: 0;
  }
`;

const Argument = (props: any) => {
  return (
    <StyledArgument>
      <code>{props.name}</code>
      <p>{props.children}</p>
    </StyledArgument>
  );
};

export default Argument;
