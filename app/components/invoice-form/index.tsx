import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import type { FormProps } from '../ui/form';
import {
  Form,
  FormField,
  FormFieldset,
  FormLabel,
  FormLegend,
  FormError,
  links as formLinks,
} from '../ui/form';
import { Button, links as buttonLinks } from '../ui/button';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';
import { Input, links as inputLinks } from '../ui/input';
import { Select, links as selectLinks } from '../ui/select';
import { upperFirst } from '~/utils/formatters';
import type { Invoice, InvoiceItem } from '@prisma/client';
import { InvoiceStatus } from '@prisma/client';

export const PAYMENT_TERMS_OPTIONS = [
  { text: 'net 1 day', value: '1' },
  { text: 'net 7 days', value: '7' },
  { text: 'net 14 days', value: '14' },
  { text: 'net 30 days', value: '30' },
];

export interface InvoiceFormFields {
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
export interface InvoiceFormFieldErrors {
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
  initData?: Invoice;
  fieldErrors?: InvoiceFormFieldErrors;
  formErrors?: string[];
}

export interface InvoiceFormItemProps {
  initData?: InvoiceItem;
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
  initData,
  fieldErrors,
  formErrors,
  ...props
}: InvoiceFormProps) {
  const [items, setItems] = useState(
    new Array(initData?.items.length ?? 0).fill(null).map((_, index) => index)
  );

  const itemListErrors = [
    fieldErrors?.itemNames,
    fieldErrors?.itemQuantities,
    fieldErrors?.itemPrices,
    fieldErrors?.itemTotals,
  ]
    .flat()
    .filter(Boolean);

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
              defaultValue={initData?.senderAddress.street}
            />
            {fieldErrors?.senderAddressStreet && (
              <FormError>{fieldErrors.senderAddressStreet}</FormError>
            )}
          </FormField>
          <div className='fieldset-row'>
            <FormField>
              <FormLabel htmlFor='sender-address-city'>City</FormLabel>
              <Input
                id='sender-address-city'
                name='sender-address-city'
                type='text'
                defaultValue={initData?.senderAddress.city}
              />
              {fieldErrors?.senderAddressCity && (
                <FormError>{fieldErrors.senderAddressCity}</FormError>
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
                defaultValue={initData?.senderAddress.postCode}
              />
              {fieldErrors?.senderAddressPostCode && (
                <FormError>{fieldErrors.senderAddressPostCode}</FormError>
              )}
            </FormField>
            <FormField>
              <FormLabel htmlFor='sender-address-country'>Country</FormLabel>
              <Input
                id='sender-address-country'
                name='sender-address-country'
                type='text'
                defaultValue={initData?.senderAddress.country}
              />
              {fieldErrors?.senderAddressCountry && (
                <FormError>{fieldErrors.senderAddressCountry}</FormError>
              )}
            </FormField>
          </div>
        </FormFieldset>
        <FormFieldset>
          <FormLegend>Bill To</FormLegend>
          <FormField>
            <FormLabel htmlFor='client-name'>Client Name</FormLabel>
            <Input
              id='client-name'
              name='client-name'
              type='text'
              defaultValue={initData?.clientName}
            />
            {fieldErrors?.clientName && (
              <FormError>{fieldErrors.clientName}</FormError>
            )}
          </FormField>
          <FormField>
            <FormLabel htmlFor='client-email'>Client Email</FormLabel>
            <Input
              id='client-email'
              name='client-email'
              type='email'
              defaultValue={initData?.clientEmail}
            />
            {fieldErrors?.clientEmail && (
              <FormError>{fieldErrors.clientEmail}</FormError>
            )}
          </FormField>
          <FormField>
            <FormLabel htmlFor='client-address-street'>
              Street Address
            </FormLabel>
            <Input
              id='client-address-street'
              name='client-address-street'
              type='text'
              defaultValue={initData?.clientAddress.street}
            />
            {fieldErrors?.clientAddressStreet && (
              <FormError>{fieldErrors.clientAddressStreet}</FormError>
            )}
          </FormField>
          <div className='fieldset-row'>
            <FormField>
              <FormLabel htmlFor='client-address-city'>City</FormLabel>
              <Input
                id='client-address-city'
                name='client-address-city'
                type='text'
                defaultValue={initData?.clientAddress.city}
              />
              {fieldErrors?.clientAddressCity && (
                <FormError>{fieldErrors.clientAddressCity}</FormError>
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
                defaultValue={initData?.clientAddress.postCode}
              />
              {fieldErrors?.clientAddressPostCode && (
                <FormError>{fieldErrors.clientAddressPostCode}</FormError>
              )}
            </FormField>
            <FormField>
              <FormLabel htmlFor='client-address-country'>Country</FormLabel>
              <Input
                id='client-address-country'
                name='client-address-country'
                type='text'
                defaultValue={initData?.clientAddress.country}
              />
              {fieldErrors?.clientAddressCountry && (
                <FormError>{fieldErrors.clientAddressCountry}</FormError>
              )}
            </FormField>
          </div>
          <div className='fieldset-row'>
            <FormField>
              <FormLabel htmlFor='created-at'>Invoice Date</FormLabel>
              <Input
                id='created-at'
                name='created-at'
                type='date'
                defaultValue={initData?.createdAt?.toISOString().slice(0, 10)}
                disabled={initData && initData.status !== InvoiceStatus.DRAFT}
              />
              {fieldErrors?.createdAt && (
                <FormError>{fieldErrors.createdAt}</FormError>
              )}
            </FormField>
            <FormField>
              <FormLabel>Payment Terms</FormLabel>
              <Select
                id='payment-terms'
                name='payment-terms'
                placeholder='Select Payment Terms'
                options={PAYMENT_TERMS_OPTIONS}
                defaultValue={initData?.paymentTerms.toString()}
              />
              {fieldErrors?.paymentTerms && (
                <FormError>{fieldErrors.paymentTerms}</FormError>
              )}
            </FormField>
          </div>
          <FormField>
            <FormLabel htmlFor='description'>Project Description</FormLabel>
            <Input
              id='description'
              name='description'
              type='text'
              defaultValue={initData?.description}
            />
            {fieldErrors?.description && (
              <FormError>{fieldErrors.description}</FormError>
            )}
          </FormField>
        </FormFieldset>
      </section>
      <section className='item-list-section'>
        <h3>Item List</h3>
        <ul className='item-list'>
          <li className='item' aria-hidden>
            <span id='item-name-label' className='form-label'>
              Item Name
            </span>
            <span id='quantity-label' className='form-label'>
              Qty.
            </span>
            <span id='price-label' className='form-label'>
              Price
            </span>
            <span id='total-label' className='form-label'>
              Total
            </span>
            <span></span>
          </li>
          {items.map((id) => (
            <InvoiceFormItem
              key={id}
              onDelete={handleDeleteItemClick.bind(null, id)}
              initData={initData?.items[id]}
            />
          ))}
        </ul>
        {itemListErrors.length > 0 && (
          <FormField>
            {itemListErrors?.map((itemListError, index) => (
              <FormError key={index}>{itemListError}</FormError>
            ))}
          </FormField>
        )}
        <Button
          onClick={handleAddNewItemClick}
          type='button'
          variant='secondary-gray'
        >
          <PlusIcon />
          Add New Item
        </Button>
      </section>
      <Input type='hidden' name='status' defaultValue={initData?.status} />
      {formErrors && (
        <FormField>
          {formErrors?.map((formError, index) => (
            <FormError key={index}>{upperFirst(formError)}</FormError>
          ))}
        </FormField>
      )}
    </Form>
  );
}

export function InvoiceFormItem({ initData, onDelete }: InvoiceFormItemProps) {
  const [quantity, setQuantity] = useState(initData?.quantity.toString() ?? '');
  const [price, setPrice] = useState(initData?.price.toString() ?? '');

  function handleQuantityChange(e: ChangeEvent<HTMLInputElement>) {
    setQuantity(e.target.value);
  }

  function handlePriceChange(e: ChangeEvent<HTMLInputElement>) {
    setPrice(e.target.value);
  }

  return (
    <li className='item'>
      <Input
        aria-labelledby='item-name-label'
        name='item-name'
        type='text'
        defaultValue={initData?.name}
      />
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
        readOnly
        value={Number(quantity) * Number(price)}
      />
      <Button onClick={onDelete} type='button' variant='tertiary-gray' iconOnly>
        <TrashIcon />
        <VisuallyHidden.Root>Delete Item</VisuallyHidden.Root>
      </Button>
    </li>
  );
}
