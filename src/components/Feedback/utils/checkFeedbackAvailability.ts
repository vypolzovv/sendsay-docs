import { CustomFrontMatter } from '../../../types';
import { isSidebarFolder, isUpdatesArticle } from '../../../utils';

export const checkFeedbackAvailability = (id: string, frontMatter: CustomFrontMatter) =>
  !isSidebarFolder(id) && !isUpdatesArticle(id) && !frontMatter.feedback_ignore;
