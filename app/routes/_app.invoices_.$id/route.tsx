import { CaretLeftIcon } from '@radix-ui/react-icons';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import {
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useNavigation,
  useRouteError,
} from '@remix-run/react';
import { Badge, links as badgeLinks } from '~/components/ui/badge';
import {
  Button,
  ButtonLink,
  links as buttonLinks,
} from '~/components/ui/button';
import { formatPrice, formatDate, upperFirst } from '~/utils/formatters';
import type { ActionArgs, LinksFunction, LoaderArgs } from '@remix-run/node';
import { redirect, json } from '@remix-run/node';
import styles from './styles.css';
import { parseDate } from '~/utils/parsers';
import { InvoiceStatus } from '@prisma/client';
import { getUserIdFromSession } from '~/utils/session.server';
import {
  deleteInvoice,
  getInvoice,
  markInvoiceAsPaid,
  editInvoice,
} from '~/models/invoice.server';
import { isString } from '~/utils/checkers';
import type { InvoiceFormProps } from '~/components/invoice-form';
import { badRequest } from '~/utils/request.server';
import {
  getFieldErrors,
  getFormErrors,
  getFormattedInvoice,
  getInvoiceFormData,
  isInvoiceStatus,
} from '~/helpers/invoice';
import {
  EditInvoice,
  links as editInvoiceLinks,
} from '~/components/edit-invoice';
import {
  DeleteInvoice,
  links as deleteInvoiceLinks,
} from '~/components/delete-invoice';
import { Form } from '~/components/ui/form';
import { useEffect } from 'react';

export interface ActionData {
  fieldErrors?: InvoiceFormProps['fieldErrors'];
  formErrors?: InvoiceFormProps['formErrors'];
  success?: boolean;
}

export const links: LinksFunction = () => {
  return [
    ...badgeLinks(),
    ...buttonLinks(),
    ...editInvoiceLinks(),
    ...deleteInvoiceLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const loader = async ({ params, request }: LoaderArgs) => {
  const userId = await getUserIdFromSession(request);
  if (!userId) throw new Error("This shouldn't be possible");
  const invoiceId = params.id;
  if (!isString(invoiceId)) throw new Error("This shouldn't be possible");
  const invoice = await getInvoice(invoiceId);
  if (!invoice) {
    throw new Response('Invoice not found', { status: 404 });
  }
  if (invoice.userId !== userId)
    throw new Response("You don't own this invoice!", { status: 403 });

  return json({
    invoice,
  });
};

export const action = async ({ params, request }: ActionArgs) => {
  const userId = await getUserIdFromSession(request);
  if (!userId) throw new Error("This shouldn't be possible");
  const invoiceId = params.id;
  if (!isString(invoiceId)) throw new Error("This shouldn't be possible");

  const formData = await request.formData();
  const intent = formData.get('intent');

  switch (intent) {
    case 'save-changes':
      const status = formData.get('status');
      if (!isInvoiceStatus(status))
        throw new Error("This shouldn't be possible");
      const invoiceFormData = getInvoiceFormData(formData, false);
      if (!invoiceFormData)
        return badRequest<ActionData>({
          fieldErrors: undefined,
          formErrors: ['form not submitted correctly'],
        });

      const fieldErrors = getFieldErrors(
        invoiceFormData,
        status !== InvoiceStatus.PENDING
      );
      const formErrors = getFormErrors(invoiceFormData, fieldErrors);
      if (fieldErrors || formErrors) {
        return badRequest<ActionData>({
          fieldErrors,
          formErrors,
        });
      }

      const updatedInvoice = getFormattedInvoice(invoiceFormData);
      await editInvoice({
        id: invoiceId,
        status: status === InvoiceStatus.DRAFT ? InvoiceStatus.PENDING : status,
        ...updatedInvoice,
      });
      return json({ success: true });
    case 'mark-as-paid':
      await markInvoiceAsPaid(invoiceId, InvoiceStatus.PAID);
      return json({ success: true });
    case 'delete':
      await deleteInvoice(invoiceId);
      return redirect('/invoices');
    default:
      throw new Response(`The intent "${intent}" is not supported`, {
        status: 400,
      });
  }
};

export default function InvoiceRoute() {
  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  const isMarkingAsPaid =
    navigation.state === 'submitting' &&
    navigation.formData?.get('intent') === 'mark-as-paid';

  const invoice = {
    ...data.invoice,
    createdAt: data.invoice.createdAt
      ? parseDate(data.invoice.createdAt)
      : null,
    paymentDue: data.invoice.paymentDue
      ? parseDate(data.invoice.paymentDue)
      : null,
  };

  useEffect(() => {
    (document.querySelector('.app-outlet-wrapper') as HTMLElement).scrollTo(
      0,
      0
    );
  }, []);

  return (
    <>
      <ButtonLink
        to='/invoices'
        replace
        prefetch='intent'
        className='back-button'
        variant='tertiary-gray'
      >
        <CaretLeftIcon /> Back
      </ButtonLink>
      <VisuallyHidden.Root>
        <h1>Invoice XM9141</h1>
      </VisuallyHidden.Root>
      <section className='invoice-management'>
        <VisuallyHidden.Root>
          <h2>Invoice Management</h2>
        </VisuallyHidden.Root>
        <dl className='invoice-status'>
          <dt>Status</dt>
          <dd>
            {invoice.status === InvoiceStatus.PAID && (
              <Badge variant='success'>{upperFirst(invoice.status)}</Badge>
            )}
            {invoice.status === InvoiceStatus.PENDING && (
              <Badge variant='warning'>{upperFirst(invoice.status)}</Badge>
            )}
            {invoice.status === InvoiceStatus.DRAFT && (
              <Badge variant='gray'>{upperFirst(invoice.status)}</Badge>
            )}
          </dd>
        </dl>
        <div className='invoice-actions'>
          <EditInvoice invoice={invoice} />
          <DeleteInvoice invoiceDisplayId={invoice.displayId} />
          <Form method='put'>
            <Button
              type='submit'
              variant='primary'
              name='intent'
              value='mark-as-paid'
              showSpinner={isMarkingAsPaid}
              disabled={invoice.status === InvoiceStatus.PAID}
            >
              Mark as Paid
            </Button>
          </Form>
        </div>
      </section>
      <section className='invoice-details'>
        <dl>
          <div>
            <VisuallyHidden.Root>
              <h2>Invoice Details</h2>
            </VisuallyHidden.Root>
            <div className='invoice-id'>
              <VisuallyHidden.Root>
                <dt>Id</dt>
              </VisuallyHidden.Root>
              <dd>{invoice.displayId}</dd>
            </div>
            <div className='invoice-project-desc'>
              <VisuallyHidden.Root>
                <dt>Project Description</dt>
              </VisuallyHidden.Root>
              <dd>{invoice.description}</dd>
            </div>
          </div>
          <div>
            <div className='invoice-bill-from'>
              <VisuallyHidden.Root>
                <dt>Bill From</dt>
              </VisuallyHidden.Root>
              <dd>
                <address>
                  {invoice.senderAddress.street}
                  <br />
                  {invoice.senderAddress.city}
                  <br />
                  {invoice.senderAddress.postCode}
                  <br />
                  {invoice.senderAddress.country}
                </address>
              </dd>
            </div>
          </div>
          <div>
            <div className='invoice-date'>
              <dt>Invoice Date</dt>
              <dd>{invoice.createdAt ? formatDate(invoice.createdAt) : ''}</dd>
            </div>
            <div className='invoice-payment-due'>
              <dt>Payment Due</dt>
              <dd>
                {invoice.paymentDue ? formatDate(invoice.paymentDue) : ''}
              </dd>
            </div>
          </div>
          <div className='invoice-bill-to'>
            <dt>Bill to</dt>
            <dd>
              <span className='invoice-client-name'>{invoice.clientName}</span>
              <address className='invoice-client-address'>
                {invoice.clientAddress.street}
                <br />
                {invoice.clientAddress.city}
                <br />
                {invoice.clientAddress.postCode}
                <br />
                {invoice.clientAddress.country}
              </address>
            </dd>
          </div>
          <div className='invoice-sent-to'>
            <dt>Sent To</dt>
            <dd>{invoice.clientEmail}</dd>
          </div>
          <div>
            <div className='invoice-item-list'>
              <VisuallyHidden.Root>
                <dt>Item List</dt>
              </VisuallyHidden.Root>
              <dd>
                <ul>
                  <li aria-hidden>
                    <span id='item-name-title'>Item Name</span>
                    <span id='quantity-title'>Qty.</span>
                    <span id='price-title'>Price</span>
                    <span id='total-title'>Total</span>
                  </li>
                  {invoice.items.map((item, index) => (
                    <li key={index}>
                      <span aria-labelledby='item-name-title'>{item.name}</span>
                      <span aria-labelledby='quantity-title'>
                        {item.quantity}
                      </span>
                      <span aria-labelledby='price-title'>
                        {formatPrice(item.price)}
                      </span>
                      <span aria-labelledby='total-title'>
                        {formatPrice(item.total)}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className='invoice-amount-due'>
              <dt>Amount Due</dt>
              <dd>{formatPrice(invoice.total)}</dd>
            </div>
          </div>
        </dl>
      </section>
      <Outlet context={{ invoice }} />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  const errorMessage = isRouteErrorResponse(error)
    ? error.data
    : 'Something bad happened. Sorry';

  return <div className='error-container'>{errorMessage}</div>;
}
