import type { LinksFunction } from 'react-router';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import styles from './styles.css?url';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
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

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant }, ref) => {
    return (
      <span className={`badge badge-${variant}`} ref={ref}>
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';
