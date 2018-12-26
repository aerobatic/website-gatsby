import styled from 'styled-components';
import GithubSlugger from 'github-slugger';
const slugger = new GithubSlugger();

const StyledH2 = styled.h2`
  text-align: left;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 900;
  line-height: 1.1;
`;

const StyledH4 = styled.h4`
  text-align: left;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 900;
  line-height: 1.1;
`;

export const H2 = (props: any) => {
  const text = props.children.toString();

  const slug = slugger.slug(text);
  return <StyledH2 id={slug}>{props.children}</StyledH2>;
};

export const H3 = (props: any) => {
  const text = props.children.toString();

  const slug = slugger.slug(text);
  return <StyledH2 id={slug}>{props.children}</StyledH2>;
};

export const H4 = (props: any) => {
  const text = props.children.toString();

  const slug = slugger.slug(text);
  return <StyledH4 id={slug}>{props.children}</StyledH4>;
};
