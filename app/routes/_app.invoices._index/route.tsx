import { Link } from '@remix-run/react';
import { CaretRightIcon, CaretDownIcon } from '@radix-ui/react-icons';
import { formatPrice } from '~/utils/helpers/format-price';
import * as Popover from '@radix-ui/react-popover';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Button, links as buttonLinks } from '~/components/ui/button';
import { CheckboxField, Form, links as formLinks } from '~/components/ui/form';
import { Badge, links as badgeLinks } from '~/components/ui/badge';
import { NewInvoice, links as newInvoiceLinks } from '~/components/new-invoice';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';

export const links: LinksFunction = () => {
  return [
    ...buttonLinks(),
    ...badgeLinks(),
    ...formLinks(),
    ...newInvoiceLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

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
            <Popover.Trigger className='invoices-filter-trigger' asChild>
              <Button variant='secondary-gray'>
                Filter by status <CaretDownIcon />
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Form>
                <Popover.Content
                  className='invoices-filter-content'
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
          <NewInvoice />
        </div>
      </header>
      <section className='invoices-section'>
        <VisuallyHidden.Root>
          <h2>Invoice list</h2>
        </VisuallyHidden.Root>
        <ul className='invoices-list'>
          <li>
            <Link to='RT3080' className='invoice-link'>
              <dl>
                <div className='invoice-id'>
                  <VisuallyHidden.Root>
                    <dt>Id</dt>
                  </VisuallyHidden.Root>
                  <dd>RT3080</dd>
                </div>
                <div className='invoice-due-date'>
                  <VisuallyHidden.Root>
                    <dt>Due Date</dt>
                  </VisuallyHidden.Root>
                  <dd>Due 19 Aug 2021</dd>
                </div>
                <div className='invoice-client-name'>
                  <VisuallyHidden.Root>
                    <dt>Client Name</dt>
                  </VisuallyHidden.Root>
                  <dd>Jensen Huang</dd>
                </div>
                <div className='invoice-amount-due'>
                  <VisuallyHidden.Root>
                    <dt>Amount Due</dt>
                  </VisuallyHidden.Root>
                  <dd>{formatPrice(1800.9)}</dd>
                </div>
                <div className='invoice-status'>
                  <VisuallyHidden.Root>
                    <dt>Status</dt>
                  </VisuallyHidden.Root>
                  <dd>
                    <Badge variant='success'>Paid</Badge>
                  </dd>
                </div>
                <CaretRightIcon />
              </dl>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
