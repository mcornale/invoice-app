import * as Select from '@radix-ui/react-select';
import { CaretDownIcon, CheckIcon } from '@radix-ui/react-icons';
import { upperFirst } from '~/utils/helpers/upper-first';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';

interface SelectFieldProps {
  label: string;
  name: string;
  placeholder: string;
  values: string[];
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export function SelectField({
  label,
  name,
  placeholder,
  values,
}: SelectFieldProps) {
  return (
    <div className='input-field'>
      <label className='label' htmlFor={`${name}-select`}>
        {label}
      </label>
      <Select.Root>
        <Select.Trigger className='select-trigger input' id={`${name}-select`}>
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
