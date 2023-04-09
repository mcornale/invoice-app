import type { LinksFunction } from '@remix-run/node';
import { Link, Outlet } from '@remix-run/react';
import {
  CaretRightIcon,
  CaretDownIcon,
  PlusIcon,
  CheckIcon,
  CaretUpIcon,
} from '@radix-ui/react-icons';
import { formatPrice } from '~/utils/helpers/format-price';
import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';
import invoiceStylesUrl from '~/styles/invoices.css';
import { useState } from 'react';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: invoiceStylesUrl,
    },
  ];
};

export default function InvoicesRoute() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <>
      <section className='invoices'>
        <header className='invoices-header'>
          <div>
            <h1 className='text-3xl text-semibold'>Invoices</h1>
            <span className='text-xs text-lc'>There are 7 total invoices</span>
          </div>
          <div className='invoices-header-actions'>
            <Popover.Root open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <Popover.Trigger asChild>
                <button className='button button-md button-secondary-gray'>
                  Filter by status{' '}
                  {isPopoverOpen ? <CaretUpIcon /> : <CaretDownIcon />}
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  className='popover'
                  sideOffset={8}
                  align='start'
                >
                  <form className='invoices-header-form'>
                    <div className='form-field'>
                      <Checkbox.Root
                        className='checkbox'
                        defaultChecked
                        id='cb-draft'
                      >
                        <Checkbox.Indicator>
                          <CheckIcon />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <label className='label' htmlFor='cb-draft'>
                        Draft
                      </label>
                    </div>
                    <div className='form-field'>
                      <Checkbox.Root
                        className='checkbox'
                        defaultChecked
                        id='cb-pending'
                      >
                        <Checkbox.Indicator>
                          <CheckIcon />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <label className='label' htmlFor='cb-pending'>
                        Pending
                      </label>
                    </div>
                    <div className='form-field'>
                      <Checkbox.Root
                        className='checkbox'
                        defaultChecked
                        id='cb-paid'
                      >
                        <Checkbox.Indicator>
                          <CheckIcon />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <label className='label' htmlFor='cb-paid'>
                        Paid
                      </label>
                    </div>
                  </form>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
            <Link to='new' className='button button-primary button-md'>
              <PlusIcon /> New Invoice
            </Link>
          </div>
        </header>
        <ul className='invoices-list'>
          <li>
            <Link to='RT3080' className='invoices-list-item-link'>
              <dl className='invoices-list-item-dl'>
                <dt className='sr-only'>Id</dt>
                <dd className='text-sm text-semibold'>
                  <span className='text-lc' aria-hidden>
                    #
                  </span>
                  RT3080
                </dd>
                <dt className='sr-only'>Due Date</dt>
                <dd className='text-sm text-lc'>Due 19 Aug 2021</dd>
                <dt className='sr-only'>Client Name</dt>
                <dd className='text-sm text-lc'>Jensen Huang</dd>
                <dt className='sr-only'>Amount Due</dt>
                <dd className='text-lg text-semibold'>{formatPrice(1800.9)}</dd>
                <dt className='sr-only'>Status</dt>
                <dd className='badge badge-sm badge-success'>Paid</dd>
                <CaretRightIcon />
              </dl>
            </Link>
          </li>
          <li>
            <Link to='XM9141' className='invoices-list-item-link'>
              <dl className='invoices-list-item-dl'>
                <dt className='sr-only'>Id</dt>
                <dd className='text-sm text-semibold'>
                  <span className='text-lc' aria-hidden>
                    #
                  </span>
                  XM9141
                </dd>
                <dt className='sr-only'>Due Date</dt>
                <dd className='text-sm text-lc'>Due 20 Sep 2021</dd>
                <dt className='sr-only'>Client Name</dt>
                <dd className='text-sm text-lc'>Alex Grim</dd>
                <dt className='sr-only'>Amount Due</dt>
                <dd className='text-lg text-semibold'>{formatPrice(556)}</dd>
                <dt className='sr-only'>Status</dt>
                <dd className='badge badge-sm badge-warning'>Pending</dd>
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
