import { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import { getAllowedRoutes, checkAllowedRoutes } from './routeAccessUtils';

export const getAllowedCardItems = (items: PropSidebarItem[]) =>
  items.filter(({ customProps = {} }) => {
    const routeHref = customProps.restrictedAccessHref as string | undefined;

    if (!routeHref) {
      return true;
    }

    return checkAllowedRoutes(getAllowedRoutes(), routeHref);
  });
