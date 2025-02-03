import dotenv from 'dotenv';
import type { Config } from '@docusaurus/types';
import type { Options, ThemeConfig } from '@docusaurus/preset-classic';
import { themes } from 'prism-react-renderer';
import plugins from './plugins';

dotenv.config();

const googleVerificationCode = process.env.GOOGLE_VERIFICATION_CODE;
const yandexVerificationCode = process.env.YANDEX_VERIFICATION_CODE;
const baseGTM = process.env.GTM_SCRIPTS_ID;
const landingGA = process.env.GTM_LANDING_GROUP_COUNTER_ID;
const noIndex = process.env.NO_PAGE_INDEXING === 'true';

const config: Config = {
  title: 'База знаний Sendsay',
  tagline: 'Советы и ответы от команды Sendsay',
  url: 'https://docs.sendsay.ru',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.svg',

  // We don't want any develop page being indexed by browsers
  noIndex,

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
  },

  plugins,

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        gtag: {
          trackingID: landingGA,
          anonymizeIP: false,
        },
        googleTagManager: {
          containerId: baseGTM,
        },
        // we use extended version to get recently updated articles
        docs: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          ignorePatterns: require('./config/sitemapIgnorePatterns'),
        },
      } satisfies Options,
    ],
  ],

  themeConfig: {
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
      theme: themes.github,
      darkTheme: themes.dracula,
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
  } satisfies ThemeConfig,
};

module.exports = config;
