import VideoDefault from '../VideoDefault';
import VideoIframe from '../VideoIframe';

export const getVideoComponent = (src: string) =>
  /^https?:\/\//.test(src) ? VideoIframe : VideoDefault;
