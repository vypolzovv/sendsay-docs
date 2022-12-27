import { useHistory } from '@docusaurus/router';
import { checkNewAccessToRoute, getAllowedRoutes } from '../utils';
import { RestrictedHref } from '../types';

export const useRouteAllowance = (routeHref: RestrictedHref, isStorageAllowed: boolean) => {
  const {
    location: { pathname: path },
  } = useHistory();

  const isNewAccessToRoute = checkNewAccessToRoute(routeHref, path);
  const allowedRoutes = getAllowedRoutes(routeHref, {
    isNewAccessToRoute,
    isStorageAllowed,
  });

  return {
    isNewAccessToRoute,
    allowedRoutes,
  };
};
