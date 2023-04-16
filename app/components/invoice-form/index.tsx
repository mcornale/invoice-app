import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import {
  Fieldset,
  Form,
  InputField,
  Legend,
  SelectField,
  links as formLinks,
} from '../ui/form';
import { Button, links as buttonLinks } from '../ui/button';
import type { FormHTMLAttributes } from 'react';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';

interface InvoiceFormProps extends FormHTMLAttributes<HTMLFormElement> {}

export const links: LinksFunction = () => {
  return [
    ...buttonLinks(),
    ...formLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export function InvoiceForm({ className, ...props }: InvoiceFormProps) {
  return (
    <Form className={`invoice-form ${className ?? ''}`} {...props}>
      <section className='billing-information'>
        <VisuallyHidden.Root>
          <h3>Billing Information</h3>
        </VisuallyHidden.Root>
        <Fieldset>
          <Legend>Bill From</Legend>
          <InputField
            label='Street Address'
            name='sender-address-street'
            type='text'
          />
          <div className='fieldset-row'>
            <InputField label='City' name='sender-address-city' type='text' />
            <InputField
              label='Post Code'
              name='sender-address-post-code'
              type='text'
            />
            <InputField
              label='Country'
              name='sender-address-country'
              type='text'
            />
          </div>
        </Fieldset>
        <Fieldset>
          <Legend>Bill To</Legend>
          <InputField label='Client Name' name='client-name' type='text' />
          <InputField label='Client Email' name='client-email' type='text' />
          <InputField
            label='Street Address'
            name='client-address-street'
            type='text'
          />
          <div className='fieldset-row'>
            <InputField label='City' name='client-address-city' type='text' />
            <InputField
              label='Post Code'
              name='client-address-post-code'
              type='text'
            />
            <InputField
              label='Country'
              name='client-address-country'
              type='text'
            />
          </div>
          <div className='fieldset-row'>
            <InputField label='Invoice Date' name='created-at' type='date' />
            <SelectField
              label='Payment Terms'
              name='payment-terms'
              placeholder='Select Payment Terms'
              values={['net 1 day', 'net 7 days', 'net 14 days', 'net 30 days']}
            />
          </div>
          <InputField
            label='Project Description'
            name='description'
            type='text'
          />
        </Fieldset>
      </section>
      <section className='item-list-section'>
        <h3>Item List</h3>
        <ul className='item-list'>
          <li className='item' aria-hidden>
            <span id='item-name-label' className='label'>
              Item Name
            </span>
            <span id='quantity-label' className='label'>
              Qty.
            </span>
            <span id='price-label' className='label'>
              Price
            </span>
            <span id='total-label' className='label'>
              Total
            </span>
            <span></span>
          </li>
          <li className='item'>
            <InputField
              aria-labelledby='item-name-label'
              name='item-name'
              type='text'
            />
            <InputField
              aria-labelledby='quantity-label'
              name='item-quantity'
              type='number'
              min={0}
            />
            <InputField
              aria-labelledby='price-label'
              name='item-price'
              type='number'
              min={0}
              step={0.01}
            />
            <InputField
              aria-labelledby='total-label'
              name='item-total'
              type='number'
              defaultValue={120}
              readOnly
            />
            <Button type='button' variant='tertiary-gray'>
              <TrashIcon />
              <VisuallyHidden.Root>Delete Item</VisuallyHidden.Root>
            </Button>
          </li>
        </ul>
        <Button type='button' variant='secondary-gray'>
          <PlusIcon />
          Add New Item
        </Button>
      </section>
    </Form>
  );
}
