import React, { SFC } from 'react';
import { Link } from 'gatsby';
import AnchorLink from 'react-anchor-link-smooth-scroll';

interface LinkProps {
  href: string;
}

const MdxLink: SFC<LinkProps> = (props) => {
  if (props.href.startsWith('/')) {
    return (
      <Link className="internal-link" to={props.href}>
        {props.children}
      </Link>
    );
  }

  if (props.href.startsWith('#')) {
    return (
      <AnchorLink className="internal-link" href={props.href}>
        {props.children}
      </AnchorLink>
    );
  }

  // Launch external links in a new browser tab
  return (
    <a {...props} className="external-link" target="_blank">
      {props.children}
    </a>
  );
};

export default MdxLink;
