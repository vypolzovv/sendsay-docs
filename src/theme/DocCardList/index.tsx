import React from 'react';
import DocCardList from '@theme-original/DocCardList';
import { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import { useCurrentSidebarCategory } from '@docusaurus/theme-common';
import { getAllowedCardItems } from '../utils';
import styles from './styles.module.css';

type Props = {
  items: PropSidebarItem[];
  className: string;
};

const DocCardListWrapper = ({ className, ...restProps }: Props): JSX.Element => {
  const { items } = useCurrentSidebarCategory();

  const filteredItems = getAllowedCardItems(items);

  return (
    <DocCardList
      {...restProps}
      items={filteredItems}
      className={`${styles.DocCardList} ${styles[className]}`}
    />
  );
};

export default DocCardListWrapper;
