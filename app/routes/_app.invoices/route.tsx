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
import { Outlet, useLoaderData } from '@remix-run/react';
import { useMediaQuery } from '~/hooks/use-media-query';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { ButtonLink } from '~/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';

export const links: LinksFunction = () => {
  return [
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
      displayId: true,
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

export default function InvoicesRoute() {
  const data = useLoaderData<typeof loader>();
  const matches = useMediaQuery('(max-width: 40em)');

  const invoices = data.invoices.map((invoice) => ({
    ...invoice,
    paymentDue: invoice.paymentDue ? new Date(invoice.paymentDue) : null,
  }));

  return (
    <>
      <header className='invoice-list-header'>
        <div>
          <h1>Invoices</h1>
          <span className='invoice-list-summary'>
            {matches ? (
              <>
                <VisuallyHidden.Root>There are</VisuallyHidden.Root>
                {invoices.length}
                <VisuallyHidden.Root>total</VisuallyHidden.Root> invoices
              </>
            ) : (
              `There are ${invoices.length} total invoices`
            )}
          </span>
        </div>
        <div className='invoice-list-actions'>
          <InvoicesFilter />
          <ButtonLink variant='primary' to='new'>
            <PlusIcon />
            {matches ? (
              <>
                New <VisuallyHidden.Root>Invoice</VisuallyHidden.Root>
              </>
            ) : (
              'New Invoice'
            )}
          </ButtonLink>
        </div>
      </header>
      <InvoiceList invoices={invoices} />
      <Outlet />
    </>
  );
}
