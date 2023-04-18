import { CaretLeftIcon } from '@radix-ui/react-icons';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Outlet, useLoaderData, useNavigate } from '@remix-run/react';
import {
  EditInvoice,
  links as editInvoiceLinks,
} from '~/components/edit-invoice';
import { Badge, links as badgeLinks } from '~/components/ui/badge';
import {
  Button,
  ButtonLink,
  links as buttonLinks,
} from '~/components/ui/button';
import { formatPrice, formatDate, upperFirst } from '~/utils/formatters';
import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import styles from './styles.css';
import { db } from '~/utils/db.server';
import { InvoiceStatus } from '@prisma/client';
import { parseDate } from '~/utils/parsers';

export const links: LinksFunction = () => {
  return [
    ...editInvoiceLinks(),
    ...badgeLinks(),
    ...buttonLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const loader = async ({ params }: LoaderArgs) => {
  const invoiceId = params.id;
  const invoice = await db.invoice.findUnique({ where: { id: invoiceId } });

  if (!invoice) {
    throw new Error('Invoice not found');
  }

  return json({
    invoice,
  });
};

export default function InvoiceRoute() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const invoice = {
    ...data.invoice,
    createdAt: data.invoice.createdAt
      ? parseDate(data.invoice.createdAt)
      : null,
    paymentDue: data.invoice.paymentDue
      ? parseDate(data.invoice.paymentDue)
      : null,
  };

  function handleBackClick() {
    navigate(-1);
  }

  return (
    <>
      <Button
        className='back-button'
        variant='tertiary-gray'
        onClick={handleBackClick}
      >
        <CaretLeftIcon /> Back
      </Button>
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
          <EditInvoice />
          <ButtonLink to='delete' variant='primary-destructive'>
            Delete
          </ButtonLink>
          <Button variant='primary'>Mark as Paid</Button>
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
      <Outlet />
    </>
  );
}
