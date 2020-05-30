interface CSSModule {
  [className: string]: string;
}

// type shims for CSS modules

declare module '*.module.scss' {
  const cssModule: CSSModule;
  export = cssModule;
}

declare module '*.module.css' {
  const cssModule: CSSModule;
  export = cssModule;
}

declare module '*.png';
declare module '*.svg';

declare module 'gatsby-plugin-mdx' {
  declare class MDXRenderer extends React.Component<any> {}
}

declare module '@mdx-js/tag' {
  declare class MDXProvider extends React.Component<any> {}
}

declare module 'react-syntax-highlighter' {
  type lineTagPropsFunction = (lineNumber: number) => React.DOMAttributes<HTMLElement>;

  interface SyntaxHighlighterProps {
    language?: string;
    style?: any;
    customStyle?: any;
    lineProps?: lineTagPropsFunction | React.DOMAttributes<HTMLElement>;
    codeTagProps?: React.DOMAttributes<HTMLElement>;
    useInlineStyles?: boolean;
    showLineNumbers?: boolean;
    startingLineNumber?: number;
    lineNumberStyle?: any;
    [spread: string]: any;
  }

  export function registerLanguage(name: string, func: any): void;
  export class Light extends React.Component<SyntaxHighlighterProps> {
    static registerLanguage(name: string, func: any): void;
  }
}

declare module 'react-syntax-highlighter/dist/esm/styles/hljs' {
  export { default as monoBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs/mono-blue';
}

declare module 'react-syntax-highlighter/dist/esm/languages/hljs' {
  export { default as javascript } from 'react-syntax-highlighter/dist/languages/hljs/javascript';
  export { default as python } from 'react-syntax-highlighter/dist/languages/hljs/python';
  export { default as typescript } from 'react-syntax-highlighter/dist/languages/hljs/typescript';
  export { default as http } from 'react-syntax-highlighter/dist/languages/hljs/http';
  export { default as ruby } from 'react-syntax-highlighter/dist/languages/hljs/ruby';
  export { default as yaml } from 'react-syntax-highlighter/dist/languages/hljs/yaml';
  export { default as css } from 'react-syntax-highlighter/dist/languages/hljs/css';
  export { default as markdown } from 'react-syntax-highlighter/dist/languages/hljs/markdown';
  export { default as shell } from 'react-syntax-highlighter/dist/languages/hljs/shell';
  export { default as handlebars } from 'react-syntax-highlighter/dist/languages/hljs/handlebars';
  export { default as scss } from 'react-syntax-highlighter/dist/languages/hljs/scss';
}

declare module 'react-anchor-link-smooth-scroll' {
  export default class AnchorLink extends React.Component<{ href: string; className: string }> {}
}

declare module 'github-slugger' {
  export default class GithubSlugger {
    slug: (value: string) => string;
  }
}

declare const docsearch: (options: object) => void;
