import React from 'react';
import { useVideo } from './useVideo';
import './VideoPreview.css';

const VideoPreview = ({ src }) => {
  const { videoRef } = useVideo();

  return (
    <video
      className="VideoPreview"
      ref={videoRef}
      controls
      disablePictureInPicture
      playsInline
      muted
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default VideoPreview;
