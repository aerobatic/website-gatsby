import React, { SFC } from 'react';
import styled, { StyledComponent } from 'styled-components';
import InfoIcon from '../../icons/info.svg';
import WarningIcon from '../../icons/warning.svg';
import LightbulbIcon from '../../icons/lightbulb.svg';
import { colors } from '../../styles/variables';

type AlertType = 'info' | 'warn' | 'alert' | 'tip';
interface AlertProps {
  type: AlertType;
}

const StyledAlert = styled.div`
  padding: 10px;
  padding-left: 60px;
  background-repeat: no-repeat;
  background-position: 15px 10px;
  background-size: 24px 24px;
  border-left-style: solid;
  border-left-width: 4px;

  p {
    color: #000;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }

  li:before {
    left: 71px !important;
  }
`;

const StyledInfo = styled(StyledAlert)`
  background-color: #83c9f3;
  border-color: #0781ca;
  background-image: url(${InfoIcon});
`;

const StyledTip = styled(StyledInfo)`
  background-image: url(${LightbulbIcon});
`;

const StyledWarning = styled(StyledAlert)`
  background-image: url(${WarningIcon});
  background-color: ${colors.orange};
  border-color: ${colors.darkOrange};
`;

const Alert: SFC<AlertProps> = props => {
  let Component: StyledComponent<'div', any>;
  switch (props.type) {
    case 'warn':
      Component = StyledWarning;
      break;
    case 'tip':
      Component = StyledTip;
      break;
    case 'info':
    default:
      Component = StyledInfo;
      break;
  }
  return <Component {...props}>{props.children}</Component>;
};

Alert.defaultProps = {
  type: 'info'
};

export default Alert;
