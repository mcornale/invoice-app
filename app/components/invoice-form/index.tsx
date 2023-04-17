import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import type { FormProps } from '../ui/form';
import { Form, links as formLinks } from '../ui/form';
import { Button, links as buttonLinks } from '../ui/button';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';
import { Fieldset, links as fieldsetLinks } from '../ui/fieldset';
import { Legend, links as legendLinks } from '../ui/legend';
import { InputField, links as inputFieldLinks } from '../ui/input-field';
import { SelectField, links as selectFieldLinks } from '../ui/select-field';

const PAYMENT_TERMS_OPTIONS = [
  { text: 'net 1 day', value: '1' },
  { text: 'net 7 days', value: '7' },
  { text: 'net 14 days', value: '14' },
  { text: 'net 30 days', value: '30' },
];

export interface Fields {
  senderAddressStreet: string;
  senderAddressCity: string;
  senderAddressPostCode: string;
  senderAddressCountry: string;
  clientName: string;
  clientEmail: string;
  clientAddressStreet: string;
  clientAddressCity: string;
  clientAddressPostCode: string;
  clientAddressCountry: string;
  createdAt: string;
  paymentTerms: string;
  description: string;
  itemNames: string[];
  itemQuantities: string[];
  itemPrices: string[];
  itemTotals: string[];
}
export interface FieldErrors {
  senderAddressStreet?: string;
  senderAddressCity?: string;
  senderAddressPostCode?: string;
  senderAddressCountry?: string;
  clientName?: string;
  clientEmail?: string;
  clientAddressStreet?: string;
  clientAddressCity?: string;
  clientAddressPostCode?: string;
  clientAddressCountry?: string;
  createdAt?: string;
  paymentTerms?: string;
  description?: string;
  itemNames?: string;
  itemQuantities?: string;
  itemPrices?: string;
  itemTotals?: string;
}

export interface InvoiceFormProps extends FormProps {
  fields?: Fields;
  fieldErrors?: FieldErrors;
  formErrors?: string[];
}

interface InvoiceFormItemProps {
  onDelete: () => void;
}

export const links: LinksFunction = () => {
  return [
    ...buttonLinks(),
    ...fieldsetLinks(),
    ...inputFieldLinks(),
    ...legendLinks(),
    ...selectFieldLinks(),
    ...formLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export function InvoiceForm({
  className,
  fieldErrors,
  formErrors,
  ...props
}: InvoiceFormProps) {
  const [items, setItems] = useState(
    new Array(0).fill(null).map((_, index) => index)
  );

  function handleAddNewItemClick() {
    setItems([...items, items.length]);
  }

  function handleDeleteItemClick(item: number) {
    setItems(items.filter((i) => i !== item));
  }

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
              options={PAYMENT_TERMS_OPTIONS}
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
          {items.map((id) => (
            <InvoiceFormItem
              key={id}
              onDelete={handleDeleteItemClick.bind(null, id)}
            />
          ))}
        </ul>
        <Button
          onClick={handleAddNewItemClick}
          type='button'
          variant='secondary-gray'
        >
          <PlusIcon />
          Add New Item
        </Button>
      </section>
    </Form>
  );
}

export function InvoiceFormItem({ onDelete }: InvoiceFormItemProps) {
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  function handleQuantityChange(e: ChangeEvent<HTMLInputElement>) {
    setQuantity(e.target.value);
  }

  function handlePriceChange(e: ChangeEvent<HTMLInputElement>) {
    setPrice(e.target.value);
  }

  return (
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
        value={quantity}
        onChange={handleQuantityChange}
      />
      <InputField
        aria-labelledby='price-label'
        name='item-price'
        type='number'
        min={0}
        step={0.01}
        value={price}
        onChange={handlePriceChange}
      />
      <InputField
        aria-labelledby='total-label'
        name='item-total'
        type='number'
        defaultValue={0}
        readOnly
        value={Number(quantity) * Number(price)}
      />
      <Button onClick={onDelete} type='button' variant='tertiary-gray'>
        <TrashIcon />
        <VisuallyHidden.Root>Delete Item</VisuallyHidden.Root>
      </Button>
    </li>
  );
}
