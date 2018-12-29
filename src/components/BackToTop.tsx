import React, { Component } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { colors } from '../styles/variables';

const Target = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;

  .arrow {
    transition: opacity 0.5s ease-in-out;
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    color: #fff;
    text-align: center;
    background-color: ${colors.linkBlue};

    &:hover {
      background-color: ${colors.primary};
    }

    svg {
      width: 30px;
      height: 16px;
      fill: #fff;
    }
  }

  .arrow.visible {
    opacity: 1;
  }
`;

class BackToTop extends Component<{}, { scrollY: number }> {
  state = { scrollY: 0 };

  scrollListener = () => {
    this.setState({ scrollY: window.scrollY });
  };

  componentDidMount() {
    this.setState({ scrollY: window.scrollY });

    document.addEventListener('scroll', this.scrollListener);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollListener);
  }

  render() {
    return (
      <Target>
        <AnchorLink
          className={classnames('arrow', { visible: this.state.scrollY > 250 })}
          href="#top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 417.23 226.29">
            <path
              d="M1039.61,939.54a17.21,17.21,0,0,1-24.28,0L835.62,759.83,656.68,938.77a17.18,17.18,0,0,1-24.29-24.29L823.61,723.26a17.23,17.23,0,0,1,24.28,0,17.47,17.47,0,0,1,1.7,2l190,190A17.23,17.23,0,0,1,1039.61,939.54Z"
              transform="translate(-627.39 -718.26)"
            />
          </svg>
        </AnchorLink>
      </Target>
    );
  }
}

export default BackToTop;
