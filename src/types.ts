export interface IBlogPost {
  id: string;
  excerpt: string;
  frontmatter: {
    date: string;
    slug: string;
    description: string;
    title: string;
  };
}

export type QuickStartSiteType = 'hugo' | 'jekyll' | 'html5';

export interface IQuickStart {
  repoFullName: string;
  branch: string;
  repoName: string;
  forks: number;
  stars: number;
  description: string;
  downloadUrl: string;
  slug: string;
  siteType: QuickStartSiteType;
  title: string;
  repoUrl: string;
  licenseLink: string;
  tags: string[];
  minVersion: string;
  source: string;
  thumbnailurl: string;
  exampleSite: boolean;
  demoAppId: string;
  demoAppName: string;
}

export interface Location {
  pathname: string;
}
