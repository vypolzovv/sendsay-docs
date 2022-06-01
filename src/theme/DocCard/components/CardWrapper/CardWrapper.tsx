import React, { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

interface CardContainerProps {
  href: string;
  children: ReactNode;
}

const CardContainer = ({ href, children }: CardContainerProps) => (
  <Link href={href} className={clsx('card padding--lg', styles.cardContainer)}>
    {children}
  </Link>
);

export default CardContainer;
