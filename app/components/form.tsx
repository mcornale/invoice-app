import type { FormHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import { CalendarIcon, CaretDownIcon, CheckIcon } from '@radix-ui/react-icons';
import { upperFirst } from '~/utils/helpers/upper-first';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
}

interface CheckboxFieldProps {
  label: string;
  name: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  values: string[];
}

export function Form({ children, className, ...props }: FormProps) {
  return (
    <form className={`form ${className}`} {...props}>
      {children}
    </form>
  );
}

export function InputField({ label, name, ...props }: InputFieldProps) {
  const input = (
    <input className='input' name={name} id={`${name}-input`} {...props} />
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

export function CheckboxField({ label, name }: CheckboxFieldProps) {
  return (
    <div className='checkbox-field'>
      <Checkbox.Root
        className='checkbox'
        defaultChecked
        id={`${name}-checkbox`}
      >
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className='label' htmlFor={`${name}-checkbox`}>
        {label}
      </label>
    </div>
  );
}

export function SelectField({ label, name, values }: SelectFieldProps) {
  return (
    <div className='input-field'>
      <label className='label' htmlFor={`${name}-select`}>
        {label}
      </label>
      <Select.Root>
        <Select.Trigger className='select-trigger input' id={`${name}-select`}>
          <Select.Value placeholder='Select Payment Terms' />
          <CaretDownIcon />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className='select-content'
            position='popper'
            sideOffset={8}
          >
            <Select.Viewport className='select-viewport'>
              {values.map((value, index) => (
                <Select.Item key={index} className='select-item' value={value}>
                  <Select.ItemText>{upperFirst(value)}</Select.ItemText>
                  <Select.ItemIndicator className='select-item-indicator'>
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
