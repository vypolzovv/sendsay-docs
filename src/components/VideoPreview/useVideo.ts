import { useEffect, useRef, useState } from 'react';
import { AUTOPLAY_DELAY } from './constants';

export const useVideo = () => {
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);

  const videoRef = useRef(null);
  const timeout = useRef(null);

  const loadingGuard = (callback) => (!loading ? callback : undefined);

  const resetVideoTimer = () => {
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    });
  };

  const handleMouseEnter = () => {
    timeout.current = setTimeout(() => {
      setHovered(true);

      videoRef.current?.play();
    }, AUTOPLAY_DELAY);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeout.current);
    setHovered(false);

    videoRef.current?.pause();
    resetVideoTimer();
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('canplaythrough', () => {
        setLoading(false);
      });
    }
  }, []);

  return {
    videoRef,
    hovered,
    loading,
    handleMouseEnter: loadingGuard(handleMouseEnter),
    handleMouseLeave: loadingGuard(handleMouseLeave),
  };
};
