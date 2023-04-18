import type { LinksFunction } from '@remix-run/node';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import styles from './styles.css';

interface LegendProps extends HTMLAttributes<HTMLLegendElement> {}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const Legend = forwardRef<HTMLLegendElement, LegendProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <legend className={`legend ${className ?? ''}`} {...props} ref={ref}>
        {children}
      </legend>
    );
  }
);
Legend.displayName = 'Legend';
