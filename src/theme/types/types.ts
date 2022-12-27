import { ResctrictedAccessStatus } from './enums';

export type RestrictedHref = string | undefined;

export type ResctrictedAccessItem = Record<string, ResctrictedAccessStatus>;

export interface ResctrictedAccessItems {
  categories?: ResctrictedAccessItem;
  articles?: ResctrictedAccessItem;
}
