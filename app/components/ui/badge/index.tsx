import type { LinksFunction } from '@remix-run/node';
import type { HTMLAttributes, ReactNode } from 'react';
import styles from './styles.css';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant: 'success' | 'warning' | 'gray';
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export function Badge({ children, variant }: BadgeProps) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}
