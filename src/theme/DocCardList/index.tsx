import React from 'react';
import DocCardList from '@theme-original/DocCardList';
import { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import { getAllowedCardItems } from '../utils';

type Props = {
  items: PropSidebarItem[];
  className: string;
};

const DocCardListWrapper = ({ items = [], ...restProps }: Props): JSX.Element => {
  const filteredItems = getAllowedCardItems(items);

  return <DocCardList {...restProps} items={filteredItems} />;
};

export default DocCardListWrapper;
