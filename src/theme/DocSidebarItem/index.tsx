import React from 'react';
import DocSidebarItem from '@theme-original/DocSidebarItem';
import type DocSidebarItemType from '@theme/DocSidebarItem';
import type { WrapperProps } from '@docusaurus/types';
import { useResctrictedPath } from '../hooks';

type Props = WrapperProps<typeof DocSidebarItemType>;

const DocSidebarItemWrapper = ({ item, ...restProps }: Props): JSX.Element => {
  const { isRestricted } = useResctrictedPath(item);

  if (isRestricted) {
    return null;
  }

  return <DocSidebarItem {...restProps} item={item} />;
};

export default DocSidebarItemWrapper;
