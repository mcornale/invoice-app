import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';
import type { FormProps as RemixFormProps } from '@remix-run/react';
import { Form as RemixForm } from '@remix-run/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

export interface FormProps extends RemixFormProps {}
export interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <RemixForm className={`form ${className ?? ''}`} {...props} ref={ref}>
        {children}
      </RemixForm>
    );
  }
);
Form.displayName = 'Form';

export const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  ({ children, ...props }, ref) => {
    return (
      <div className='form-group' {...props} ref={ref}>
        {children}
      </div>
    );
  }
);
FormGroup.displayName = 'FormGroup';
