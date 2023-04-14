import type { LinksFunction } from '@remix-run/node';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import styles from './styles.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant:
    | 'primary'
    | 'primary-destructive'
    | 'secondary-color'
    | 'secondary-gray'
    | 'tertiary-color'
    | 'tertiary-gray';
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, className, ...props }, forwardedRed) => {
    return (
      <button
        className={`button button-${variant} ${className ?? ''}`}
        {...props}
        ref={forwardedRed}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
