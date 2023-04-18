import type { LinksFunction } from '@remix-run/node';
import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import styles from './styles.css';
import type { LinkProps } from '@remix-run/react';
import { Link } from '@remix-run/react';

export type ButtonVariant =
  | 'primary'
  | 'primary-destructive'
  | 'secondary-color'
  | 'secondary-gray'
  | 'tertiary-color'
  | 'tertiary-gray';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  showSpinner?: boolean;
}

export interface ButtonLinkProps extends LinkProps {
  variant: ButtonVariant;
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
  ({ children, variant, className, showSpinner = false, ...props }, ref) => {
    return (
      <button
        className={`button button-${variant} ${
          showSpinner ? 'button-spinner' : ''
        } ${className ?? ''}`}
        {...props}
        ref={ref}
      >
        <div className='content'>{children}</div>
        {showSpinner && (
          <div className='spinner-wrapper'>
            <span className='spinner' />
          </div>
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ children, variant, className, ...props }, ref) => {
    return (
      <Link
        className={`button button-${variant} ${className ?? ''}`}
        {...props}
        ref={ref}
      >
        {children}
      </Link>
    );
  }
);
ButtonLink.displayName = 'ButtonLink';
