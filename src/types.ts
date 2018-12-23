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
