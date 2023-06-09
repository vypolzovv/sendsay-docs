import React from 'react';
import DropdownNavbarItem from '@theme-original/NavbarItem/DropdownNavbarItem';
import type DropdownNavbarItemType from '@theme/NavbarItem/DropdownNavbarItem';
import type { WrapperProps } from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';
import { LinkLikeNavbarItemProps } from '@theme/NavbarItem';

interface DropdownNavbarItemWrapperProps extends WrapperProps<typeof DropdownNavbarItemType> {
  labelMode: string;
  items: (LinkLikeNavbarItemProps & { sidebarId: string })[];
}

const DropdownNavbarItemWrapper = ({
  label,
  items,
  labelMode,
  ...restProps
}: DropdownNavbarItemWrapperProps): JSX.Element => {
  const { pathname } = useLocation();

  let customLabel = label;

  if (labelMode === 'dynamic') {
    const a = items.find((item) => pathname.includes(item.sidebarId));

    customLabel = a?.label ?? label;
  }

  return (
    <>
      <DropdownNavbarItem {...restProps} items={items} label={customLabel} />
    </>
  );
};

export default DropdownNavbarItemWrapper;
