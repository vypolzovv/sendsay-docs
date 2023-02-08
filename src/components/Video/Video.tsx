import React from 'react';
import VideoWrapper from './VideoWrapper';
import { getVideoComponent } from './utils/getVideoComponent';

interface VideoProps {
  src: string;
}

const Video = ({ src }: VideoProps) => {
  const VideoComponent = getVideoComponent(src);

  return (
    <VideoWrapper>
      <VideoComponent src={src} />
    </VideoWrapper>
  );
};

export default Video;
