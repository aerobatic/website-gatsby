import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { colors } from '../styles/variables';
import { legacyNavClassnames } from '../utils';
import { INavLink } from '../types';

const StyledContainer = styled.section`
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style-type: none;
    padding: 0;

    &.active {
      a {
        font-weight: bold;
        color: ${colors.darkGray};
        &:hover {
          text-decoration: none;
        }

        &:active,
        &:focus {
          text-decoration: none;
        }

        svg {
          fill: ${colors.orange};
        }
      }
    }
  }
  a {
    color: ${colors.gray};
    padding: 10px;
    display: block;
    &:hover {
      color: ${colors.darkGray};
      text-decoration: none;
      background-color: ${colors.hoverTile};
    }

    svg {
      margin-left: 8px;
      fill: ${colors.orange};
    }
  }
`;

interface ISidebarProps {
  links: INavLink[];
  location: Location;
  pathPrefix: string;
}

export default (props: ISidebarProps) => (
  <StyledContainer>
    <ul className={classnames(legacyNavClassnames)}>
      {props.links.map((link) => (
        <li
          key={link.slug}
          className={classnames({
            active: props.location.pathname.startsWith(`/${props.pathPrefix}${link.slug}`)
          })}
        >
          <Link to={`/${props.pathPrefix}${link.slug}/`}>
            {link.title}
            {link.icon && link.icon}
          </Link>
        </li>
      ))}
    </ul>
  </StyledContainer>
);
