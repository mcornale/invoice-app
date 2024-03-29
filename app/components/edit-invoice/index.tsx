import type { LinksFunction } from '@remix-run/node';
import { useActionData, useLoaderData, useNavigation } from '@remix-run/react';
import type { ActionData, loader } from '~/routes/_app.invoices_.$id/route';
import {
  SlideOver,
  SlideOverClose,
  SlideOverContent,
  SlideOverTrigger,
  links as slideOverLinks,
} from '../ui/slide-over';
import { InvoiceForm, links as invoiceFormLinks } from '../invoice-form';
import { Button, links as buttonLinks } from '../ui/button';
import styles from './styles.css';
import type { Invoice } from '@prisma/client';
import { InvoiceStatus } from '@prisma/client';
import { useEffect, useState } from 'react';

export interface EditInvoiceProps {
  invoice: Invoice;
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

export function EditInvoice({ invoice }: EditInvoiceProps) {
  const actionData = useActionData<ActionData>();
  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);

  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen);
  }

  const isSubmitting =
    navigation.state === 'submitting' &&
    navigation.formData?.get('intent') === 'save-changes';

  useEffect(() => {
    if (actionData?.success) setOpen(false);
  }, [actionData]);

  return (
    <SlideOver open={open} onOpenChange={handleOpenChange}>
      <SlideOverTrigger asChild>
        <Button
          variant='secondary-gray'
          disabled={data.invoice.status === InvoiceStatus.PAID}
        >
          Edit
        </Button>
      </SlideOverTrigger>
      <SlideOverContent title='Edit Invoice'>
        <InvoiceForm
          id='edit-invoice-form'
          method='put'
          initData={invoice}
          fieldErrors={actionData?.fieldErrors}
          formErrors={actionData?.formErrors}
        />
        <div className='edit-invoice-form-actions'>
          <SlideOverClose asChild>
            <Button variant='secondary-gray'>Cancel</Button>
          </SlideOverClose>
          <Button
            type='submit'
            variant='primary'
            form='edit-invoice-form'
            name='intent'
            value='save-changes'
            showSpinner={isSubmitting}
          >
            Save Changes
          </Button>
        </div>
      </SlideOverContent>
    </SlideOver>
  );
}
