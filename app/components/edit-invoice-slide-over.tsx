import { Button } from './ui/button';
import {
  SlideOver,
  SlideOverClose,
  SlideOverContent,
  SlideOverTrigger,
} from './ui/slide-over';
import { InvoiceForm } from './invoice-form';

export function EditInvoiceSlideOver() {
  return (
    <SlideOver>
      <SlideOverTrigger asChild>
        <Button variant='secondary-gray'>Edit</Button>
      </SlideOverTrigger>
      <SlideOverContent title='Edit Invoice'>
        <InvoiceForm id='edit-invoice-form' />
        <div className='invoice-form-actions'>
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
