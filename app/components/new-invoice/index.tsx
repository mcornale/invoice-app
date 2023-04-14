import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import {
  SlideOver,
  SlideOverClose,
  SlideOverContent,
  SlideOverTrigger,
  links as slideOverLinks,
} from '../ui/slide-over';
import { InvoiceForm, links as invoiceFormLinks } from '../invoice-form';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';

export const links: LinksFunction = () => {
  return [
    ...slideOverLinks(),
    ...invoiceFormLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export function NewInvoice() {
  return (
    <SlideOver>
      <SlideOverTrigger asChild>
        <Button variant='primary'>
          <PlusIcon /> New Invoice
        </Button>
      </SlideOverTrigger>
      <SlideOverContent title='New Invoice'>
        <InvoiceForm id='new-invoice-form' />
        <div className='new-invoice-form-actions'>
          <div>
            <SlideOverClose asChild>
              <Button variant='secondary-gray'>Discard</Button>
            </SlideOverClose>
          </div>
          <div>
            <Button
              type='submit'
              variant='secondary-color'
              form='new-invoice-form'
            >
              Save as Draft
            </Button>
            <Button type='submit' variant='primary' form='new-invoice-form'>
              Save & Send
            </Button>
          </div>
        </div>
      </SlideOverContent>
    </SlideOver>
  );
}
