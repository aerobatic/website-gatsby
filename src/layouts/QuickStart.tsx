import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';
import Page from '../components/Page';
import IndexLayout from './index';
import styled from 'styled-components';
import { IQuickStart, QuickStartSiteType } from '../types';
import Jumbotron from '../components/Jumbotron';
import { colors, fonts } from '../styles/variables';
import { chunk } from 'lodash-es';
import CopyCommand from '../components/CopyCommand';
import ExternalLink from '../icons/external-link.svg';
import GitHubIcon from '../icons/github.svg';

interface IProps {
  type: QuickStartSiteType;
  quickstarts: IQuickStart[];
  cliSample: string;
  location: Location;
}

const SiteTypeMenu = styled.ul`
  padding: 0;
  margin: 0 0 15px 0;
  list-style: none;
  li {
    display: inline-block;
    a {
      display: block;
      padding: 10px 15px;
      text-decoration: none;

      &.active {
        color: ${colors.darkGray};
        font-weight: bold;
      }
      &:hover {
        background-color: ${colors.lightGray};
      }
    }
  }
`;

const StyledQuickStart = styled.div`
  display: flex;
  margin-bottom: 25px;
  background-color: ${colors.lightGray};
  padding: 10px;

  a.screenshot img {
    border: solid 1px ${colors.gray};
    display: block;
    margin: 0 15px 0 0;
    width: 250px;
    height: 188px;
    border-radius: 0;
  }

  .details {
    h3 {
      margin: 0;
      font-size: 19px;
    }

    .description {
      font-size: 14px;
      margin-top: 7px;
      margin-bottom: 5px;
    }

    div.buttons {
      margin-top: 15px;
    }
    a.btn {
      font-weight: 600;

      img {
        width: 16px;
        height: 16px;
      }
    }
  }
`;

const CliSample = styled.div`
  pre {
    margin: 0;
    display: inline-block;
    background-color: ${colors.primaryDark};
    padding: 10px;
    border-radius: 5px;
  }
  code {
    font-size: 22px;
    font-family: ${fonts.monospace};
  }
`;

interface IState {
  starCounts?: { [key: string]: number | undefined };
}

class QuickStartLayout extends Component<IProps, IState> {
  state: IState = {};
  hasUnmounted = false;

  async fetchStars(quickStart: IQuickStart): Promise<number | undefined> {
    const githubMatch = quickStart.repoUrl.match(/^https:\/\/github\.com\/(.*)/);
    if (!Array.isArray(githubMatch) || githubMatch.length < 2) {
      return undefined;
    }

    const resp = await fetch(`https://www.aerobatic.com/api/github/repos/${githubMatch[1]}`);
    const json = await resp.json();
    return json.stargazers_count;
  }

  async componentDidMount() {
    // Load the stargazers count for each quickstart repo
    const starCounts: { [key: string]: number | undefined } = {};
    await Promise.all(
      this.props.quickstarts.map(quickstart => {
        return this.fetchStars(quickstart).then(starCount => {
          starCounts[quickstart.slug] = starCount;
        });
      })
    );

    if (this.hasUnmounted) {
      return;
    }

    this.setState({ starCounts });
  }

  componentWillUnmount() {
    this.hasUnmounted = true;
  }

  renderQuickStart(quickStart: IQuickStart) {
    return (
      <StyledQuickStart>
        <a
          className="screenshot"
          href={`https://${quickStart.demoAppName}.aerobaticapp.com?__preview=laptop`}
          target="_blank"
        >
          <img src={`/img/quickstart-screenshots/${this.props.type}-${quickStart.slug}.png`} />
        </a>

        <div className="details">
          <h3>{quickStart.title}</h3>
          <p className="description">{quickStart.description}</p>
          <CopyCommand command={`aero create --quick-start ${this.props.type}/${quickStart.slug}`} />
          <div className="buttons">
            <a
              className="btn btn-default btn-sm"
              href={`https://${quickStart.demoAppName}.aerobaticapp.com?__preview=laptop`}
              target="_blank"
            >
              <span>Demo</span> <img src={ExternalLink} />
            </a>{' '}
            <a className="btn btn-default btn-sm" href={quickStart.repoUrl} target="_blank">
              <img src={GitHubIcon} /> <span>Star</span>
            </a>
            {this.state.starCounts && this.state.starCounts[quickStart.slug] && (
              <a
                className="btn btn-default btn-sm btn-arrow btn-arrow-left"
                target="_blank"
                href={quickStart.repoUrl}
              >
                {this.state.starCounts[quickStart.slug]}
              </a>
            )}
          </div>
        </div>
      </StyledQuickStart>
    );
  }

  render() {
    const rows = chunk(this.props.quickstarts, 2) as IQuickStart[][];

    return (
      <IndexLayout location={this.props.location}>
        <Page>
          <Jumbotron>
            <h1>Quick Starts</h1>
            <p>Quick starts are a great way to get a new website up and running fast</p>
            <CliSample>
              <pre>
                <code>
                  aero create --quick-start {`${this.props.type}/${this.props.cliSample}`}
                </code>
              </pre>
            </CliSample>
          </Jumbotron>

          <div className="container">
            <SiteTypeMenu>
              {['HTML5', 'Jekyll', 'Hugo'].map(name => (
                <li key={name.toLowerCase()}>
                  <Link
                    to={`/quickstarts/${name.toLowerCase()}/`}
                    className={classnames({ active: name.toLowerCase() === this.props.type })}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </SiteTypeMenu>

            {rows.map((row, index) => {
              return (
                <div className="row" key={index}>
                  {row.map(quickstart => (
                    <div key={quickstart.slug} className="col-md-6">
                      {this.renderQuickStart(quickstart)}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </Page>
      </IndexLayout>
    );
  }
}

export default QuickStartLayout;
