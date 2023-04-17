import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';
import { forwardRef } from 'react';

interface CheckboxFieldProps extends Checkbox.CheckboxProps {
  label: string;
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const CheckboxField = forwardRef<HTMLButtonElement, CheckboxFieldProps>(
  ({ label, name, value, ...props }, ref) => {
    return (
      <div className='checkbox-field'>
        <Checkbox.Root
          className='checkbox'
          id={`${value ?? name}-checkbox`}
          name={name}
          value={value}
          {...props}
          ref={ref}
        >
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label className='label' htmlFor={`${value ?? name}-checkbox`}>
          {label}
        </label>
      </div>
    );
  }
);
CheckboxField.displayName = 'CheckboxField';
