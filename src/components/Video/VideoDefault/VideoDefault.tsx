import React from 'react';
import { useVideo } from '../hooks/useVideo';
import VideoOverlay from '../VideoOverlay/VideoOverlay';

interface VideoDefaultProps {
  src: string;
}

const VideoDefault = ({ src }: VideoDefaultProps) => {
  const { videoRef, handleClick, launched } = useVideo();

  return (
    <>
      <VideoOverlay visible={!launched} handleClick={handleClick} />

      <video ref={videoRef} controls={launched} disablePictureInPicture playsInline muted>
        <source src={src} type="video/mp4" />
      </video>
    </>
  );
};

export default VideoDefault;
