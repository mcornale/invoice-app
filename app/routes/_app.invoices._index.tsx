import { Link } from '@remix-run/react';
import { CaretRightIcon, CaretDownIcon } from '@radix-ui/react-icons';
import { formatPrice } from '~/utils/helpers/format-price';
import * as Popover from '@radix-ui/react-popover';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Button } from '~/components/ui/button';
import { CheckboxField, Form } from '~/components/ui/form';
import { Badge } from '~/components/ui/badge';
import { NewInvoiceSlideOver } from '~/components/new-invoice-slide-over';

export default function InvoicesIndexRoute() {
  return (
    <>
      <header className='invoices-header'>
        <div>
          <h1>Invoices</h1>
          <span className='invoices-summary'>There are 7 total invoices</span>
        </div>
        <div className='invoices-actions'>
          <Popover.Root>
            <Popover.Trigger className='popover-trigger' asChild>
              <Button variant='secondary-gray'>
                Filter by status <CaretDownIcon />
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Form>
                <Popover.Content
                  className='popover-content'
                  sideOffset={8}
                  align='start'
                >
                  <CheckboxField label='Draft' name='status' value='draft' />
                  <CheckboxField
                    label='Pending'
                    name='status'
                    value='pending'
                  />
                  <CheckboxField label='Paid' name='status' value='paid' />
                </Popover.Content>
              </Form>
            </Popover.Portal>
          </Popover.Root>
          <NewInvoiceSlideOver />
        </div>
      </header>
      <section className='invoices'>
        <VisuallyHidden.Root>
          <h2>Invoice list</h2>
        </VisuallyHidden.Root>
        <ul>
          <li>
            <Link to='RT3080'>
              <dl>
                <VisuallyHidden.Root>
                  <dt>Id</dt>
                </VisuallyHidden.Root>
                <dd className='invoices-item-id'>RT3080</dd>
                <VisuallyHidden.Root>
                  <dt>Due Date</dt>
                </VisuallyHidden.Root>
                <dd className='invoices-item-due-date'>Due 19 Aug 2021</dd>
                <VisuallyHidden.Root>
                  <dt>Client Name</dt>
                </VisuallyHidden.Root>
                <dd className='invoices-item-client-name'>Jensen Huang</dd>
                <VisuallyHidden.Root>
                  <dt>Amount Due</dt>
                </VisuallyHidden.Root>
                <dd className='invoices-item-amount-due'>
                  {formatPrice(1800.9)}
                </dd>
                <VisuallyHidden.Root>
                  <dt>Status</dt>
                </VisuallyHidden.Root>
                <dd className='invoices-item-status'>
                  <Badge variant='success'>Paid</Badge>
                </dd>
                <CaretRightIcon />
              </dl>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
