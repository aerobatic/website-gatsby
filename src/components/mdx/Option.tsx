import styled from 'styled-components';

const StyledOption = styled.div`
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

const Option = (props: any) => {
  return (
    <StyledOption>
      <code>{props.name}</code>
      <p>{props.children}</p>
    </StyledOption>
  );
};

export default Option;
