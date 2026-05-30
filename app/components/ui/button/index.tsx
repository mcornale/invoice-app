import type { LinksFunction } from 'react-router';
import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import styles from './styles.css?url';
import type { LinkProps } from 'react-router';
import { Link } from 'react-router';

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
  iconOnly?: boolean;
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
  (
    {
      children,
      variant,
      className,
      showSpinner = false,
      iconOnly = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={`button button-${variant} ${
          showSpinner ? 'button-spinner' : ''
        } ${iconOnly ? 'button-icon-only' : ''} ${className ?? ''}`}
        {...props}
        ref={ref}
      >
        <span className='content'>{children}</span>
        {showSpinner && (
          <span className='spinner-wrapper'>
            <span className='spinner' />
          </span>
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
