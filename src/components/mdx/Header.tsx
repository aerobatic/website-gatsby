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
  font-size: 17px;
  margin-top: 20px;
  margin-bottom: 15px;
  font-weight: 900;
  line-height: 1.1;
`;

const SLUG_OVERRIDE_REGEX: RegExp = /\{\#(.*)\}$/;

const render = (Elem: React.ComponentType<any>, props: any) => {
  let text = props.children.toString();

  let slug;
  const match = text.match(SLUG_OVERRIDE_REGEX);
  if (!match) {
    slug = slugger.slug(text);
  } else {
    slug = match[1];
    text = text.substr(0, match.index);
  }

  return <Elem id={slug}>{text}</Elem>;
};

export const H2 = (props: any) => render(StyledH2, props);
export const H3 = (props: any) => render(StyledH2, props);
export const H4 = (props: any) => render(StyledH4, props);