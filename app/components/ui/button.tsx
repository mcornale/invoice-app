import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant:
    | 'primary'
    | 'secondary-color'
    | 'secondary-gray'
    | 'tertiary-color'
    | 'tertiary-gray';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, className, ...props }, forwardedRed) => {
    return (
      <button
        className={`button button-${variant} ${className}`}
        {...props}
        ref={forwardedRed}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
