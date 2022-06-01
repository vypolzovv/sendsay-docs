import React, { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { CardWrapper } from '../CardWrapper';

interface CardLayoutProps {
  href: string;
  icon: ReactNode;
  title: string;
  description: string | null;
}

const CardLayout = ({ href, icon, title, description = null }: CardLayoutProps) => (
  <CardWrapper href={href}>
    <h2 className={clsx('text--truncate', styles.cardTitle)} title={title}>
      {icon} {title}
    </h2>
    {description && (
      <p className={clsx('text--truncate', styles.cardDescription)} title={description}>
        {description}
      </p>
    )}
  </CardWrapper>
);

export default CardLayout;
