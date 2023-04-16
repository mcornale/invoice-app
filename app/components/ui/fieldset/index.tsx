import type { FieldsetHTMLAttributes, ReactNode } from 'react';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';

interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
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

export function Fieldset({ children, className, ...props }: FieldsetProps) {
  return (
    <fieldset className={`fieldset ${className ?? ''}`} {...props}>
      {children}
    </fieldset>
  );
}
