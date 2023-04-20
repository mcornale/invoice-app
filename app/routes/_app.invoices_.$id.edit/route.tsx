import { Button } from '~/components/ui/button';
import {
  SlideOver,
  SlideOverClose,
  SlideOverContent,
  links as slideOverLinks,
} from '~/components/ui/slide-over';
import {
  InvoiceForm,
  links as invoiceFormLinks,
} from '~/components/invoice-form';
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

export default function EditInvoiceRoute() {
  return (
    <SlideOver>
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
