import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import {
  CalendarIcon,
  CaretDownIcon,
  CheckIcon,
  PlusIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { useNavigate } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';

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
      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
        <Dialog.DialogTrigger />
        <Dialog.Portal container={containerRef.current}>
          <Dialog.Overlay className='slide-over-overlay' />
          <Dialog.Content className='slide-over-content'>
            <div className='slide-over-top-bar'>
              <Dialog.Title className='text-2xl text-semibold'>
                New invoice
              </Dialog.Title>
            </div>
            <VisuallyHidden.Root asChild>
              <Dialog.Description>
                Create a new invoice here. Save the invoice as a draft or send
                it to the client when you are finished.
              </Dialog.Description>
            </VisuallyHidden.Root>
            <form id='new-invoice-form' className='form invoice-form'>
              <section className='invoice-form-billing-section'>
                <VisuallyHidden.Root>
                  <h3>Billing Information</h3>
                </VisuallyHidden.Root>
                <fieldset className='fieldset'>
                  <legend className='legend'>Bill From</legend>
                  <div className='field'>
                    <label className='label' htmlFor='street-address-input'>
                      Street Address
                    </label>
                    <input
                      className='input'
                      id='street-address-input'
                      name='street-address'
                      type='text'
                    />
                  </div>
                  <div className='invoice-form-fieldset-row'>
                    <div className='field'>
                      <label className='label' htmlFor='city-input'>
                        City
                      </label>
                      <input
                        className='input'
                        id='city-input'
                        name='city'
                        type='text'
                      />
                    </div>
                    <div className='field'>
                      <label className='label' htmlFor='post-code-input'>
                        Post Code
                      </label>
                      <input
                        className='input'
                        id='post-code-input'
                        name='post-code'
                        type='text'
                      />
                    </div>
                    <div className='field'>
                      <label className='label' htmlFor='country-input'>
                        Country
                      </label>
                      <input
                        className='input'
                        id='country-input'
                        name='country'
                        type='text'
                      />
                    </div>
                  </div>
                </fieldset>
                <fieldset className='fieldset'>
                  <legend className='legend'>Bill To</legend>
                  <div className='field'>
                    <label className='label' htmlFor='client-name-input'>
                      Client's Name
                    </label>
                    <input
                      className='input'
                      id='client-name-input'
                      name='client-name'
                      type='text'
                    />
                  </div>
                  <div className='field'>
                    <label className='label' htmlFor='client-email-input'>
                      Client's Email
                    </label>
                    <input
                      className='input'
                      id='client-email-input'
                      name='client-email'
                      type='email'
                    />
                  </div>
                  <div className='field'>
                    <label
                      className='label'
                      htmlFor='client-street-address-input'
                    >
                      Street Address
                    </label>
                    <input
                      className='input'
                      id='client-street-address-input'
                      name='client-street-address'
                      type='text'
                    />
                  </div>
                  <div className='invoice-form-fieldset-row'>
                    <div className='field'>
                      <label className='label' htmlFor='client-city-input'>
                        City
                      </label>
                      <input
                        className='input'
                        id='client-city-input'
                        name='client-city'
                        type='text'
                      />
                    </div>
                    <div className='field'>
                      <label className='label' htmlFor='client-post-code-input'>
                        Post Code
                      </label>
                      <input
                        className='input'
                        id='client-post-code-input'
                        name='client-post-code'
                        type='text'
                      />
                    </div>
                    <div className='field'>
                      <label className='label' htmlFor='client-country-input'>
                        Country
                      </label>
                      <input
                        className='input'
                        id='client-country-input'
                        name='client-country'
                        type='text'
                      />
                    </div>
                  </div>
                  <div className='invoice-form-fieldset-row'>
                    <div className='field'>
                      <label className='label' htmlFor='issue-date-input'>
                        Issue Date
                      </label>
                      <div className='input-date-container'>
                        <input
                          className='input'
                          id='issue-date-input'
                          name='issue-date'
                          type='date'
                        />
                        <CalendarIcon />
                      </div>
                    </div>
                    <div className='field'>
                      <label className='label' id='payment-terms-label'>
                        Payment terms
                      </label>
                      <Select.Root>
                        <Select.Trigger
                          className='select-trigger input'
                          aria-labelledby='payment-terms-label'
                        >
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
                              <Select.Item
                                className='select-item'
                                value='net 1 day'
                              >
                                <Select.ItemText>Net 1 day</Select.ItemText>
                                <Select.ItemIndicator className='select-item-indicator'>
                                  <CheckIcon />
                                </Select.ItemIndicator>
                              </Select.Item>
                              <Select.Item
                                className='select-item'
                                value='net 7 days'
                              >
                                <Select.ItemText>Net 7 days</Select.ItemText>
                                <Select.ItemIndicator className='select-item-indicator'>
                                  <CheckIcon />
                                </Select.ItemIndicator>
                              </Select.Item>
                              <Select.Item
                                className='select-item'
                                value='net 14 days'
                              >
                                <Select.ItemText>Net 14 days</Select.ItemText>
                                <Select.ItemIndicator className='select-item-indicator'>
                                  <CheckIcon />
                                </Select.ItemIndicator>
                              </Select.Item>
                              <Select.Item
                                className='select-item'
                                value='net 30 days'
                              >
                                <Select.ItemText>Net 30 days</Select.ItemText>
                                <Select.ItemIndicator className='select-item-indicator'>
                                  <CheckIcon />
                                </Select.ItemIndicator>
                              </Select.Item>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </div>
                  </div>
                  <div className='field'>
                    <label
                      className='label'
                      htmlFor='project-description-input'
                    >
                      Project Description
                    </label>
                    <input
                      className='input'
                      id='project-description-input'
                      name='project-description'
                      type='text'
                    />
                  </div>
                </fieldset>
              </section>
              <section className='invoice-form-items-section'>
                <h3 className='text-lg text-semibold'>Item List</h3>
                <ul className='invoice-form-items'>
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
                    <input
                      aria-labelledby='item-name-label'
                      className='input'
                      id='item-name-input'
                      name='item-name'
                      type='text'
                    />
                    <input
                      className='input'
                      id='quantity-input'
                      name='quantity'
                      type='number'
                      min={0}
                    />
                    <input
                      className='input'
                      id='price-input'
                      name='price'
                      type='number'
                      min={0}
                      step={0.01}
                    />
                    <input
                      className='input'
                      id='total-input'
                      name='total'
                      type='number'
                      min={0}
                      defaultValue={0}
                      readOnly
                    />
                    <button className='button button-tertiary-gray button-sm'>
                      <TrashIcon />
                    </button>
                  </li>
                </ul>
                <button
                  type='button'
                  className='button button-secondary-gray button-md'
                >
                  <PlusIcon />
                  Add New Item
                </button>
              </section>
            </form>
            <div className='slide-over-bottom-bar'>
              <div className='invoice-form-buttons'>
                <Dialog.Close asChild>
                  <button className='button button-secondary-gray button-md invoice-form-button-left'>
                    Discard
                  </button>
                </Dialog.Close>
                <button
                  type='submit'
                  className='button button-secondary-color button-md'
                  form='new-invoice-form'
                >
                  Save as Draft
                </button>
                <button
                  type='submit'
                  className='button button-primary button-md'
                  form='new-invoice-form'
                >
                  Save & Send
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
