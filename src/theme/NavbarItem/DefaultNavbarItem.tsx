import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink';

const DefaultNavbarItemDesktop = ({ className, isDropdownItem = false, ...props }) => {
  const element = (
    <NavbarNavLink
      className={clsx(isDropdownItem ? 'dropdown__link' : 'navbar__item navbar__link', className)}
      {...props}
    />
  );

  if (isDropdownItem) {
    return <li>{element}</li>;
  }

  return element;
};

const DefaultNavbarItemMobile = ({ className, isDropdownItem, ...props }) => (
  <li className="menu__list-item">
    <NavbarNavLink className={clsx('menu__link', className)} {...props} />
  </li>
);

const DefaultNavbarItem = ({
  mobile = false,
  position,
  displayedLocale,
  // Need to destructure position from props so that it doesn't get passed on.
  ...props
}) => {
  const Comp = mobile ? DefaultNavbarItemMobile : DefaultNavbarItemDesktop;
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  if (displayedLocale && displayedLocale !== currentLocale) {
    return null;
  }

  return (
    <Comp
      {...props}
      activeClassName={
        props.activeClassName ?? (mobile ? 'menu__link--active' : 'navbar__link--active')
      }
    />
  );
};

export default DefaultNavbarItem;
