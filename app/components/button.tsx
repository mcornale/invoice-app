import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant:
    | 'primary'
    | 'secondary-color'
    | 'secondary-gray'
    | 'tertiary-color'
    | 'tertiary-gray';
}

export function Button({ children, variant = 'primary' }: ButtonProps) {
  return <button className={`button button-${variant}`}>{children}</button>;
}
