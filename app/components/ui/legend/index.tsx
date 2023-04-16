import type { LinksFunction } from '@remix-run/node';
import type { HTMLAttributes, ReactNode } from 'react';
import styles from './styles.css';

interface LegendProps extends HTMLAttributes<HTMLLegendElement> {
  children: ReactNode;
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export function Legend({ children, className, ...props }: LegendProps) {
  return (
    <legend className={`legend ${className ?? ''}`} {...props}>
      {children}
    </legend>
  );
}
