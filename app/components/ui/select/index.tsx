import * as SelectPrimitive from '@radix-ui/react-select';
import { CaretDownIcon, CheckIcon } from '@radix-ui/react-icons';
import { upperFirst } from '~/utils/formatters';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';
import { forwardRef } from 'react';

interface Option {
  text: string;
  value: string;
}

export interface SelectProps extends SelectPrimitive.SelectProps {
  id: string;
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

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ name, id, placeholder, options, ...props }, ref) => {
    return (
      <SelectPrimitive.Root name={name} {...props}>
        <SelectPrimitive.Trigger
          className='select-trigger input'
          id={id}
          ref={ref}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <CaretDownIcon />
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className='select-content'
            position='popper'
            sideOffset={8}
          >
            <SelectPrimitive.Viewport className='select-viewport'>
              {options.map((option, index) => (
                <SelectPrimitive.Item
                  key={index}
                  className='select-item'
                  value={option.value}
                >
                  <SelectPrimitive.ItemText>
                    {upperFirst(option.text)}
                  </SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className='select-item-indicator'>
                    <CheckIcon />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  }
);
Select.displayName = 'Select';
