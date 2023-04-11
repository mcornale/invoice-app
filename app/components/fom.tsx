import type { InputHTMLAttributes, ReactNode } from 'react';

interface FormProps {
  children: ReactNode;
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export function Form({ children }: FormProps) {
  return <form className='form'>{children}</form>;
}

export function InputField({ label, name, ...props }: InputFieldProps) {
  return (
    <div className='input-field'>
      <label className='label' htmlFor={`${name}-input`}>
        {label}
      </label>
      <input className='input' name={name} id={`${name}-input`} {...props} />
    </div>
  );
}
