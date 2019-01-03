import React from 'react';

import Title from './Title';
import { H2, H3, H4 } from './Header';
import Paragraph from './Paragraph';
import Link from './Link';
import CodeBlock from './CodeBlock';
import List from './List';
import Blockquote from './Blockquote';
import Table from './Table';

export default {
  h1: (props: any) => <Title {...props} />,
  h2: (props: any) => <H2 {...props} />,
  h3: (props: any) => <H3 {...props} />,
  h4: (props: any) => <H4 {...props} />,
  p: (props: any) => <Paragraph {...props} />,
  a: (props: any) => <Link {...props} />,
  pre: (props: any) => <CodeBlock {...props} />,
  ol: (props: any) => <List ordered={true} {...props} />,
  ul: (props: any) => <List ordered={false} {...props} />,
  blockquote: (props: any) => <Blockquote {...props} />,
  table: (props: any) => <Table {...props} />
};

export { default as Alert } from './Alert';
export { default as Link } from './Link';
export { default as Cli } from './Cli';
export { default as Image } from './Image';
export { default as Option } from './Option';
