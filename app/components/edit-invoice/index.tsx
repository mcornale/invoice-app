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

export function EditInvoice() {
  return (
    <SlideOver>
      <SlideOverTrigger asChild>
        <Button variant='secondary-gray'>Edit</Button>
      </SlideOverTrigger>
      <SlideOverContent title='Edit Invoice'>
        <InvoiceForm id='edit-invoice-form' />
        <div className='edit-invoice-form-actions'>
          <SlideOverClose asChild>
            <Button variant='secondary-gray'>Cancel</Button>
          </SlideOverClose>
          <Button type='submit' variant='primary' form='edit-invoice-form'>
            Save Changes
          </Button>
        </div>
      </SlideOverContent>
    </SlideOver>
  );
}
