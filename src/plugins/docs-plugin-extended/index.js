import docsPluginExports from '@docusaurus/plugin-content-docs';
import { getRecentlyUpdatedArticles } from './getRecentArticles';
import { RECENT_ARTICLES_TEMP_URL } from '../../components/RecentlyUpdatedArticles/constants';

const docsPluginEnhanced = async (...pluginArgs) => {
  const docsPluginInstance = await docsPluginExports(...pluginArgs);

  return {
    ...docsPluginInstance,

    async contentLoaded(params) {
      const { content, actions } = params;
      const { docs } = content.loadedVersions[0];

      const recentlyUpdatedArticles = getRecentlyUpdatedArticles(docs);

      const recentArticles = await actions.createData(
        'recentlyUpdatedArticles.json',
        JSON.stringify(recentlyUpdatedArticles)
      );

      actions.addRoute({
        path: RECENT_ARTICLES_TEMP_URL,
        exact: true,
        component: '@site/src/components/RecentlyUpdatedArticles/RecentlyUpdatedArticles.js',
        modules: {
          recentArticles,
        },
      });

      return docsPluginInstance.contentLoaded(params);
    },
  };
};

export * from '@docusaurus/plugin-content-docs';
export default docsPluginEnhanced;
