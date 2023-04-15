import { Link } from '@remix-run/react';
import { CaretRightIcon } from '@radix-ui/react-icons';
import { formatPrice } from '~/utils/helpers/format-price';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Badge, links as badgeLinks } from '~/components/ui/badge';
import { NewInvoice, links as newInvoiceLinks } from '~/components/new-invoice';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';
import {
  InvoicesFilter,
  links as invoicesFilterLinks,
} from '~/components/invoices-filter';

export const links: LinksFunction = () => {
  return [
    ...badgeLinks(),
    ...newInvoiceLinks(),
    ...invoicesFilterLinks(),
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
          <InvoicesFilter />
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
