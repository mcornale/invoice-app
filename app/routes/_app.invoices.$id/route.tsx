import { CaretLeftIcon } from '@radix-ui/react-icons';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { useNavigate } from '@remix-run/react';
import {
  DeleteInvoice,
  links as deleteInvoiceLinks,
} from '~/components/delete-invoice';
import {
  EditInvoice,
  links as editInvoiceLinks,
} from '~/components/edit-invoice';
import { Badge, links as badgeLinks } from '~/components/ui/badge';
import { Button, links as buttonLinks } from '~/components/ui/button';
import { formatPrice } from '~/utils/helpers/format-price';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';

export const links: LinksFunction = () => {
  return [
    ...deleteInvoiceLinks(),
    ...editInvoiceLinks(),
    ...badgeLinks(),
    ...buttonLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export default function InvoiceRoute() {
  const navigate = useNavigate();

  function handleBackButtonClick() {
    navigate(-1);
  }

  return (
    <>
      <Button
        className='back-button'
        variant='tertiary-gray'
        onClick={handleBackButtonClick}
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
            <Badge variant='warning'>Pending</Badge>
          </dd>
        </dl>
        <div className='invoice-actions'>
          <EditInvoice />
          <DeleteInvoice />
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
              <dd>XM9141</dd>
            </div>
            <div className='invoice-project-desc'>
              <VisuallyHidden.Root>
                <dt>Project Description</dt>
              </VisuallyHidden.Root>
              <dd>Graphic Design</dd>
            </div>
          </div>
          <div>
            <div className='invoice-bill-from'>
              <VisuallyHidden.Root>
                <dt>Bill From</dt>
              </VisuallyHidden.Root>
              <dd>
                <address>
                  19 Union Terrace
                  <br />
                  London
                  <br />
                  E1 3EZ
                  <br />
                  United Kingdom
                </address>
              </dd>
            </div>
          </div>
          <div>
            <div className='invoice-date'>
              <dt>Invoice Date</dt>
              <dd>21 Aug 2021</dd>
            </div>
            <div className='invoice-payment-due'>
              <dt>Payment Due</dt>
              <dd>20 Sep 2021</dd>
            </div>
          </div>
          <div className='invoice-bill-to'>
            <dt>Bill to</dt>
            <dd>
              <span className='invoice-client-name'>Alex Grim</span>
              <address className='invoice-client-address'>
                19 Union Terrace
                <br />
                London
                <br />
                E1 3EZ
                <br />
                United Kingdom
              </address>
            </dd>
          </div>
          <div className='invoice-sent-to'>
            <dt>Sent To</dt>
            <dd>alexgrim@mail.com</dd>
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
                  <li>
                    <span aria-labelledby='item-name-title'>Banner Design</span>
                    <span aria-labelledby='quantity-title'>1</span>
                    <span aria-labelledby='price-title'>
                      {formatPrice(158)}
                    </span>
                    <span aria-labelledby='total-title'>
                      {formatPrice(158)}
                    </span>
                  </li>
                </ul>
              </dd>
            </div>
            <div className='invoice-amount-due'>
              <dt>Amount Due</dt>
              <dd>{formatPrice(580)}</dd>
            </div>
          </div>
        </dl>
      </section>
    </>
  );
}
