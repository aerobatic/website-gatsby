import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import classNames from 'classnames';
import { colors } from '../../styles/variables';
import generators, { IGeneratorCommand } from './generators';

const TYPE_DELAY = 40;
const COMMAND_DELAY = 1000; // amount of time to pause between commands
const STEP_DELAY = 1000; // amount of time to show the spinner between step messages
const DEFAULT_INPUT = 'Try clicking one of the items below to see how it works!';

const StyledTerminal = styled.div`
  width: 740px;
  height: 360px;
  margin: 0 auto;
  border: solid 2px #eeeeee;
  border-top: solid 40px #eeeeee;
  border-radius: 4px 4px 0 0;
  position: relative;
  background-color: #272e39;
  color: #ffffff;
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
  padding: 15px;

  &::before {
    display: block;
    position: absolute;
    top: -27px;
    left: 12px;
    width: 16px;
    height: 16px;
    background-color: #ff6159;
    border-radius: 16px;
    box-shadow: 0 0 0 0 #ff6159, 22px 0 0 0 #ffbd2e, 44px 0 0 0 #28ca42;
    content: '';
  }

  pre code.prompt {
    margin-right: 10px;
    color: #707070;
  }

  .cursor {
    background-color: #fff;
    display: inline-block;
  }

  .learn-more {
    position: absolute;
    bottom: 15px;
    right: 15px;
    color: #29d029;
    cursor: pointer;
  }
`;

const GeneratorMenu = styled.ul`
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 20px auto;
  li {
    list-style: none;
  }
  li a {
    position: relative;
    padding: 10px;
    display: block;
    height: 100%;
    border-bottom: 2px solid #eeeeee;
    background-color: #fff;
    border-radius: 4px 4px 0 0;
    transition: background-color 150ms ease;
  }
  li a > img {
    max-width: 140px;
    height: auto;
  }
  li a:hover {
    background-color: ${colors.offWhite};
  }
  li.active a {
    border-color: ${colors.linkBlue};
  }
  li.inactive {
    opacity: 0.3;
  }
`;

interface ISimulationState {
  isRunning: boolean;
  activeGenerator?: string;
  terminalInput?: string;
  terminalOutput?: string[];
  showSpinner: boolean;
}

const delay = async (duration: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
};

class TerminalSimulation extends React.Component<{}, ISimulationState> {
  state: ISimulationState = {
    isRunning: false,
    showSpinner: false,
    terminalInput: ''
  };

  handleGeneratorClick = async (event: SyntheticEvent, generatorKey: string) => {
    event.preventDefault();

    if (this.state.isRunning) return;

    this.setState(
      {
        isRunning: true,
        activeGenerator: generatorKey,
        terminalInput: ''
      },
      async () => {
        for (const command of generators[generatorKey].commands) {
          // Clear the previous command's output
          this.setState({
            terminalInput: '',
            terminalOutput: []
          });

          await this.autotypeInput(command.text);

          if (command.output) {
            await this.writeCommandOutput(command);
          }

          await delay(COMMAND_DELAY);
        }

        this.setState({
          isRunning: false
        });
      }
    );
  };

  autotypeInput = async (commandText: string) => {
    for (let i = 0; i < commandText.length; i += 1) {
      this.setState({
        terminalInput: `${this.state.terminalInput || ''}${commandText[i]}`
      });

      await delay(TYPE_DELAY);
    }
  };

  writeCommandOutput = async (command: IGeneratorCommand) => {
    for (const output of command.output || []) {
      this.setState({
        showSpinner: true,
        terminalOutput: [...(this.state.terminalOutput || []), `> ${output}`]
      });

      await delay(STEP_DELAY);
    }

    this.setState({
      showSpinner: false,
      terminalOutput: [...(this.state.terminalOutput || []), `\n${command.success}`]
    });
  };

  componentDidMount() {
    this.autotypeInput(DEFAULT_INPUT);
  }

  renderLearnMore() {
    if (!this.state.activeGenerator) {
      return null;
    }
    return (
      <Link className="learn-more" to={`/docs/static-site-generators/#${this.state.activeGenerator}`}>
        Learn more about {generators[this.state.activeGenerator].title} and Aerobatic >
      </Link>
    );
  }

  render() {
    return (
      <>
        <StyledTerminal>
          <pre>
            <code className="prompt">$</code>
            <code className="input">{this.state.terminalInput}</code>
            <code className="cursor">_</code>
          </pre>
          <pre>
            <code className="output">{(this.state.terminalOutput || []).join('\n')}</code>
          </pre>
          {this.state.showSpinner && (
            <pre>
              <code className="spinner" />
            </pre>
          )}
          {this.renderLearnMore()}
        </StyledTerminal>
        <p style={{ textAlign: 'center' }}>See how easy it is to deploy a site with one of these popular static site generators:</p>

        <GeneratorMenu>
          {Object.keys(generators).map(key => (
            <li
              key={key}
              className={classNames({
                active: key === this.state.activeGenerator,
                inactive: this.state.isRunning && key !== this.state.activeGenerator
              })}
            >
              <a href={`#${key}`} onClick={e => this.handleGeneratorClick(e, key)}>
                <img alt={generators[key].title} src={generators[key].logo} />
              </a>
            </li>
          ))}
        </GeneratorMenu>
      </>
    );
  }
}

export default TerminalSimulation;
