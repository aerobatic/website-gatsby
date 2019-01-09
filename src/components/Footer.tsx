import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { breakpoints, colors } from '../styles/variables';

const StyledFooter = styled.footer`
  border-top: solid 1px ${colors.lightGray};
  padding-top: 20px;

  div.container {
    position: relative;
    height: 80px;
  }

  @media (max-width: ${breakpoints.md}px) {
    padding: 20px 15px 30px 15px;
  }
`;

const QuickLinks = styled.ul`
  position: absolute;
  right: 0px;
  bottom: 40px;

  @media (max-width: ${breakpoints.md}px) {
    bottom: 0px;
  }
  margin: 0;
  text-align: center;
  list-style-type: none;
  text-transform: none;
  line-height: 20px;
  text-align: right;
  padding: 0;
  > li {
    display: inline-block;
    font-size: 14px;
  }
  li:first-child:after {
    content: "|";
    margin: 0 5px;
  }
}
`;

const Copyright = styled.span`
  position: absolute;
  left: 0;
  font-size: 14px;
  bottom: 45px;
  @media (max-width: ${breakpoints.md}px) {
    bottom: 0px;
  }
`;

const SocialContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  svg {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-right: 15px;
    fill: #337ab7;
  }
  a:hover svg {
    fill: #23527c;
  }
`;

const Footer: React.SFC = () => (
  <StyledFooter>
    <div className="container">
      <Copyright>
        Copyright <Link to="/">Aerobatic LLC</Link> 2019
      </Copyright>
      <SocialContainer>
        <a href="https://twitter.com/aerobaticapp" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.5 8.778c-.441.196-.916.328-1.414.388.509-.305.898-.787 1.083-1.362-.476.282-1.003.487-1.564.597-.448-.479-1.089-.778-1.796-.778-1.59 0-2.758 1.483-2.399 3.023-2.045-.103-3.86-1.083-5.074-2.572-.645 1.106-.334 2.554.762 3.287-.403-.013-.782-.124-1.114-.308-.027 1.14.791 2.207 1.975 2.445-.346.094-.726.116-1.112.042.313.978 1.224 1.689 2.3 1.709-1.037.812-2.34 1.175-3.647 1.021 1.09.699 2.383 1.106 3.773 1.106 4.572 0 7.154-3.861 6.998-7.324.482-.346.899-.78 1.229-1.274z" />
          </svg>
        </a>
        <a href="https://github.com/aerobatic">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 6c-3.313 0-6 2.686-6 6 0 2.651 1.719 4.9 4.104 5.693.3.056.396-.13.396-.289v-1.117c-1.669.363-2.017-.707-2.017-.707-.272-.693-.666-.878-.666-.878-.544-.373.041-.365.041-.365.603.042.92.619.92.619.535.917 1.403.652 1.746.499.054-.388.209-.652.381-.802-1.333-.152-2.733-.667-2.733-2.965 0-.655.234-1.19.618-1.61-.062-.153-.268-.764.058-1.59 0 0 .504-.161 1.65.615.479-.133.992-.199 1.502-.202.51.002 1.023.069 1.503.202 1.146-.776 1.648-.615 1.648-.615.327.826.121 1.437.06 1.588.385.42.617.955.617 1.61 0 2.305-1.404 2.812-2.74 2.96.216.186.412.551.412 1.111v1.646c0 .16.096.347.4.288 2.383-.793 4.1-3.041 4.1-5.691 0-3.314-2.687-6-6-6z" />
          </svg>
        </a>
        <Link to="/slack">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm5.336 12.105l-1.216.405.421 1.258c.165.509-.105 1.063-.615 1.228-.575.162-1.074-.161-1.232-.613l-.42-1.259-2.506.838.42 1.259c.195.601-.217 1.271-.916 1.271-.44 0-.8-.282-.93-.657l-.421-1.258-1.215.404c-.568.164-1.073-.158-1.232-.614-.164-.509.106-1.064.616-1.228l1.216-.405-.811-2.411-1.216.404c-.677.192-1.279-.295-1.279-.92 0-.408.255-.791.664-.923l1.216-.404-.421-1.258c-.165-.51.106-1.064.616-1.229.51-.164 1.065.105 1.231.615l.421 1.257 2.505-.838-.419-1.259c-.202-.619.242-1.276.921-1.276.41 0 .793.254.925.663l.421 1.258 1.215-.405c.51-.165 1.066.106 1.231.615.166.509-.105 1.063-.615 1.228l-1.217.404.811 2.412 1.217-.405c.621-.2 1.278.242 1.278.919 0 .41-.255.792-.664.924zm-4.496-3.214l-2.505.837.81 2.414 2.505-.837-.81-2.414z" />
          </svg>
        </Link>
      </SocialContainer>
      <QuickLinks>
        <li>
          <Link to="/contact/">Contact</Link>
        </li>
        <li>
          <Link to="/legal/tos/">Legal</Link>
        </li>
      </QuickLinks>
    </div>
  </StyledFooter>
);

export default Footer;
