import { Link } from '@remix-run/react';
import { CaretRightIcon } from '@radix-ui/react-icons';
import { formatPrice } from '~/utils/helpers/format-price';
import { Badge, links as badgeLinks } from '~/components/ui/badge';
import styles from './styles.css';
import type { LinksFunction } from '@remix-run/node';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

export const links: LinksFunction = () => {
  return [
    ...badgeLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export function InvoicesList() {
  return (
    <ul className='invoices-list'>
      <li>
        <Link to='RT3080' className='invoice-link'>
          <dl>
            <div className='invoice-id'>
              <VisuallyHidden.Root>
                <dt>Id</dt>
              </VisuallyHidden.Root>
              <dd>RT3080</dd>
            </div>
            <div className='invoice-due-date'>
              <VisuallyHidden.Root>
                <dt>Due Date</dt>
              </VisuallyHidden.Root>
              <dd>Due 19 Aug 2021</dd>
            </div>
            <div className='invoice-client-name'>
              <VisuallyHidden.Root>
                <dt>Client Name</dt>
              </VisuallyHidden.Root>
              <dd>Jensen Huang</dd>
            </div>
            <div className='invoice-amount-due'>
              <VisuallyHidden.Root>
                <dt>Amount Due</dt>
              </VisuallyHidden.Root>
              <dd>{formatPrice(1800.9)}</dd>
            </div>
            <div className='invoice-status'>
              <VisuallyHidden.Root>
                <dt>Status</dt>
              </VisuallyHidden.Root>
              <dd>
                <Badge variant='success'>Paid</Badge>
              </dd>
            </div>
            <CaretRightIcon />
          </dl>
        </Link>
      </li>
    </ul>
  );
}
