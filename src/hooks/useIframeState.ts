import { useEffect } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { IFRAME_HIDDEN_CLASSES } from '../constants';

const isInIframe = () => {
  try {
    return window.self !== window.top;
  } catch (err) {
    return true;
  }
};

const hideBlocks = () => {
  const elementsToHide = IFRAME_HIDDEN_CLASSES.map(
    (className) => document.getElementsByClassName(className)[0]
  );

  elementsToHide.forEach((element) => element?.classList.add('iframe-hidden'));
};

const useIframeState = ({ content }) => {
  const isBrowser = useIsBrowser();

  useEffect(() => {
    if (isBrowser && isInIframe()) {
      hideBlocks();
    }
  }, [content, isBrowser]);
};

export default useIframeState;
