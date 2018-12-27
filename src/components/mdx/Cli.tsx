import React, { SFC } from 'react';
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

  .comment {
    color: silver;
  }
`;

interface CliProps {
  commands?: string[];
}

const print = (cmd: string) => {
  let comment;
  if (cmd.indexOf('#')) {
    [cmd, comment] = cmd.split('#');
  }

  return (
    <>
      <span className="prompt">{PROMPT}</span>
      <span className="cmd">{cmd}</span>
      {comment && <span className="comment"># {comment}</span>}
    </>
  );
};

const Cli: SFC<CliProps> = props => {
  if (props.commands) {
    return (
      <Styled>
        {props.commands.map(cmd => (
          <div className="cmd">{print(cmd)}</div>
        ))}
      </Styled>
    );
  }

  return <Styled>{print(props.children as string)}</Styled>;
};

export default Cli;
