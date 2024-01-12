/* eslint-disable global-require */
const yandexMetricaCounter = process.env.YANDEX_METRICA_COUNTER_ID;

const plugins = [
  './src/plugins/iframe-detected',
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
  async function tailwindPlugin() {
    return {
      name: 'docusaurus-tailwindcss',
      configurePostCss(postcssOptions) {
        postcssOptions.plugins.push(require('tailwindcss'));
        postcssOptions.plugins.push(require('autoprefixer'));

        return postcssOptions;
      },
    };
  },
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
