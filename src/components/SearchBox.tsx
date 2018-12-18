import React from 'react';
import searchIcon from '../img/search.svg';
import styled from 'react-emotion';

const StyledForm = styled.div`
  display: flex;
  > input {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: none;
    width: 60px;
    padding: 0 !important;

    img {
      width: 20px;
    }
  }
`;

const SearchBox: React.SFC = () => (
  <StyledForm role="search">
    <input className="form-control" placeholder="Search" id="search-box" type="text" />
    <button className="btn btn-default" type="submit">
      <img src={searchIcon} />
    </button>
  </StyledForm>
);

export default SearchBox;
