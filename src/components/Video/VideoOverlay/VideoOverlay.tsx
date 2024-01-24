import React from 'react';
import VideoIcon from './VideoIcon';
import './VideoOverlay.css';

interface VideoOverlayProps {
  visible: boolean;
  handleClick: () => void | undefined;
}

const VideoOverlay = ({ visible, handleClick }: VideoOverlayProps) => {
  if (!visible) {
    return null;
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <div
      className="VideoOverlay"
      onClick={handleClick}
      role="button"
      onKeyUp={handleKeyUp}
      tabIndex={0}
    >
      <div className="VideoOverlay-screen" />

      <div className="VideoOverlay-icon">
        <VideoIcon />
      </div>
    </div>
  );
};

export default VideoOverlay;
