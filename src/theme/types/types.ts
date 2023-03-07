import {
  ResctrictedAccessStatus,
  ResctrictedAccessStorageKeys,
  PropSidebarItemType,
} from './enums';

export type RestrictedHref = string | undefined;

export type ResctrictedAccessItem = Record<string, ResctrictedAccessStatus>;

export interface ResctrictedAccessItems {
  [ResctrictedAccessStorageKeys.Categories]?: ResctrictedAccessItem;
  [ResctrictedAccessStorageKeys.Articles]?: ResctrictedAccessItem;
}

export interface AllowedRoutesOptions {
  isStorageAllowed: boolean;
  type?: PropSidebarItemType;
  newRouteHref?: string;
}
