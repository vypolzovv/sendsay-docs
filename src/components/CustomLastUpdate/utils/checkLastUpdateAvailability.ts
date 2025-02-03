import { CustomFrontMatter } from '../../../types';
import { isSidebarFolder, isUpdatesArticle } from '../../../utils';

export const checkLastUpdateAvailability = (id: string, frontMatter: CustomFrontMatter) =>
  !frontMatter.recent_article?.ignore && !isSidebarFolder(id) && !isUpdatesArticle(id);
