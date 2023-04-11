import type { LinksFunction } from '@remix-run/node';
import { Link, Outlet } from '@remix-run/react';
import { CaretRightIcon, CaretDownIcon, PlusIcon } from '@radix-ui/react-icons';
import { formatPrice } from '~/utils/helpers/format-price';
import * as Popover from '@radix-ui/react-popover';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import invoiceStylesUrl from '~/styles/invoices.css';
import { Button } from '~/components/button';
import { CheckboxField } from '~/components/form';
import { Badge } from '~/components/badge';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: invoiceStylesUrl,
    },
  ];
};

export default function InvoicesRoute() {
  return (
    <>
      <section className='invoices'>
        <header className='invoices-header'>
          <div>
            <h1>Invoices</h1>
            <span className='invoices-summary'>There are 7 total invoices</span>
          </div>
          <div className='invoices-header-actions'>
            <Popover.Root>
              <Popover.Trigger className='popover-trigger' asChild>
                <Button variant='secondary-gray'>
                  Filter by status <CaretDownIcon />
                </Button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  className='popover-content'
                  sideOffset={8}
                  align='start'
                >
                  <form className='invoices-header-form'>
                    <CheckboxField label='Draft' name='draft' />
                    <CheckboxField label='Pending' name='pending' />
                    <CheckboxField label='Paid' name='paid' />
                  </form>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
            <Link to='new' className='button button-primary'>
              <PlusIcon /> New Invoice
            </Link>
          </div>
        </header>
        <ul className='invoices-list'>
          <li className='invoices-list-item'>
            <Link to='RT3080'>
              <dl>
                <VisuallyHidden.Root>
                  <dt>Id</dt>
                </VisuallyHidden.Root>
                <dd className='invoices-list-item-id'>RT3080</dd>
                <VisuallyHidden.Root>
                  <dt>Due Date</dt>
                </VisuallyHidden.Root>
                <dd className='invoices-list-item-due-date'>Due 19 Aug 2021</dd>
                <VisuallyHidden.Root>
                  <dt>Client Name</dt>
                </VisuallyHidden.Root>
                <dd className='invoices-list-item-client-name'>Jensen Huang</dd>
                <VisuallyHidden.Root>
                  <dt>Amount Due</dt>
                </VisuallyHidden.Root>
                <dd className='invoices-list-item-amount-due'>
                  {formatPrice(1800.9)}
                </dd>
                <VisuallyHidden.Root>
                  <dt>Status</dt>
                </VisuallyHidden.Root>
                <dd className='invoices-list-item-status'>
                  <Badge variant='success'>Paid</Badge>
                </dd>
                <CaretRightIcon />
              </dl>
            </Link>
          </li>
        </ul>
      </section>
      <Outlet />
    </>
  );
}
