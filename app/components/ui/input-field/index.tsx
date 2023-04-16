import type { InputHTMLAttributes } from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';

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

export function InputField({
  label,
  name,
  className,
  ...props
}: InputFieldProps) {
  const input = (
    <input
      className={`input ${className ?? ''}`}
      name={name}
      id={`${name}-input`}
      {...props}
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
