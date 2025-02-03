/* eslint-disable global-require */
const yandexMetricaCounter = process.env.YANDEX_METRICA_COUNTER_ID;

const plugins = [
  './src/plugins/iframe-detected',
  './src/plugins/tailwind',
  [
    './src/plugins/docs-plugin-extended',
    {
      routeBasePath: '/',
      sidebarPath: require.resolve('./sidebars.js'),
      showLastUpdateTime: true,
      editUrl: ({ docPath }) =>
        `https://github.com/sendsay-ru/sendsay-docs/edit/stable/docs/${docPath}`,
    },
  ],
  [
    'docusaurus-lunr-search',
    {
      languages: ['ru', 'en'],
      excludeRoutes: require('./config/searchExcludeRoutes.json'),
      maxHits: 30,
    },
  ],
  [
    '@docusaurus/plugin-client-redirects',
    {
      redirects: require('./config/redirects.json'),
    },
  ],
  require.resolve('docusaurus-plugin-image-zoom'),
];

if (yandexMetricaCounter) {
  plugins.push([
    'docusaurus-plugin-yandex-metrica',
    {
      counterID: yandexMetricaCounter,
    },
  ]);
}

module.exports = plugins;
