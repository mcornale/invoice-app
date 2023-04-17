import type { LinksFunction } from '@remix-run/node';
import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import styles from './styles.css';
import type { LinkProps } from '@remix-run/react';
import { Link } from '@remix-run/react';

type ButtonVariant =
  | 'primary'
  | 'primary-destructive'
  | 'secondary-color'
  | 'secondary-gray'
  | 'tertiary-color'
  | 'tertiary-gray';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
}

interface ButtonLinkProps extends LinkProps {
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

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ children, variant, className, ...props }, forwardedRed) => {
    return (
      <Link
        className={`button button-${variant} ${className ?? ''}`}
        {...props}
        ref={forwardedRed}
      >
        {children}
      </Link>
    );
  }
);
ButtonLink.displayName = 'ButtonLink';
