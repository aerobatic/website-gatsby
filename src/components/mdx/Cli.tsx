import styled from 'styled-components';
import { colors, fonts } from '../../styles/variables';

const PROMPT = '$ ';

const Styled = styled.div`
  background-color: #2a2a2a;
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
  border-radius: 0.3em;
  font-size: 14px;
  color: #ffffff;
  font-family: ${fonts.monospace};

  .prompt {
    color: ${colors.softBlue};
  }
`;

const Cli = (props: any) => {
  return (
    <Styled>
      <span className="prompt">{PROMPT}</span>
      <span className="cmd">{props.children}</span>
    </Styled>
  );
};

export default Cli;
