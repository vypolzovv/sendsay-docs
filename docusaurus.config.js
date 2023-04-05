// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const analyticsId = process.env.GTM_ANALYTICS_ID;
const scriptsId = process.env.GTM_SCRIPTS_ID;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'База знаний Sendsay',
  tagline: 'Советы и ответы от команды Sendsay',
  url: 'https://sendsay.ru',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.svg',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Sendsay Inc.', // Usually your GitHub org/user name.
  projectName: 'sendsay-docs', // Usually your repo name.

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
  },

  plugins: [
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
    [
      'docusaurus-plugin-yandex-metrica',
      {
        counterID: '5230714',
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: ({ docPath }) =>
            `https://github.com/sendsay-ru/sendsay-docs/edit/stable/docs/${docPath}`,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag:
          analyticsId || scriptsId
            ? {
                trackingID: [analyticsId, scriptsId],
                anonymizeIP: true,
              }
            : undefined,
        sitemap: {
          ignorePatterns: require('./config/sitemapIgnorePatterns'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'Sendsay docs',
          src: 'img/logo.svg',
          className: 'no-border',
        },
        items: [
          {
            to: '/integrations',
            position: 'left',
            label: 'Интеграции',
            activeBaseRegex: 'integrations/*',
            displayedLocale: 'ru',
          },
          {
            to: '/videolessons',
            label: 'Видеоуроки',
            position: 'left',
            displayedLocale: 'ru',
          },
          {
            href: 'https://app.sendsay.ru',
            label: 'Перейти в Sendsay',
            position: 'right',
          },
          {
            href: 'https://sendsay.ru/api/api.html',
            label: 'Sendsay API',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        copyright: `Copyright © ${new Date().getFullYear()} Sendsay.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        disableSwitch: true,
      },
    }),
};

module.exports = config;
