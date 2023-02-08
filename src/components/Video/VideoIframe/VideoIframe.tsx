import React from 'react';
import './VideoIframe.css';

interface VideoIframeProps {
  src: string;
}

const VideoIframe = ({ src }: VideoIframeProps) => (
  <div className="VideoIframe-container">
    <iframe
      className="VideoIframe"
      title="VideoIframe"
      src={src}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
  </div>
);

export default VideoIframe;
