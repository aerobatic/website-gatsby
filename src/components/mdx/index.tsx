import React from 'react';

import Title from './Title';
import Subtitle from './Subtitle';
import Paragraph from './Paragraph';
import Link from './Link';
import CodeBlock from './CodeBlock';

export default {
  h1: (props: any) => <Title {...props} />,
  h2: (props: any) => <Subtitle {...props} />,
  p: (props: any) => <Paragraph {...props} />,
  a: (props: any) => <Link {...props} />,
  // code: (props: any) => <Code {...props} />,
  pre: (props: any) => <CodeBlock {...props} />
};
