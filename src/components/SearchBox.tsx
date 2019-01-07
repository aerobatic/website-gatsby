import React, { Component } from 'react';
import searchIcon from '../img/search.svg';
import styled from 'styled-components';
import { loadScript } from '../utils';
import { navigate } from 'gatsby';

const StyledForm = styled.div`
  display: flex;
  > input {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }

  .algolia-autocomplete {
    input {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
  }

  button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: none;
    width: 50px;
    padding: 0 !important;

    img {
      width: 20px;
    }
  }
`;

// let _hasMounted = false;

class SearchBox extends Component {
  componentDidMount() {
    this.initializeDocSearch();
    // _hasMounted = true;
  }

  async initializeDocSearch() {
    await loadScript('https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js');

    docsearch({
      apiKey: 'bb94ffdd8f41a58713bd1ffdd0936900',
      indexName: 'aerobatic',
      inputSelector: '#search-box',
      debug: false, // Set debug to true if you want to inspect the dropdown
      transformData: (hits: { url: string }[]) => {
        // modify hits
        if (/localhost/.test(location.origin)) {
          for (let i = 0; i < hits.length; i += 1) {
            hits[i].url = hits[i].url.replace('https://www.aerobatic.com', location.origin);
          }
        }
        return hits;
      },
      handleSelected: (
        input: { setVal: (val: string) => void },
        _event: any,
        suggestion: { url: string },
        _datasetNumber: any,
        context: { selectionMethod: string }
      ) => {
        // Do nothing if click on the suggestion, as it's already a <a href>, the
        // browser will take care of it. This allow Ctrl-Clicking on results and not
        // having the main window being redirected as well
        if (context.selectionMethod === 'click') {
          return;
        }

        input.setVal('');
        navigate(suggestion.url.replace(location.origin, ''));
      }
    });
  }

  render() {
    return (
      <StyledForm role="search">
        <input className="form-control" placeholder="Search" id="search-box" type="text" />
        <button className="btn btn-default" type="submit">
          <img src={searchIcon} />
        </button>
      </StyledForm>
    );
  }
}

export default SearchBox;
