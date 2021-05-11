import styled from 'styled-components';
import { fonts } from '../styles/variables';
import ClipboardIcon from '../icons/clipboard.svg';

export interface ICopyCommandProps {
  command: string;
}

const Styled = styled.div`
  display: flex;
  width: 100%;
  input {
    background-color: #fff !important;
    font-family: ${fonts.monospace};
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
      width: 16px;
      height: 16px;
    }
  }
`;

export default (props: ICopyCommandProps) => {
  let textbox: HTMLInputElement | null;

  const copyToClipboard = () => {
    if (!textbox) {
      return;
    }
    textbox.select();
    document.execCommand('copy');
  };

  return (
    <Styled>
      <input
        type="text"
        readOnly
        spellCheck={false}
        className="form-control"
        defaultValue={props.command}
        onFocus={copyToClipboard}
        ref={elem => {
          textbox = elem;
        }}
      />
      <button className="btn btn-default" onClick={copyToClipboard}>
        <img src={ClipboardIcon} />
      </button>
    </Styled>
  );
};
