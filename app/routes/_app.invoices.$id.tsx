import { CaretLeftIcon } from '@radix-ui/react-icons';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { EditInvoiceSlideOver } from '~/components/edit-invoice-slide-over';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { formatPrice } from '~/utils/helpers/format-price';

export default function InvoiceRoute() {
  return (
    <>
      <Button variant='tertiary-gray'>
        <CaretLeftIcon /> Back
      </Button>
      <VisuallyHidden.Root>
        <h1>Invoice XM9141</h1>
      </VisuallyHidden.Root>
      <section className='invoice-management'>
        <VisuallyHidden.Root>
          <h2>Invoice Management</h2>
        </VisuallyHidden.Root>
        <dl>
          <dt>Status</dt>
          <dd>
            <Badge variant='warning'>Pending</Badge>
          </dd>
        </dl>
        <div>
          <EditInvoiceSlideOver />
          <Button variant='primary-destructive'>Delete</Button>
          <Button variant='primary'>Mark as Paid</Button>
        </div>
      </section>
      <section className='invoice-details'>
        <VisuallyHidden.Root>
          <h2>Invoice Details</h2>
        </VisuallyHidden.Root>
        <dt>Id</dt>
        <dd>XM9141</dd>
        <dt>Project Description</dt>
        <dd>Graphic Design</dd>
        <dt>Bill From</dt>
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
        <dt>Invoice Date</dt>
        <dd>21 Aug 2021</dd>
        <dt>Payement Due</dt>
        <dd>20 Sep 2021</dd>
        <dt>Bill to</dt>
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
        <dt>Sent To</dt>
        <dd>alexgrim@mail.com</dd>
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
              <span aria-labelledby='price-title'>{formatPrice(158)}</span>
              <span aria-labelledby='total-title'>{formatPrice(158)}</span>
            </li>
            <li>
              <span aria-labelledby='item-name-title'>Banner Design</span>
              <span aria-labelledby='quantity-title'>1</span>
              <span aria-labelledby='price-title'>{formatPrice(158)}</span>
              <span aria-labelledby='total-title'>{formatPrice(158)}</span>
            </li>
          </ul>
        </dd>
        <dt>Amount Due</dt>
        <dd>{formatPrice(580)}</dd>
      </section>
    </>
  );
}
