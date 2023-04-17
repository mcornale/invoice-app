import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';
import type { FormProps as RemixFormProps } from '@remix-run/react';
import { Form as RemixForm } from '@remix-run/react';

export interface FormProps extends RemixFormProps {}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const Form = ({ children, className, ...props }: RemixFormProps) => {
  return (
    <RemixForm className={`form ${className ?? ''}`} {...props}>
      {children}
    </RemixForm>
  );
};
