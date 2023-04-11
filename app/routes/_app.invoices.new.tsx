import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { useNavigate } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { SlideOver, SlideOverClose } from '~/components/slide-over';
import { Button } from '~/components/button';
import { Form, InputField, SelectField } from '~/components/form';

export default function NewInvoiceRoute() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(true);
  }, []);

  function handleOpenChange(open: boolean) {
    if (!open) navigate('/invoices');
  }

  return (
    <div className='slide-over-container' ref={containerRef}>
      <SlideOver
        open={open}
        onOpenChange={handleOpenChange}
        container={containerRef.current}
        title='New invoice'
        description='Create a new invoice here. Save the invoice as a draft or send
                it to the client when you are finished.'
      >
        <Form id='new-invoice-form' className='invoice-form'>
          <section className='invoice-form-billing-section'>
            <VisuallyHidden.Root>
              <h3>Billing Information</h3>
            </VisuallyHidden.Root>
            <fieldset className='fieldset'>
              <legend className='legend'>Bill From</legend>
              <InputField
                label='Street Address'
                name='street-address'
                type='text'
              />
              <div className='invoice-form-fieldset-row'>
                <InputField label='City' name='city' type='text' />
                <InputField label='Post Code' name='post-code' type='text' />
                <InputField label='Country' name='country' type='text' />
              </div>
            </fieldset>
            <fieldset>
              <legend>Bill To</legend>
              <InputField label='Client Name' name='client-name' type='text' />
              <InputField
                label='Client Email'
                name='client-email'
                type='text'
              />
              <InputField
                label='Street Address'
                name='client-street-address'
                type='text'
              />
              <div className='invoice-form-fieldset-row'>
                <InputField label='City' name='client-city' type='text' />
                <InputField
                  label='Post Code'
                  name='client-post-code'
                  type='text'
                />
                <InputField label='Country' name='client-country' type='text' />
              </div>
              <div className='invoice-form-fieldset-row'>
                <InputField
                  label='Invoice Date'
                  name='invoice-date'
                  type='date'
                />
                <SelectField
                  label='Payment terms'
                  name='payment-terms'
                  values={[
                    'net 1 day',
                    'net 7 days',
                    'net 14 days',
                    'net 30 days',
                  ]}
                />
              </div>
              <InputField
                label='Project description'
                name='project-description'
                type='text'
              />
            </fieldset>
          </section>
          <section className='invoice-form-items'>
            <h3>Item List</h3>
            <ul>
              <li aria-hidden>
                <span id='item-name-label' className='label'>
                  Item Name
                </span>
                <span className='label'>Qty.</span>
                <span className='label'>Price</span>
                <span className='label'>Total</span>
                <span></span>
              </li>
              <li>
                <InputField
                  aria-labelledby='item-name-label'
                  name='item-name'
                  type='text'
                />
                <InputField
                  aria-labelledby='quantity-label'
                  name='quantity'
                  type='number'
                  min={0}
                />
                <InputField
                  aria-labelledby='price-label'
                  name='price'
                  type='number'
                  min={0}
                  step={0.01}
                />
                <InputField
                  aria-labelledby='total-label'
                  name='total'
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
        <div className='slide-over-bottom-bar'>
          <div className='invoice-form-buttons'>
            <SlideOverClose asChild>
              <Button
                variant='secondary-gray'
                className='invoice-form-button-left'
              >
                Discard
              </Button>
            </SlideOverClose>
            <Button
              type='submit'
              variant='secondary-color'
              form='new-invoice-form'
            >
              Save as Draft
            </Button>
            <Button type='submit' variant='primary' form='new-invoice-form'>
              Save & Send
            </Button>
          </div>
        </div>
      </SlideOver>
    </div>
  );
}
