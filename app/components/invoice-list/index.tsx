import { Link } from '@remix-run/react';
import { CaretRightIcon } from '@radix-ui/react-icons';
import { formatPrice, formatDate, upperFirst } from '~/utils/formatters';
import { Badge, links as badgeLinks } from '~/components/ui/badge';
import styles from './styles.css';
import type { LinksFunction } from '@remix-run/node';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import type { Invoice } from '@prisma/client';
import { InvoiceStatus } from '@prisma/client';

export interface InvoiceListProps {
  invoices: Pick<
    Invoice,
    'id' | 'displayId' | 'clientName' | 'paymentDue' | 'status' | 'total'
  >[];
}

export const links: LinksFunction = () => {
  return [
    ...badgeLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export function InvoiceList({ invoices }: InvoiceListProps) {
  return (
    <ul className='invoice-list'>
      {invoices.map((invoice) => (
        <li key={invoice.id}>
          <Link to={invoice.id} className='invoice-link'>
            <dl>
              <div className='invoice-id'>
                <VisuallyHidden.Root>
                  <dt>Id</dt>
                </VisuallyHidden.Root>
                <dd>{invoice.displayId}</dd>
              </div>
              <div className='invoice-due-date'>
                <VisuallyHidden.Root>
                  <dt>Due Date</dt>
                </VisuallyHidden.Root>
                <dd>
                  {invoice.paymentDue
                    ? `Due ${formatDate(invoice.paymentDue)}`
                    : ''}
                </dd>
              </div>
              <div className='invoice-client-name'>
                <VisuallyHidden.Root>
                  <dt>Client Name</dt>
                </VisuallyHidden.Root>
                <dd>{invoice.clientName}</dd>
              </div>
              <div className='invoice-amount-due'>
                <VisuallyHidden.Root>
                  <dt>Amount Due</dt>
                </VisuallyHidden.Root>
                <dd>{formatPrice(invoice.total)}</dd>
              </div>
              <div className='invoice-status'>
                <VisuallyHidden.Root>
                  <dt>Status</dt>
                </VisuallyHidden.Root>
                <dd>
                  {invoice.status === InvoiceStatus.PAID && (
                    <Badge variant='success'>
                      {upperFirst(invoice.status)}
                    </Badge>
                  )}
                  {invoice.status === InvoiceStatus.PENDING && (
                    <Badge variant='warning'>
                      {upperFirst(invoice.status)}
                    </Badge>
                  )}
                  {invoice.status === InvoiceStatus.DRAFT && (
                    <Badge variant='gray'>{upperFirst(invoice.status)}</Badge>
                  )}
                </dd>
              </div>
              <CaretRightIcon />
            </dl>
          </Link>
        </li>
      ))}
    </ul>
  );
}
