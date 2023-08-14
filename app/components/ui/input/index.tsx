import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';
import { CheckIcon } from '@radix-ui/react-icons';
import * as Checkbox from '@radix-ui/react-checkbox';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
export interface InputCheckboxProps extends Checkbox.CheckboxProps {}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input className={`input ${className ?? ''}`} {...props} ref={ref} />
    );
  }
);
Input.displayName = 'Input';

export const InputCheckbox = forwardRef<HTMLButtonElement, InputCheckboxProps>(
  ({ value, ...props }, ref) => {
    return (
      <Checkbox.Root className='checkbox' value={value} {...props} ref={ref}>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
    );
  }
);
InputCheckbox.displayName = 'InputCheckbox';
