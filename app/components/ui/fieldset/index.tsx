import type { FieldsetHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';

interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <fieldset className={`fieldset ${className ?? ''}`} {...props} ref={ref}>
        {children}
      </fieldset>
    );
  }
);
Fieldset.displayName = 'Fieldset';
