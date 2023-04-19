import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import styles from './styles.css';
import {
  InvoiceListFilter,
  links as invoiceListFilterLinks,
} from '~/components/invoice-list-filter';
import {
  InvoiceList,
  links as invoiceListLinks,
} from '~/components/invoice-list';
import { Outlet, useLoaderData, useSearchParams } from '@remix-run/react';
import { useMediaQuery } from '~/hooks/use-media-query';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { ButtonLink, links as buttonLinks } from '~/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { parseDate } from '~/utils/parsers';
import {
  getInvoiceSummaryStatus,
  parseInvoiceStatusParams,
} from '~/helpers/invoice';
import { getInvoiceList } from '~/models/invoice.server';
import { getUserIdFromSession } from '~/utils/session.server';

export const links: LinksFunction = () => {
  return [
    ...invoiceListFilterLinks(),
    ...invoiceListLinks(),
    ...buttonLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserIdFromSession(request);
  const url = new URL(request.url);
  const statusParams = url.searchParams.getAll('status');
  const status = parseInvoiceStatusParams(statusParams);
  const invoices = await getInvoiceList(status, userId);

  return json({ invoices });
};

export default function InvoicesRoute() {
  const data = useLoaderData<typeof loader>();
  const [params] = useSearchParams();
  const matches = useMediaQuery('(max-width: 40em)');

  const statusParams = params.getAll('status');
  const status = parseInvoiceStatusParams(statusParams);
  const invoices = data.invoices.map((invoice) => ({
    ...invoice,
    paymentDue: invoice.paymentDue ? parseDate(invoice.paymentDue) : null,
  }));
  const invoiceSummaryVerb = invoices.length === 1 ? 'is' : 'are';
  const invoiceSummaryObject = invoices.length === 1 ? 'invoice' : 'invoices';
  const invoiceSummaryStatus = getInvoiceSummaryStatus(status);
  const invoiceSummaryText = matches ? (
    <>
      <VisuallyHidden.Root>There {invoiceSummaryVerb}</VisuallyHidden.Root>
      {invoices.length}
      <VisuallyHidden.Root>{invoiceSummaryStatus}</VisuallyHidden.Root> invoices
    </>
  ) : (
    `There ${invoiceSummaryVerb} ${invoices.length} ${invoiceSummaryStatus} ${invoiceSummaryObject}`
  );
  const newInvoiceButtonText = matches ? (
    <>
      New <VisuallyHidden.Root>Invoice</VisuallyHidden.Root>
    </>
  ) : (
    'New Invoice'
  );

  return (
    <>
      <header className='invoice-list-header'>
        <div>
          <h1>Invoices</h1>
          <span className='invoice-list-summary'>{invoiceSummaryText}</span>
        </div>
        <div className='invoice-list-actions'>
          <InvoiceListFilter
            activeStatus={parseInvoiceStatusParams(statusParams)}
          />
          <ButtonLink variant='primary' to='new'>
            <PlusIcon />
            {newInvoiceButtonText}
          </ButtonLink>
        </div>
      </header>
      {invoices.length > 0 ? (
        <InvoiceList invoices={invoices} />
      ) : (
        <section className='no-invoices'>
          <div className='no-invoices-text-container'>
            <h2 className='no-invoices-title'>There is nothing here</h2>
            <p>
              Create an invoice by clicking the{' '}
              <strong>{newInvoiceButtonText}</strong> button and get started
            </p>
          </div>
        </section>
      )}
      <Outlet />
    </>
  );
}
