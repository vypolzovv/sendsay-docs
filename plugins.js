/* eslint-disable global-require */
const baseGTM = process.env.GTM_SCRIPTS_ID;
const landingGTM = process.env.GTM_LANDING_GROUP_COUNTER_ID;
const yandexMetricaCounter = process.env.YANDEX_METRICA_COUNTER_ID;

const gtagIds = [baseGTM, landingGTM].filter((id) => Boolean(id));

const plugins = [
  './src/plugins/iframe-detected',
  ['./src/plugins/gtag/index.ts', { trackingID: baseGTM }],
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

if (gtagIds.length) {
  plugins.push(['@docusaurus/plugin-google-gtag', { trackingID: gtagIds, anonymizeIP: true }]);
}

module.exports = plugins;
