import React from 'react';
import './VideoWrapper.css';

const VideoWrapper = ({ children }: React.PropsWithChildren<unknown>) => (
  <div className="VideoWrapper">{children}</div>
);

export default VideoWrapper;
