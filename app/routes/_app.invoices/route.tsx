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
import { Outlet, useLoaderData, useSearchParams } from '@remix-run/react';
import { useMediaQuery } from '~/hooks/use-media-query';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { ButtonLink } from '~/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { parseDate } from '~/utils/parsers';
import {
  getInvoiceSummaryStatus,
  parseInvoiceStatusParams,
} from '~/helpers/invoice';

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

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const statusParams = url.searchParams.getAll('status');
  const status = parseInvoiceStatusParams(statusParams);
  const invoices = await db.invoice.findMany({
    select: {
      id: true,
      displayId: true,
      clientName: true,
      paymentDue: true,
      status: true,
      total: true,
    },
    ...(statusParams.length > 0 && {
      where: {
        OR: status.map((s) => ({ status: s })),
      },
    }),
  });

  return json({
    invoices,
  });
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
  const invoiceSummaryStatus = getInvoiceSummaryStatus(status);

  return (
    <>
      <header className='invoice-list-header'>
        <div>
          <h1>Invoices</h1>
          <span className='invoice-list-summary'>
            {matches ? (
              <>
                <VisuallyHidden.Root>
                  There {invoiceSummaryVerb}
                </VisuallyHidden.Root>
                {invoices.length}
                <VisuallyHidden.Root>
                  {invoiceSummaryStatus}
                </VisuallyHidden.Root>{' '}
                invoices
              </>
            ) : (
              `There ${invoiceSummaryVerb} ${invoices.length} ${invoiceSummaryStatus} invoices`
            )}
          </span>
        </div>
        <div className='invoice-list-actions'>
          <InvoicesFilter
            activeStatus={parseInvoiceStatusParams(statusParams)}
          />
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
