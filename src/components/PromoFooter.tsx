import styled from 'styled-components';
import { colors } from '../styles/variables';

const Footer = styled.footer`
  margin-top: 40px;
  padding: 15px;
  background-color: ${colors.lightGray};
  h3 {
    margin: 0 0 10px 0;
  }
  p {
    margin: 0;
    margin-bottom: 10px;
  }
`;

export default () => (
  <Footer>
    <h3>Ready to try Aerobatic?</h3>
    <p>You can have your first website live in 30 seconds!</p>
    <a
      className="btn btn-success btn-lg"
      rel="external"
      target="_blank"
      href="https://dashboard.aerobatic.com/register"
    >
      Create free account
    </a>
  </Footer>
);
