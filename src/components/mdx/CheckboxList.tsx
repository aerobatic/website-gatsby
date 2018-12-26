import styled from 'styled-components';
import CheckedBoxIcon from '../../icons/checked-box.svg';

export default styled.div`
  ul {
    list-style: none;
    li {
      clear: left;
      &:before {
        content: '';
        height: 1em;
        width: 1em;
        display: block;
        float: left;
        margin-left: -1.5em;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100%;
        background-image: url(${CheckedBoxIcon});
      }
    }
  }
`;
