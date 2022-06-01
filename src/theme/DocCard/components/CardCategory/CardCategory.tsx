import React from 'react';
import type { PropSidebarItemCategory } from '@docusaurus/plugin-content-docs';
import { findFirstCategoryLink } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import { getDescriptionObj } from '../../utils';
import { CardLayout } from '../CardLayout';

interface CardCategoryProps {
  item: PropSidebarItemCategory;
}

const CardCategory = ({ item }: CardCategoryProps) => {
  const href = findFirstCategoryLink(item);

  if (!href) {
    return null;
  }

  const count = item.items.length;
  const descriptionText = getDescriptionObj(count);

  return (
    <CardLayout
      href={href}
      icon="🗃️"
      title={item.label}
      description={translate(descriptionText, { count })}
    />
  );
};

export default CardCategory;
