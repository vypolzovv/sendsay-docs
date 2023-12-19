/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const plugins = require('./plugins');
const googleVerificationCode = process.env.GOOGLE_VERIFICATION_CODE;
const yandexVerificationCode = process.env.YANDEX_VERIFICATION_CODE;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'База знаний Sendsay',
  tagline: 'Советы и ответы от команды Sendsay',
  url: 'https://docs.sendsay.ru',
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

  plugins,

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: ({ docPath }) =>
            `https://github.com/sendsay-ru/sendsay-docs/edit/stable/docs/${docPath}`,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          ignorePatterns: require('./config/sitemapIgnorePatterns'),
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      navbar: {
        logo: {
          alt: 'Sendsay docs',
          src: 'img/logo.svg',
          className: 'no-border',
        },
        items: [
          {
            type: 'dropdown',
            label: 'Главная',
            labelMode: 'dynamic',
            position: 'left',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'docs',
                label: 'Главная',
              },
              {
                type: 'docSidebar',
                sidebarId: 'integrations',
                label: 'Интеграции',
              },
              {
                type: 'docSidebar',
                sidebarId: 'videolessons',
                label: 'Видеоуроки',
              },
              {
                type: 'docSidebar',
                sidebarId: 'updates',
                label: 'Обновления',
              },
            ],
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'docs',
            label: 'Главная',
            displayedLocale: 'ru',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'integrations',
            label: 'Интеграции',
            displayedLocale: 'ru',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'videolessons',
            label: 'Видеоуроки',
            displayedLocale: 'ru',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'updates',
            label: 'Обновления',
            displayedLocale: 'ru',
          },
          {
            href: 'https://app.sendsay.ru',
            label: 'Sendsay',
            position: 'right',
          },
          {
            href: 'https://sendsay.ru/api/api.html',
            label: 'API',
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
      zoom: {
        selector: '.markdown img',
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)',
        },
      },
      metadata: [
        {
          name: 'google-site-verification',
          content: googleVerificationCode,
        },
        {
          name: 'yandex-verification',
          content: yandexVerificationCode,
        },
      ],
    },
};

module.exports = config;
