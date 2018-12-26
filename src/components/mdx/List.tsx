import React, { SFC } from 'react';
import styled from 'styled-components';

interface ListProps {
  ordered?: boolean;
}

// http://jsfiddle.net/dcodesmith/DruxN/
const OrderedList = styled.ol`
  margin: 0 0 1.5em;
  padding: 0;
  counter-reset: item;

  li {
    margin: 0;
    padding: 0 0 0 2em;
    text-indent: -2em;
    list-style-type: none;
    counter-increment: item;
    margin-bottom: 6px;
    &:last-child {
      margin-bottom: 0;
    }
    &:before {
      display: inline-block;
      width: 1.5em;
      padding-right: 0.5em;
      font-weight: bold;
      text-align: right;
      content: counter(item) '.';
    }
  }
`;

const BulletList = styled.ul`
  li {
    margin-bottom: 6px;
    &:last-child: {
      margin-bottom: 0;
    }
  }
`;

const List: SFC<ListProps> = props => {
  if (props.ordered) {
    return <OrderedList>{props.children}</OrderedList>;
  }
  return <BulletList>{props.children}</BulletList>;
};

export default List;
