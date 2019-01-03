import styled from 'styled-components';
import GithubSlugger from 'github-slugger';
import { colors } from '../../styles/variables';
import AnchorIcon from '../../icons/anchor.svg';

const slugger = new GithubSlugger();

const StyledHeader = styled.div`
  text-align: left;

  h2,
  h3,
  h4 {
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: 900;
    line-height: 1.1;
    padding-bottom: 5px;
    position: relative;
    border-bottom: solid 1px ${colors.lightGray};
  }

  h2 {
    font-size: 18px;
  }

  h3,
  h4 {
    font-size: 17px;
  }

  a {
    color: ${colors.black};
    &:hover {
      color: ${colors.black};
      text-decoration: none;
    }
    &:hover:after {
      position: absolute;
      content: url(${AnchorIcon});
      display: inline-block;
      width: 17px;
      height: 17px;
      margin-left: 7px;
    }
  }
`;

const SLUG_OVERRIDE_REGEX: RegExp = /\{\#(.*)\}$/;

const render = (level: number, props: any) => {
  let text = props.children.toString();

  let slug;
  const match = text.match(SLUG_OVERRIDE_REGEX);
  if (!match) {
    slug = slugger.slug(text);

    // Chop off any "-2", "-7", etc. from the end of the slug
    const endsWithNumber = slug.match(/-\d$/);
    if (endsWithNumber) {
      slug = slug.substr(0, endsWithNumber.index);
    }
  } else {
    slug = match[1];
    text = text.substr(0, match.index);
  }

  const anchor = <a href={`#${slug}`}>{text}</a>;
  let Child;
  switch (level) {
    case 2:
      Child = <h2 id={slug}>{anchor}</h2>;
      break;
    case 3:
      Child = <h3 id={slug}>{anchor}</h3>;
      break;
    case 4:
    default:
      Child = <h4 id={slug}>{anchor}</h4>;
      break;
  }

  return <StyledHeader>{Child}</StyledHeader>;
};

export const H2 = (props: any) => render(2, props);
export const H3 = (props: any) => render(3, props);
export const H4 = (props: any) => render(4, props);
