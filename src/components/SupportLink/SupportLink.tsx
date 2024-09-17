import React, { PropsWithChildren } from 'react';
import styles from './SupportLink.module.css';

declare global {
  interface Window {
    carrotquest?: {
      open: () => void;
    };
  }
}

const SupportLink = ({ children }: PropsWithChildren) => {
  const handleChatLinkClick = () => {
    if (window.carrotquest !== undefined) {
      window.carrotquest.open();
    } else {
      // eslint-disable-next-line no-console
      console.error('Unable to open carrot quest chat. Does the widget exist?');
    }
  };

  return (
    <button onClick={handleChatLinkClick} className={styles.supportLink} tabIndex={0} type="button">
      {children}
    </button>
  );
};

export default SupportLink;
