import React from 'react';
import type { Props } from '@theme/DocCard';
import { CardLink } from '../CardLink';
import { CardCategory } from '../CardCategory';

const Card = ({ item }: Props) => {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
};

export default Card;
