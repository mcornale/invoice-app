import {
  SlideOver,
  SlideOverClose,
  SlideOverContent,
  SlideOverTrigger,
  links as slideOverLinks,
} from '../ui/slide-over';
import { InvoiceForm, links as invoiceFormLinks } from '../invoice-form';
import { Button, links as buttonLinks } from '../ui/button';
import { useActionData, useNavigation } from '@remix-run/react';
import styles from './styles.css';
import type { LinksFunction } from '@remix-run/node';
import type { ActionData } from '~/routes/_app.invoices/route';
import { PlusIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

export interface NewInvoiceFormProps {
  newButtonText: string;
}

export const links: LinksFunction = () => {
  return [
    ...buttonLinks(),
    ...slideOverLinks(),
    ...invoiceFormLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export function NewInvoice({ newButtonText }: NewInvoiceFormProps) {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);

  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen);
  }

  const isSubmitting = navigation.state === 'submitting';
  const isSubmittingSaveAsDraft =
    isSubmitting && navigation.formData?.get('intent') === 'save-as-draft';
  const isSubmittingSaveAndSend =
    isSubmitting && navigation.formData?.get('intent') === 'save-and-send';

  useEffect(() => {
    if (actionData?.success) setOpen(false);
  }, [actionData]);

  return (
    <SlideOver open={open} onOpenChange={handleOpenChange}>
      <SlideOverTrigger asChild>
        <Button variant='primary'>
          <PlusIcon />
          {newButtonText}
        </Button>
      </SlideOverTrigger>
      <SlideOverContent title='New Invoice'>
        <InvoiceForm
          id='new-invoice-form'
          method='post'
          fieldErrors={actionData?.fieldErrors}
          formErrors={actionData?.formErrors}
        />
        <div className='new-invoice-form-actions'>
          <div>
            <SlideOverClose asChild>
              <Button variant='secondary-gray'>Discard</Button>
            </SlideOverClose>
          </div>
          <div>
            <Button
              type='submit'
              name='intent'
              value='save-as-draft'
              variant='secondary-color'
              form='new-invoice-form'
              showSpinner={isSubmittingSaveAsDraft}
            >
              Save as Draft
            </Button>
            <Button
              type='submit'
              name='intent'
              value='save-and-send'
              variant='primary'
              form='new-invoice-form'
              showSpinner={isSubmittingSaveAndSend}
            >
              Save & Send
            </Button>
          </div>
        </div>
      </SlideOverContent>
    </SlideOver>
  );
}
