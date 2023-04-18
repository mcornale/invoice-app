import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import type { FormProps } from '../ui/form';
import { FormField, FormFieldset, FormLabel, FormLegend } from '../ui/form';
import { Form, links as formLinks } from '../ui/form';
import { Button, links as buttonLinks } from '../ui/button';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';
import { Input, links as inputLinks } from '../ui/input';
import { Select, links as selectLinks } from '../ui/select';

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
    ...inputLinks(),
    ...selectLinks(),
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
        <FormFieldset>
          <FormLegend>Bill From</FormLegend>
          <FormField>
            <FormLabel htmlFor='sender-address-street'>
              Street Address
            </FormLabel>
            <Input
              id='sender-address-street'
              name='sender-address-street'
              type='text'
            />
            {fieldErrors?.senderAddressStreet && (
              <p>{fieldErrors.senderAddressStreet}</p>
            )}
          </FormField>
          <div className='fieldset-row'>
            <FormField>
              <FormLabel htmlFor='sender-address-city'>City</FormLabel>
              <Input
                id='sender-address-city'
                name='sender-address-city'
                type='text'
              />
              {fieldErrors?.senderAddressCity && (
                <p>{fieldErrors.senderAddressCity}</p>
              )}
            </FormField>
            <FormField>
              <FormLabel htmlFor='sender-address-post-code'>
                Post Code
              </FormLabel>
              <Input
                id='sender-address-post-code'
                name='sender-address-post-code'
                type='text'
              />
              {fieldErrors?.senderAddressPostCode && (
                <p>{fieldErrors.senderAddressPostCode}</p>
              )}
            </FormField>
            <FormField>
              <FormLabel htmlFor='sender-address-country'>Country</FormLabel>
              <Input
                id='sender-address-country'
                name='sender-address-country'
                type='text'
              />
              {fieldErrors?.senderAddressCountry && (
                <p>{fieldErrors.senderAddressCountry}</p>
              )}
            </FormField>
          </div>
        </FormFieldset>
        <FormFieldset>
          <FormLegend>Bill To</FormLegend>
          <FormField>
            <FormLabel htmlFor='client-name'>Client Name</FormLabel>
            <Input id='client-name' name='client-name' type='text' />
            {fieldErrors?.clientName && <p>{fieldErrors.clientName}</p>}
          </FormField>
          <FormField>
            <FormLabel htmlFor='client-email'>Client Email</FormLabel>
            <Input id='client-email' name='client-email' type='email' />
            {fieldErrors?.clientEmail && <p>{fieldErrors.clientEmail}</p>}
          </FormField>

          <FormField>
            <FormLabel htmlFor='client-address-street'>
              Street Address
            </FormLabel>
            <Input
              id='client-address-street'
              name='client-address-street'
              type='text'
            />
            {fieldErrors?.clientAddressStreet && (
              <p>{fieldErrors.clientAddressStreet}</p>
            )}
          </FormField>
          <div className='fieldset-row'>
            <FormField>
              <FormLabel htmlFor='client-address-city'>City</FormLabel>
              <Input
                id='client-address-city'
                name='client-address-city'
                type='text'
              />
              {fieldErrors?.clientAddressCity && (
                <p>{fieldErrors.clientAddressCity}</p>
              )}
            </FormField>
            <FormField>
              <FormLabel htmlFor='client-address-post-code'>
                Post Code
              </FormLabel>
              <Input
                id='client-address-post-code'
                name='client-address-post-code'
                type='text'
              />
              {fieldErrors?.clientAddressPostCode && (
                <p>{fieldErrors.clientAddressPostCode}</p>
              )}
            </FormField>
            <FormField>
              <FormLabel htmlFor='client-address-country'>Country</FormLabel>
              <Input
                id='client-address-country'
                name='client-address-country'
                type='text'
              />
              {fieldErrors?.clientAddressCountry && (
                <p>{fieldErrors.clientAddressCountry}</p>
              )}
            </FormField>
          </div>
          <div className='fieldset-row'>
            <FormField>
              <FormLabel htmlFor='created-at'>Invoice Date</FormLabel>
              <Input id='created-at' name='created-at' type='date' />
              {fieldErrors?.createdAt && <p>{fieldErrors.createdAt}</p>}
            </FormField>
            <FormField>
              <FormLabel>Payment Terms</FormLabel>
              <Select
                id='payment-terms'
                name='payment-terms'
                placeholder='Select Payment Terms'
                options={PAYMENT_TERMS_OPTIONS}
              />
              {fieldErrors?.paymentTerms && <p>{fieldErrors.paymentTerms}</p>}
            </FormField>
          </div>
          <FormField>
            <FormLabel htmlFor='description'>Project Description</FormLabel>
            <Input id='description' name='description' type='text' />
            {fieldErrors?.description && <p>{fieldErrors.description}</p>}
          </FormField>
        </FormFieldset>
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
        {fieldErrors?.itemNames && <p>{fieldErrors.itemNames}</p>}
        {fieldErrors?.itemQuantities && <p>{fieldErrors.itemQuantities}</p>}
        {fieldErrors?.itemPrices && <p>{fieldErrors.itemPrices}</p>}
        {fieldErrors?.itemTotals && <p>{fieldErrors.itemTotals}</p>}
        <Button
          onClick={handleAddNewItemClick}
          type='button'
          variant='secondary-gray'
        >
          <PlusIcon />
          Add New Item
        </Button>
      </section>
      {formErrors &&
        formErrors.length > 0 &&
        formErrors?.map((formError, index) => <p key={index}>{formError}</p>)}
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
      <Input aria-labelledby='item-name-label' name='item-name' type='text' />
      <Input
        aria-labelledby='quantity-label'
        name='item-quantity'
        type='number'
        min={0}
        value={quantity}
        onChange={handleQuantityChange}
      />
      <Input
        aria-labelledby='price-label'
        name='item-price'
        type='number'
        min={0}
        step={0.01}
        value={price}
        onChange={handlePriceChange}
      />
      <Input
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
