import * as React from 'react';
import styled from 'styled-components';
// import { transparentize } from 'polished';
import { Link } from 'gatsby';
import headerLogo from '../img/header-logo.png';
import SearchBox from './SearchBox';

// import { heights, dimensions, colors } from '../styles/variables';
// import Container from './Container';

const StyledHeader = styled.header`
  height: 55px;
  margin-bottom: 0;

  a.mobile-search {
    display: none;
  }

  .navbar-nav {
    height: 50px;
    display: flex;
    align-items: center;

    a.whats-new {
      i {
        color: #f91;
      }
    }
  }

  .navbar-brand {
    display: flex;
    align-items: center;
    padding: 8px 0px;
    width: 160px;

    @media (min-width: 992px) {
      width: 200px;
    }

    img {
      width: 100%;
      height: auto;
    }
  }
`;

const Navbar = styled.div`
  ul {
    height: 50px;
    display: flex;
    align-items: center;
  }
  // Hide the label "Search" and just show the icon
  .nav.navbar-nav.navbar-right .search-link span {
    display: none;
  }
`;

const NavbarLink = styled.li`
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
}

const Header: React.SFC<HeaderProps> = () => (
  <>
    <StyledPromo>
      <Link to="/blog/announcing-i18n-plugin/">
        NEW! — Internationalize your site with our i18n plugin
      </Link>
    </StyledPromo>
    <div className="container">
      <StyledHeader className="navbar-header">
        <button
          type="button"
          className="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#navbar"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a href="/search" className="mobile-search">
          <i className="fa fa-search fa-2x" />
        </a>

        <Link className="navbar-brand" to="/">
          <img src={headerLogo} alt="Logo" />
        </Link>
      </StyledHeader>

      <Navbar className="collapse navbar-collapse" id="navbar">
        <ul className="nav navbar-nav navbar-right">
          <NavbarLink>
            <a href="/#pricing">Pricing</a>
          </NavbarLink>
          <NavbarLink>
            <a href="/#features">Features</a>
          </NavbarLink>
          <NavbarLink>
            <Link to="/blog/">Blog</Link>
          </NavbarLink>
          <NavbarLink>
            <Link to="/docs/getting-started/">Docs</Link>
          </NavbarLink>
          <NavbarLink>
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
