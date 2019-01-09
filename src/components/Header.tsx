import * as React from 'react';
import styled from 'styled-components';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Link } from 'gatsby';
import headerLogo from '../img/header-logo.png';
import SearchBox from './SearchBox';
import { Location } from '../types';
import { breakpoints } from '../styles/variables';

const StyledHeader = styled.header`
  height: 55px;
  margin-bottom: 0;

  .navbar-nav {
    height: 50px;
    display: flex;
    align-items: center;
  }

  .navbar-brand {
    display: flex;
    align-items: center;
    padding: 8px 0px;
    width: 160px;

    img {
      width: 100%;
      height: auto;
    }
  }

  @media (max-width: ${breakpoints.md}px) {
    height: 43px;
    .navbar-brand {
      margin-left: 10px;
    }
  }
`;

const Navbar = styled.div`
  ul {
    height: 50px;
    display: flex;
    align-items: center;
  }
  @media (max-width: ${breakpoints.md}px) {
    ul {
      height: auto;
      justify-content: center;
    }
  }
`;

const NavbarLink = styled.li`
  &.search {
    @media (max-width: ${breakpoints.md}px) {
      display: none;
    }
  }

  > a {
    padding-top: 6px;
    padding-bottom: 8px;
    line-height: 1;
    color: #777;
  }

  > a:hover {
    background-color: transparent !important;
    color: #000;
  }
`;

const SignInLink = styled.a`
  @media (max-width: ${breakpoints.md}px) {
    display: none !important;
  }

  height: 34px;
  padding: 0 15px;
  margin: 0;
  margin-left: 15px;
  color: #fff !important;
  display: flex !important;
  align-items: center;
  font-size: 16px;

  & :hover {
    background-color: #4cae4c !important;
  }
`;

const StyledPromo = styled.div`
  text-align: center;
  background-color: #272e39;
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
  font-size: 14px;
  > a {
    text-decoration: none;
    color: #fff;
  }

  > a:hover {
    text-decoration: none;
    color: silver;
  }
`;

interface HeaderProps {
  title: string;
  location: Location;
}

const Header: React.SFC<HeaderProps> = props => (
  <>
    <StyledPromo>
      <Link to="/blog/announcing-i18n-plugin/">
        NEW! — Internationalize your site with our i18n plugin
      </Link>
    </StyledPromo>
    <div className="container">
      <StyledHeader className="navbar-header">
        <Link className="navbar-brand" to="/">
          <img src={headerLogo} alt="Logo" />
        </Link>
      </StyledHeader>

      <Navbar className="collapse navbar-collapse" id="navbar">
        <ul className="nav navbar-nav navbar-right">
          <NavbarLink>
            {props.location.pathname === '/' ? (
              <AnchorLink className="" href="#pricing">
                Pricing
              </AnchorLink>
            ) : (
              <Link to="/#pricing">Pricing</Link>
            )}
          </NavbarLink>
          <NavbarLink>
            {props.location.pathname === '/' ? (
              <AnchorLink className="" href="#features">
                Features
              </AnchorLink>
            ) : (
              <Link to="/#features">Features</Link>
            )}
          </NavbarLink>
          <NavbarLink>
            <Link to="/blog/">Blog</Link>
          </NavbarLink>
          <NavbarLink>
            <Link to="/docs/getting-started/">Docs</Link>
          </NavbarLink>
          <NavbarLink className="search">
            <SearchBox />
          </NavbarLink>
          <li>
            <SignInLink className="btn btn-success" href="https://dashboard.aerobatic.com/">
              <span>Sign-In</span>
            </SignInLink>
          </li>
        </ul>
      </Navbar>
    </div>
  </>
);

export default Header;
