import React, { SFC } from 'react';
import styled from 'styled-components';

interface YouTubeProps {
  videoId: string;
}

const Video = styled.div`
  text-align: center;
  margin-bottom: 20px;
  iframe {
    display: inline-block;
    border: none;
  }
`;

const YouTube: SFC<YouTubeProps> = (props) => {
  return (
    <Video>
      <iframe
        {...{ type: 'text/html' }}
        id="ytplayer"
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/${props.videoId}?autoplay=0`}
      />
    </Video>
  );
};

export default YouTube;
