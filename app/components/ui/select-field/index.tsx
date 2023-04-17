import * as Select from '@radix-ui/react-select';
import { CaretDownIcon, CheckIcon } from '@radix-ui/react-icons';
import { upperFirst } from '~/utils/formatters';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';
import { forwardRef } from 'react';

interface Option {
  text: string;
  value: string;
}
interface SelectFieldProps extends Select.SelectProps {
  label: string;
  name: string;
  placeholder: string;
  options: Option[];
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const SelectField = forwardRef<HTMLButtonElement, SelectFieldProps>(
  ({ label, name, placeholder, options, ...props }, ref) => {
    return (
      <div className='input-field'>
        <label className='label' htmlFor={`${name}-select`}>
          {label}
        </label>
        <Select.Root name={name} {...props}>
          <Select.Trigger
            className='select-trigger input'
            id={`${name}-select`}
            ref={ref}
          >
            <Select.Value placeholder={placeholder} />
            <CaretDownIcon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              className='select-content'
              position='popper'
              sideOffset={8}
            >
              <Select.Viewport className='select-viewport'>
                {options.map((option, index) => (
                  <Select.Item
                    key={index}
                    className='select-item'
                    value={option.value}
                  >
                    <Select.ItemText>{upperFirst(option.text)}</Select.ItemText>
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
);
SelectField.displayName = 'SelectField';
