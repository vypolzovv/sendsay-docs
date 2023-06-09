import React from 'react';
import type { PropSidebarItemCategory } from '@docusaurus/plugin-content-docs';
import { findFirstCategoryLink } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import { CardLayout } from '../CardLayout';
import { getDescriptionObj } from '../../utils';
import { getAllowedCardItems } from '../../../utils/getAllowedCardItems';

interface CardCategoryProps {
  item: PropSidebarItemCategory;
}

const CardCategory = ({ item }: CardCategoryProps) => {
  const href = findFirstCategoryLink(item);

  if (!href) {
    return null;
  }

  const count = getAllowedCardItems(item.items).length;
  const descriptionText = getDescriptionObj(count);

  return (
    <CardLayout
      href={href}
      icon=""
      title={item.label}
      description={translate(descriptionText, { count })}
    />
  );
};

export default CardCategory;
