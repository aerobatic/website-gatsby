import React, { createRef, Component } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Location } from '../types';
import Page from '../components/Page';
import IndexLayout from '../layouts';
import Jumbotron from '../components/Jumbotron';
import { colors } from '../styles/variables';
import ExternalLinkIcon from '../icons/external-link';

const Styled = styled.div`
  h1 img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }

  form.join {
    margin-top: 30px;
    display: flex;
    justify-content: center;

    .input {
      color: ${colors.black};
      display: flex;

      input {
        height: 46px;
        padding: 10px 16px;
        font-size: 18px;
        line-height: 1.3333333;
        border-radius: 6px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    button {
      font-size: 18px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  div.result {
    a {
      color: ${colors.white};
      text-decoration: underline;
      &:hover {
        color: ${colors.lightGray};
      }
    }
    svg {
      fill: ${colors.white};
      width: 16px;
      height: 16px;
    }
  }
`;

interface IProps {
  location: Location;
}

interface IState {
  result?: Result;
}

type Result = 'invited' | 'alreadyInvited' | 'alreadyInTeam';

class SlackPage extends Component<IProps, IState> {
  state: IState = {};
  inviteInput = createRef<HTMLInputElement>();

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const input = this.inviteInput.current;
    if (!input) {
      return;
    }

    const resp = await fetch('https://www.aerobatic.com/api/slack-invite', {
      method: 'POST',
      body: `email=${encodeURIComponent(input.value)}&set_active=true`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const json = await resp.json();

    if (json.error) {
      switch (json.error) {
        case 'already_invited':
          this.setState({ result: 'alreadyInvited' });
          break;
        case 'already_in_team':
          this.setState({ result: 'alreadyInTeam' });
          break;
        case 'invalid_email':
          input.setCustomValidity('Invalid email address');
          break;
        default:
          input.setCustomValidity('Error generating invite');
          break;
      }
    } else {
      this.setState({ result: 'invited' });
    }
  };

  componentDidMount() {
    const input = this.inviteInput.current;
    if (!input) {
      return;
    }

    input.focus();
  }

  renderInviteForm() {
    return (
      <form className="join" method="POST" onSubmit={this.handleSubmit}>
        <div className="input">
          <input
            type="email"
            className="form-control"
            placeholder="you@email.com"
            ref={this.inviteInput}
          />
          <button className="btn btn-success">Send Invite</button>
        </div>
      </form>
    );
  }

  renderResult(result: Result) {
    if (!result) {
      return null;
    }

    let Child;
    switch (result) {
      case 'alreadyInTeam':
        Child = (
          <span>
            You are already a member.{' '}
            <a href="https://aerobatic-public.slack.com" target="_blank">
              Visit the community on Slack
            </a>{' '}
            <ExternalLinkIcon />
          </span>
        );
        break;
      case 'alreadyInvited':
        Child = (
          <span>You have already been invited. Check your inbox for an invite from Slack.</span>
        );
        break;
      case 'invited':
        Child = (
          <span>
            <strong>Invitation sent!</strong> Check your inbox for an invite from Slack.
          </span>
        );
        break;
      default:
        Child = null;
    }

    return <div className="result">{Child}</div>;
  }

  render() {
    return (
      <IndexLayout location={this.props.location}>
        <Page>
          <Jumbotron>
            <Styled>
              <h1>
                <img src="/img/slack-colored.png" />
                Join us on Slack
              </h1>
              <p className="sub-title">
                Enter your email to join our public Slack community for support guidance, feature
                discussions, or just chat about web tech.
              </p>

              {this.state.result ? this.renderResult(this.state.result) : this.renderInviteForm()}
            </Styled>
          </Jumbotron>
          <div className="container">
            Read our <Link to="/blog/serverless-slack-team-invite-form/">blog post</Link> to learn
            how to implement a Slack team invite form on your site.
          </div>
        </Page>
      </IndexLayout>
    );
  }
}

export default SlackPage;
