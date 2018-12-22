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

declare module 'gatsby-mdx' {
  declare class MDXRenderer extends React.Component<any> {}
}

declare module '@mdx-js/tag' {
  declare class MDXProvider extends React.Component<any> {}
}
