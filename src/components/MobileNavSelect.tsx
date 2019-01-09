import React, { FormEvent } from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { INavLink } from '../types';
import { breakpoints } from '../styles/variables';

interface IProps {
  links: INavLink[];
  pathPrefix: string;
  location: Location;
}

const StyledSelect = styled.form`
  text-align: center;
  margin-bottom: 20px;
  display: none;
  @media (max-width: ${breakpoints.md}px) {
    display: block;
  }
`;

const onChange = (event: FormEvent<HTMLSelectElement>) => {
  navigate(event.currentTarget.selectedOptions[0].value);
};

export default (props: IProps) => (
  <StyledSelect>
    <select className="form-control" value={location.pathname} onChange={onChange}>
      {props.links.map(link => (
        <option key={link.slug} value={`/${props.pathPrefix}${link.slug}`}>
          {link.title}
        </option>
      ))}
    </select>
  </StyledSelect>
);
