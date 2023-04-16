import { NewInvoice, links as newInvoiceLinks } from '~/components/new-invoice';
import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import styles from './styles.css';
import {
  InvoicesFilter,
  links as invoicesFilterLinks,
} from '~/components/invoices-filter';
import {
  InvoiceList,
  links as invoiceListLinks,
} from '~/components/invoice-list';
import { db } from '~/utils/db.server';
import { useLoaderData } from '@remix-run/react';

export const links: LinksFunction = () => {
  return [
    ...newInvoiceLinks(),
    ...invoicesFilterLinks(),
    ...invoiceListLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const loader = async (args: LoaderArgs) => {
  const invoices = await db.invoice.findMany({
    select: {
      id: true,
      invoiceId: true,
      clientName: true,
      paymentDue: true,
      status: true,
      total: true,
    },
  });

  return json({
    invoices,
  });
};

export default function InvoicesIndexRoute() {
  const data = useLoaderData<typeof loader>();

  const invoices = data.invoices.map((invoice) => ({
    ...invoice,
    paymentDue: new Date(invoice.paymentDue),
  }));

  return (
    <>
      <header className='invoice-list-header'>
        <div>
          <h1>Invoices</h1>
          <span className='invoice-list-summary'>
            There are {invoices.length} total invoices
          </span>
        </div>
        <div className='invoice-list-actions'>
          <InvoicesFilter />
          <NewInvoice />
        </div>
      </header>
      <InvoiceList invoices={invoices} />
    </>
  );
}
