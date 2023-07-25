import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';
import type { FormProps as RemixFormProps } from '@remix-run/react';
import { Form as RemixForm } from '@remix-run/react';
import type {
  FieldsetHTMLAttributes,
  HTMLAttributes,
  LabelHTMLAttributes,
} from 'react';
import { forwardRef } from 'react';

export type FormProps = RemixFormProps;
export type FormFieldsetProps = FieldsetHTMLAttributes<HTMLFieldSetElement>;
export type FormLegendProps = HTMLAttributes<HTMLLegendElement>;
export type FormFieldProps = HTMLAttributes<HTMLDivElement>;
export type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement>;
export type FormErrorProps = HTMLAttributes<HTMLSpanElement>;

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ children, className, noValidate = true, ...props }, ref) => {
    return (
      <RemixForm
        className={`form ${className ?? ''}`}
        {...props}
        ref={ref}
        noValidate={noValidate}
      >
        {children}
      </RemixForm>
    );
  }
);
Form.displayName = 'Form';

export const FormFieldset = forwardRef<HTMLFieldSetElement, FormFieldsetProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <fieldset
        className={`form-fieldset ${className ?? ''}`}
        {...props}
        ref={ref}
      >
        {children}
      </fieldset>
    );
  }
);
FormFieldset.displayName = 'FormFieldset';

export const FormLegend = forwardRef<HTMLLegendElement, FormLegendProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <legend className={`form-legend ${className ?? ''}`} {...props} ref={ref}>
        {children}
      </legend>
    );
  }
);
FormLegend.displayName = 'FormLegend';

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, ...props }, ref) => {
    return (
      <div className='form-field' {...props} ref={ref}>
        {children}
      </div>
    );
  }
);
FormField.displayName = 'FormField';

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ children, ...props }, ref) => {
    return (
      <label className='form-label' {...props} ref={ref}>
        {children}
      </label>
    );
  }
);
FormLabel.displayName = 'FormLabel';

export const FormError = forwardRef<HTMLSpanElement, FormErrorProps>(
  ({ children, ...props }, ref) => {
    return (
      <span className='form-error' role='alert' {...props} ref={ref}>
        {children}
      </span>
    );
  }
);
FormError.displayName = 'FormError';
