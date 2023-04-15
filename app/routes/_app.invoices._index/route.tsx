import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { NewInvoice, links as newInvoiceLinks } from '~/components/new-invoice';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';
import {
  InvoicesFilter,
  links as invoicesFilterLinks,
} from '~/components/invoices-filter';
import {
  InvoicesList,
  links as invoicesListLinks,
} from '~/components/invoices-list';

export const links: LinksFunction = () => {
  return [
    ...newInvoiceLinks(),
    ...invoicesFilterLinks(),
    ...invoicesListLinks(),
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
        <InvoicesList />
      </section>
    </>
  );
}
