import { isSidebarFolder, isUpdatesArticle } from '../../utils';

const RECENT_ARTICLES_LIMIT = 5;

export const getRecentlyUpdatedArticles = (docs) =>
  docs
    .filter(
      ({ unlisted, draft, frontMatter, id }) =>
        !unlisted &&
        !draft &&
        !frontMatter?.recent_article?.ignore &&
        !isSidebarFolder(id) &&
        !isUpdatesArticle(id)
    )
    .sort((docA, docB) => docB.lastUpdatedAt - docA.lastUpdatedAt)
    .slice(0, RECENT_ARTICLES_LIMIT);
