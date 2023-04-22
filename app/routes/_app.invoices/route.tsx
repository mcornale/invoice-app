import type { ActionArgs, LinksFunction, LoaderArgs } from '@remix-run/node';
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
import { parseDate } from '~/utils/parsers';
import {
  getFieldErrors,
  getFormErrors,
  getFormattedInvoice,
  getInvoiceFormData,
  getInvoiceSummaryStatus,
  isArrOfInvoiceStatus,
} from '~/helpers/invoice';
import { createInvoice, getInvoiceList } from '~/models/invoice.server';
import { getUserIdFromSession } from '~/utils/session.server';
import { useResponsiveText } from '~/hooks/use-responsive-text';
import { InvoiceStatus } from '@prisma/client';
import type { InvoiceFormProps } from '~/components/invoice-form';
import { badRequest } from '~/utils/request.server';
import { NewInvoice, links as newInvoiceLinks } from '~/components/new-invoice';

export interface ActionData {
  fieldErrors?: InvoiceFormProps['fieldErrors'];
  formErrors?: InvoiceFormProps['formErrors'];
  success?: boolean;
}

export const links: LinksFunction = () => {
  return [
    ...invoiceListFilterLinks(),
    ...invoiceListLinks(),
    ...newInvoiceLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserIdFromSession(request);
  if (!userId) throw new Error("This shouldn't be possible");

  const url = new URL(request.url);
  const status = url.searchParams.getAll('status');
  if (!isArrOfInvoiceStatus(status))
    throw new Error("This shouldn't be possible");
  const invoices = await getInvoiceList(status, userId);

  return json({ invoices });
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await getUserIdFromSession(request);
  if (!userId) throw new Error("This shouldn't be possible");

  const formData = await request.formData();
  const intent = formData.get('intent');

  const invoiceFormData = getInvoiceFormData(formData);
  if (!invoiceFormData)
    return badRequest<ActionData>({
      fieldErrors: undefined,
      formErrors: ['form not submitted correctly'],
    });

  switch (intent) {
    case 'save-as-draft':
      await createInvoice({
        userId,
        status: InvoiceStatus.DRAFT,
        ...getFormattedInvoice(invoiceFormData),
      });
      return json({ success: true });
    case 'save-and-send':
      const fieldErrors = getFieldErrors(invoiceFormData);
      const formErrors = getFormErrors(invoiceFormData, fieldErrors);
      if (fieldErrors || formErrors) {
        return badRequest<ActionData>({
          fieldErrors,
          formErrors,
        });
      }

      await createInvoice({
        userId,
        status: InvoiceStatus.PENDING,
        ...getFormattedInvoice(invoiceFormData),
      });
      return json({ success: true });
    default:
      return badRequest<ActionData>({
        fieldErrors: undefined,
        formErrors: [`unhandled intent: ${intent}`],
      });
  }
};

export default function InvoicesRoute() {
  const data = useLoaderData<typeof loader>();
  const [params] = useSearchParams();

  const invoices = data.invoices.map((invoice) => ({
    ...invoice,
    paymentDue: invoice.paymentDue ? parseDate(invoice.paymentDue) : null,
  }));
  const status = params.getAll('status') as InvoiceStatus[];
  const invoiceSummaryVerb = invoices.length === 1 ? 'is' : 'are';
  const invoiceSummaryObject = invoices.length === 1 ? 'invoice' : 'invoices';
  const invoiceSummaryStatus = getInvoiceSummaryStatus(status);

  const newButtonText = useResponsiveText({
    defaultText: 'New Invoice',
    smScreenText: 'New',
  });
  const invoiceSummaryText = useResponsiveText({
    defaultText: `There ${invoiceSummaryVerb} ${invoices.length} ${invoiceSummaryStatus} ${invoiceSummaryObject}`,
    smScreenText: `${invoices.length} invoices`,
  });

  return (
    <>
      <header className='invoice-list-header'>
        <div>
          <h1>Invoices</h1>
          <span className='invoice-list-summary'>{invoiceSummaryText}</span>
        </div>
        <div className='invoice-list-actions'>
          <InvoiceListFilter activeStatus={status} />
          <NewInvoice newButtonText={newButtonText} />
        </div>
      </header>
      {invoices.length > 0 ? (
        <InvoiceList invoices={invoices} />
      ) : (
        <section className='no-invoices'>
          <div className='no-invoices-text-container'>
            <h2 className='no-invoices-title'>There is nothing here</h2>
            <p>
              Create an invoice by clicking the <strong>{newButtonText}</strong>{' '}
              button and get started
            </p>
          </div>
        </section>
      )}
      <Outlet />
    </>
  );
}
