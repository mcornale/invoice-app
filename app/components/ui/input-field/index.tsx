import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';
import { CalendarIcon } from '@radix-ui/react-icons';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, className, ...props }, ref) => {
    const input = (
      <input
        className={`input ${className ?? ''}`}
        name={name}
        id={`${name}-input`}
        {...props}
        ref={ref}
      />
    );

    return (
      <div className='input-field'>
        {label && (
          <label className='label' htmlFor={`${name}-input`}>
            {label}
          </label>
        )}
        {props.type === 'date' ? (
          <div className='input-date-container'>
            {input}
            <CalendarIcon />
          </div>
        ) : (
          input
        )}
      </div>
    );
  }
);
InputField.displayName = 'InputField';
