import { Link } from '@remix-run/react';
import { RxCaretRight } from 'react-icons/rx';
import { formatPrice } from '~/utils/helpers/format-price';

export default function InvoicesIndexRoute() {
  return (
    <section className='invoices'>
      <header className='invoices__header'>
        <div>
          <h1 className='text--3xl text--semibold'>Invoices</h1>
          <span className='text--xs text--lc'>There are 7 total invoices</span>
        </div>
        <div className='invoices__actions'>
          <form>
            <span className='text--sm'>Filter by status</span>
          </form>
          <Link to='new' className='button button--primary button--md'>
            <span aria-hidden>+</span> New Invoice
          </Link>
        </div>
      </header>
      <ul className='invoices__list'>
        <li>
          <dl className='invoices__item'>
            <dt className='sr-only'>Id</dt>
            <dd className='text--xs text--semibold'>
              <span className='text--lc' aria-hidden>
                #
              </span>
              RT3080
            </dd>
            <dt className='sr-only'>Due Date</dt>
            <dd className='text--xs text--lc'>Due 19 Aug 2021</dd>
            <dt className='sr-only'>Client Name</dt>
            <dd className='text--xs text--lc'>Jensen Huang</dd>
            <dt className='sr-only'>Amount Due</dt>
            <dd className='text--md text--semibold'>{formatPrice(1800.9)}</dd>
            <dt className='sr-only'>Status</dt>
            <dd className='badge badge--sm badge--success'>Paid</dd>
            <RxCaretRight />
          </dl>
        </li>
        <li>
          <dl className='invoices__item'>
            <dt className='sr-only'>Id</dt>
            <dd className='text--xs text--semibold'>
              <span className='text--lc' aria-hidden>
                #
              </span>
              XM9141
            </dd>
            <dt className='sr-only'>Due Date</dt>
            <dd className='text--xs text--lc'>Due 20 Sep 2021</dd>
            <dt className='sr-only'>Client Name</dt>
            <dd className='text--xs text--lc'>Alex Grim</dd>
            <dt className='sr-only'>Amount Due</dt>
            <dd className='text--md text--semibold'>{formatPrice(556)}</dd>
            <dt className='sr-only'>Status</dt>
            <dd className='badge badge--sm badge--warning'>Pending</dd>
            <RxCaretRight />
          </dl>
        </li>
      </ul>
    </section>
  );
}
