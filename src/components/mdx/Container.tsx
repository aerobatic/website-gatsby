import styled from 'styled-components';
import { fonts, colors } from '../../styles/variables';
import ExternalLink from '../../icons/external-link.svg';

export default styled.section`
  code {
    font-family: ${fonts.monospace};
    font-size: 88%;
    color: ${colors.black};
    padding: 3px;
    border-radius: 2px;
    background-color: ${colors.inlineCode};
  }

  a.internal-link,
  a.external-link {
    font-weight: bold;
    color: ${colors.black};
    border-bottom: solid 2px ${colors.softBlue};

    &:hover {
      text-decoration: none;
      background-color: ${colors.softBlue};
    }
  }

  // Add an arrow icon next to external links indicating
  // they will open in a new tab.
  a.external-link {
    &:after {
      content: url(${ExternalLink});
      display: inline-block;
      width: 10px;
      height: 10px;
      margin: 0 6px 0 4px;
    }
  }
`;
