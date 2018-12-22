import React, { SFC } from 'react';
import { Link } from 'gatsby';

interface LinkProps {
  href: string;
}

const MdxLink: SFC<LinkProps> = props => {
  if (props.href.startsWith('/')) {
    return (
      <Link className="internal-link" to={props.href}>
        {props.children}
      </Link>
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
