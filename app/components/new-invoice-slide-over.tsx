import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import {
  SlideOver,
  SlideOverClose,
  SlideOverContent,
  SlideOverTrigger,
} from './ui/slide-over';
import { InvoiceForm } from './invoice-form';

export function NewInvoiceSlideOver() {
  return (
    <SlideOver>
      <SlideOverTrigger asChild>
        <Button variant='primary'>
          <PlusIcon /> New Invoice
        </Button>
      </SlideOverTrigger>
      <SlideOverContent title='New Invoice'>
        <InvoiceForm id='new-invoice-form' />
        <div className='invoice-form-actions'>
          <SlideOverClose asChild>
            <Button
              variant='secondary-gray'
              className='invoice-form-button-left'
            >
              Discard
            </Button>
          </SlideOverClose>
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
      </SlideOverContent>
    </SlideOver>
  );
}
