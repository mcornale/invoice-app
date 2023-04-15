import { Link } from '@remix-run/react';
import { CaretRightIcon } from '@radix-ui/react-icons';
import { formatPrice } from '~/utils/helpers/format-price';
import { Badge, links as badgeLinks } from '~/components/ui/badge';
import styles from './styles.css';
import type { LinksFunction } from '@remix-run/node';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import type { Invoice } from '@prisma/client';
import { Status } from '@prisma/client';
import { upperFirst } from '~/utils/helpers/upper-first';
import { formatDate } from '~/utils/helpers/format-date';

interface InvoiceListProps {
  invoices: Pick<
    Invoice,
    'id' | 'invoiceId' | 'clientName' | 'paymentDue' | 'status' | 'total'
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
                <dd>{invoice.invoiceId}</dd>
              </div>
              <div className='invoice-due-date'>
                <VisuallyHidden.Root>
                  <dt>Due Date</dt>
                </VisuallyHidden.Root>
                <dd>Due {formatDate(invoice.paymentDue)}</dd>
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
                  {invoice.status === Status.PAID && (
                    <Badge variant='success'>
                      {upperFirst(invoice.status)}
                    </Badge>
                  )}
                  {invoice.status === Status.PENDING && (
                    <Badge variant='warning'>
                      {upperFirst(invoice.status)}
                    </Badge>
                  )}
                  {invoice.status === Status.DRAFT && (
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
