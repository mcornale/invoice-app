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
import {
  Outlet,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from '@remix-run/react';
import { useMediaQuery } from '~/hooks/use-media-query';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import {
  Button,
  ButtonLink,
  links as buttonLinks,
} from '~/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { parseDate } from '~/utils/parsers';
import {
  getInvoiceSummaryStatus,
  parseInvoiceStatusParams,
} from '~/helpers/invoice';
import { Form } from '~/components/ui/form';

export const links: LinksFunction = () => {
  return [
    ...invoicesFilterLinks(),
    ...invoiceListLinks(),
    ...buttonLinks(),
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
  const navigation = useNavigation();
  const [params] = useSearchParams();
  const matches = useMediaQuery('(max-width: 40em)');

  const isSubmitting =
    navigation.state === 'submitting' || navigation.state === 'loading';
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
          <InvoicesFilter
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
              <strong>{newInvoiceButtonText}</strong> button, or get demo
              invoices by clicking the button below to get started.
            </p>
          </div>
          <Form method='get' action='generate'>
            <Button variant='primary' showSpinner={isSubmitting}>
              Get Demo Invoices
            </Button>
          </Form>
        </section>
      )}
      <Outlet />
    </>
  );
}
