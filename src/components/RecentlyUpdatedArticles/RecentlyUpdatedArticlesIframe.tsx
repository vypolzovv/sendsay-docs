import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import { RECENT_ARTICLES_CONTENT_ID, RECENT_ARTICLES_TEMP_URL } from './constants.js';

const DEFAULT_IFRAME_HEIGHT = '700px';

const getIframeHeight = (scrollHeight?: number) => (scrollHeight ? scrollHeight + 5 : undefined);

export const RecentlyUpdatedArticlesIframe = () => {
  const history = useHistory();
  const iframeRef = useRef<HTMLIFrameElement>();

  const [isError, setIsError] = useState(false);

  const handleRedirectInIframe: EventListener = ({ detail }: CustomEvent) => {
    if (detail?.slug) {
      history.push(detail.slug);
    }
  };

  const resizeIframe = () => {
    if (!iframeRef.current) {
      setIsError(true);

      return;
    }

    const recentArticleContentElement = iframeRef.current.contentWindow.document.getElementById(
      RECENT_ARTICLES_CONTENT_ID
    );

    const iframeHeight = getIframeHeight(recentArticleContentElement?.scrollHeight);

    iframeRef.current.style.height = `${iframeHeight}px`;

    iframeRef.current?.contentWindow.document.addEventListener('redirect', handleRedirectInIframe);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeIframe);

    return () => {
      window.removeEventListener('resize', resizeIframe);
    };
  }, [resizeIframe]);

  if (isError) {
    return <span>На странице произошёл сбой.</span>;
  }

  return (
    <iframe
      ref={iframeRef}
      src={RECENT_ARTICLES_TEMP_URL}
      name="latest-articles"
      title="latest-articles"
      className="w-full"
      style={{
        border: 'none',
        outline: 'none',
        height: DEFAULT_IFRAME_HEIGHT,
      }}
      onLoad={resizeIframe}
      scrolling="no"
      seamless
    />
  );
};
