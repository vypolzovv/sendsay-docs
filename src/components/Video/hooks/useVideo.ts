import { useEffect, useRef, useState } from 'react';
import { AUTOPLAY_DELAY } from '../constants';

export const useVideo = () => {
  const [loading, setLoading] = useState(true);
  const [launched, setLaunched] = useState(false);

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
      setLaunched(true);

      videoRef.current?.play();
    }, AUTOPLAY_DELAY);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeout.current);
    setLaunched(false);

    videoRef.current?.pause();
    resetVideoTimer();
  };

  const handleClick = () => {
    setLaunched(true);

    videoRef.current?.play();
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
    handleMouseEnter: loadingGuard(handleMouseEnter),
    handleMouseLeave: loadingGuard(handleMouseLeave),
    handleClick,
    launched,
  };
};
