import { Link } from '@remix-run/react';
import { RxCaretRight, RxCaretDown, RxPlus, RxCheck } from 'react-icons/rx';
import { formatPrice } from '~/utils/helpers/format-price';
import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';

export default function InvoicesIndexRoute() {
  return (
    <section className='invoices'>
      <header className='invoices__header'>
        <div>
          <h1 className='text--3xl text--semibold'>Invoices</h1>
          <span className='text--xs text--lc'>There are 7 total invoices</span>
        </div>
        <div className='invoices__actions'>
          <Popover.Root>
            <Popover.Trigger className='' asChild>
              <button className='button button--md button--secondary-gray'>
                Filter by status <RxCaretDown />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content className='popover' sideOffset={8} align='start'>
                <form className='form form--gap-sm'>
                  <div className='checkbox-field'>
                    <Checkbox.Root
                      className='checkbox-field__checkbox checkbox-field__checkbox--md'
                      defaultChecked
                      id='cb-draft'
                    >
                      <Checkbox.Indicator>
                        <RxCheck />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <label className='checkbox-field__label' htmlFor='cb-draft'>
                      Draft
                    </label>
                  </div>
                  <div className='checkbox-field'>
                    <Checkbox.Root
                      className='checkbox-field__checkbox checkbox-field__checkbox--md'
                      defaultChecked
                      id='cb-pending'
                    >
                      <Checkbox.Indicator>
                        <RxCheck />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <label
                      className='checkbox-field__label'
                      htmlFor='cb-pending'
                    >
                      Pending
                    </label>
                  </div>
                  <div className='checkbox-field'>
                    <Checkbox.Root
                      className='checkbox-field__checkbox checkbox-field__checkbox--md'
                      defaultChecked
                      id='cb-paid'
                    >
                      <Checkbox.Indicator>
                        <RxCheck />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <label className='checkbox-field__label' htmlFor='cb-paid'>
                      Paid
                    </label>
                  </div>
                </form>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <Link to='new' className='button button--primary button--md'>
            <RxPlus /> New Invoice
          </Link>
        </div>
      </header>
      <ul className='invoices__list'>
        <li>
          <dl className='invoices__item'>
            <dt className='sr-only'>Id</dt>
            <dd className='text--sm text--semibold'>
              <span className='text--lc' aria-hidden>
                #
              </span>
              RT3080
            </dd>
            <dt className='sr-only'>Due Date</dt>
            <dd className='text--sm text--lc'>Due 19 Aug 2021</dd>
            <dt className='sr-only'>Client Name</dt>
            <dd className='text--sm text--lc'>Jensen Huang</dd>
            <dt className='sr-only'>Amount Due</dt>
            <dd className='text--lg text--semibold'>{formatPrice(1800.9)}</dd>
            <dt className='sr-only'>Status</dt>
            <dd className='badge badge--sm badge--success'>Paid</dd>
            <RxCaretRight />
          </dl>
        </li>
        <li>
          <dl className='invoices__item'>
            <dt className='sr-only'>Id</dt>
            <dd className='text--sm text--semibold'>
              <span className='text--lc' aria-hidden>
                #
              </span>
              XM9141
            </dd>
            <dt className='sr-only'>Due Date</dt>
            <dd className='text--sm text--lc'>Due 20 Sep 2021</dd>
            <dt className='sr-only'>Client Name</dt>
            <dd className='text--sm text--lc'>Alex Grim</dd>
            <dt className='sr-only'>Amount Due</dt>
            <dd className='text--lg text--semibold'>{formatPrice(556)}</dd>
            <dt className='sr-only'>Status</dt>
            <dd className='badge badge--sm badge--warning'>Pending</dd>
            <RxCaretRight />
          </dl>
        </li>
      </ul>
    </section>
  );
}
