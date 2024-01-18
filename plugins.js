/* eslint-disable global-require */
const yandexMetricaCounter = process.env.YANDEX_METRICA_COUNTER_ID;

const plugins = [
  './src/plugins/iframe-detected',
  './src/plugins/tailwind',
  [
    'docusaurus-lunr-search',
    {
      languages: ['ru', 'en'],
      excludeRoutes: require('./config/searchExcludeRoutes.json'),
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
