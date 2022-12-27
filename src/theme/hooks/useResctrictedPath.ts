import { useLayoutEffect } from 'react';
import { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { checkAllowedRoutes, ResctrictedAccessStorage, checkHiddenSidebarItem } from '../utils';
import { RestrictedHref } from '../types';
import { useRouteAllowance } from './useRouteAllowance';

export const useResctrictedPath = (item: PropSidebarItem) => {
  const isBrowser = useIsBrowser();
  const routeHref = item.customProps?.restrictedAccessHref as RestrictedHref;

  const { allowedRoutes, isNewAccessToRoute } = useRouteAllowance(routeHref, isBrowser);

  useLayoutEffect(() => {
    if (isNewAccessToRoute && isBrowser) {
      ResctrictedAccessStorage.setJSON(allowedRoutes);
    }
  }, [isBrowser]);

  return {
    isRestricted: checkHiddenSidebarItem(item) || !checkAllowedRoutes(allowedRoutes, routeHref),
  };
};
