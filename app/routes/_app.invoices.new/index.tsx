import {
  SlideOver,
  SlideOverClose,
  SlideOverContent,
  links as slideOverLinks,
} from '~/components/ui/slide-over';
import type { InvoiceFormProps } from '~/components/invoice-form';
import {
  InvoiceForm,
  links as invoiceFormLinks,
} from '~/components/invoice-form';
import type { ActionArgs, LinksFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node';
import styles from './styles.css';
import { Button } from '~/components/ui/button';
import { useActionData, useNavigate } from '@remix-run/react';
import {
  getFieldErrors,
  getFormattedDraftInvoice,
  getFormattedPendingInvoice,
  getTypedFormData,
} from '~/helpers/invoice';
import { db } from '~/utils/db.server';

interface ActionData {
  fieldErrors: InvoiceFormProps['fieldErrors'];
  formErrors: InvoiceFormProps['formErrors'];
}

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

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const intent = formData.get('intent');

  const typedFormData = getTypedFormData(formData);
  if (!typedFormData) {
    return json<ActionData>(
      {
        fieldErrors: undefined,
        formErrors: ['Form not submitted correctly.'],
      },
      400
    );
  }

  switch (intent) {
    case 'save-as-draft':
      const newDraftInvoice = getFormattedDraftInvoice(typedFormData);

      await db.invoice.create({
        data: newDraftInvoice,
      });

      return redirect(`/invoices`);
    case 'save-and-send':
      const newPendingInvoice = getFormattedPendingInvoice(typedFormData);

      const fieldErrors = getFieldErrors(newPendingInvoice);
      if (Object.values(fieldErrors).some(Boolean)) {
        return json<ActionData>(
          {
            fieldErrors,
            formErrors: undefined,
          },
          { status: 400 }
        );
      }

      await db.invoice.create({
        data: newPendingInvoice,
      });

      return;
    default:
      return new Response(`Unsupported intent: ${intent}`, { status: 400 });
  }
};

export default function NewInvoiceRoute() {
  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();

  function handleOpenChange(open: boolean) {
    if (!open) navigate(-1);
  }

  return (
    <SlideOver open onOpenChange={handleOpenChange}>
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
            >
              Save as Draft
            </Button>
            <Button
              type='submit'
              name='intent'
              value='save-and-send'
              variant='primary'
              form='new-invoice-form'
            >
              Save & Send
            </Button>
          </div>
        </div>
      </SlideOverContent>
    </SlideOver>
  );
}
