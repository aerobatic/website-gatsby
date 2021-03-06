import styled from 'styled-components';
import { colors } from '../../styles/variables';

export default styled.table`
  margin-bottom: 25px;
  border-collapse: collapse;
  thead {
    background-color: ${colors.lightGray};
  }
  td,
  th {
    border: solid 1px ${colors.gray};
    padding: 7px;
  }
`;
