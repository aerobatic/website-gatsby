import React from 'react';

import Title from './Title';
import { H2, H3 } from './Header';
import Paragraph from './Paragraph';
import Link from './Link';
import CodeBlock from './CodeBlock';
import List from './List';

export default {
  h1: (props: any) => <Title {...props} />,
  h2: (props: any) => <H2 {...props} />,
  h3: (props: any) => <H3 {...props} />,
  p: (props: any) => <Paragraph {...props} />,
  a: (props: any) => <Link {...props} />,
  pre: (props: any) => <CodeBlock {...props} />,
  ol: (props: any) => <List ordered={true} {...props} />,
  ul: (props: any) => <List ordered={false} {...props} />
};
