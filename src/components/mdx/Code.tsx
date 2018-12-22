import styled from 'styled-components';
import { colors, fonts } from '../../styles/variables';

export default styled.code`
  display: inline-block;
  font-family: ${fonts.monospace} !important;
  font-size: 90%;
  color: ${colors.black};
  background-color: ${colors.softBlue};
`;
