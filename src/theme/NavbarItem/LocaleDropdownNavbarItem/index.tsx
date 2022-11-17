import React from 'react';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import IconLanguage from '@theme/Icon/Language';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import EN_LOCALE_LINKS from '@site/config/translatedLinks';
import styles from './styles.module.css';

const getCorrectRedirection = (link: string, translatedLinks: string[]): string => {
  if (!/\/en\//.test(link)) {
    return link;
  }

  if (!translatedLinks.includes(link)) {
    return '/en/';
  }

  return link;
};

const LocaleDropdownNavbarItem = ({
  mobile,
  dropdownItemsBefore,
  dropdownItemsAfter,
  ...props
}) => {
  const {
    i18n: { currentLocale, locales, localeConfigs },
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const localeItems = locales.map((locale) => {
    const relativeLink = alternatePageUtils.createUrl({
      locale,
      fullyQualified: false,
    });
    const to = `pathname://${getCorrectRedirection(relativeLink, EN_LOCALE_LINKS)}`;

    return {
      isNavLink: true,
      label: localeConfigs[locale].label,
      to,
      target: '_self',
      autoAddBaseUrl: false,
      className: locale === currentLocale ? 'dropdown__link--active' : '',
    };
  });
  const items = [...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter];

  const dropdownLabel = mobile
    ? translate({
        message: 'Languages',
        id: 'theme.navbar.mobileLanguageDropdown.label',
        description: 'The label for the mobile language switcher dropdown',
      })
    : localeConfigs[currentLocale].label;

  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={
        <>
          <IconLanguage className={styles.iconLanguage} />
          {dropdownLabel}
        </>
      }
      items={items}
    />
  );
};

export default LocaleDropdownNavbarItem;
