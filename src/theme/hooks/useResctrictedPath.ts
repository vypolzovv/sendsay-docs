import { useLayoutEffect } from 'react';
import { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { checkAllowedRoutes, ResctrictedAccessStorage, checkHiddenSidebarItem } from '../utils';
import { RestrictedHref, PropSidebarItemType } from '../types';
import { useRouteAllowance } from './useRouteAllowance';

export const useResctrictedPath = (item: PropSidebarItem) => {
  const isStorageAllowed = useIsBrowser();
  const routeHref = item.customProps?.restrictedAccessHref as RestrictedHref;

  const { allowedRoutes, isNewAccessToRoute } = useRouteAllowance(routeHref, {
    isStorageAllowed,
    type: item.type as PropSidebarItemType,
  });

  useLayoutEffect(() => {
    if (isNewAccessToRoute && isStorageAllowed) {
      ResctrictedAccessStorage.setJSON(allowedRoutes);
    }
  }, [isStorageAllowed, isNewAccessToRoute]);

  return {
    isRestricted: checkHiddenSidebarItem(item) || !checkAllowedRoutes(allowedRoutes, routeHref),
  };
};
