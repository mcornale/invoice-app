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
import { useActionData, useNavigate, useNavigation } from '@remix-run/react';
import {
  getFieldErrors,
  getFormErrors,
  getInvoiceFormData,
} from '~/helpers/invoice';
import { useEffect, useState } from 'react';
import { badRequest } from '~/utils/request.server';
import { InvoiceStatus, createInvoice } from '~/models/invoice.server';

export interface ActionData {
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

  const typedFormData = getInvoiceFormData(formData);
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
      await createInvoice({ status: InvoiceStatus.DRAFT, ...typedFormData });
      return redirect(`/invoices`);
    case 'save-and-send':
      const fieldErrors = getFieldErrors(typedFormData);
      const formErrors = getFormErrors(typedFormData, fieldErrors);
      if (fieldErrors || formErrors) {
        return badRequest<ActionData>({
          fieldErrors,
          formErrors,
        });
      }

      await createInvoice({ status: InvoiceStatus.PENDING, ...typedFormData });
      return redirect(`/invoices`);
    default:
      return badRequest(`Unsupported intent: ${intent}`);
  }
};

export default function NewInvoiceRoute() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  const isSubmitting = navigation.state === 'submitting';
  const isSubmittingSaveAsDraft =
    navigation.state === 'submitting' &&
    navigation.formData.get('intent') === 'save-as-draft';
  const isSubmittingSaveAndSend =
    isSubmitting && navigation.formData.get('intent') === 'save-and-send';

  useEffect(() => {
    setNavOpen(true);
  }, []);

  function handleOpenChange(open: boolean) {
    if (!open) navigate(-1);
  }

  return (
    <SlideOver open={navOpen} onOpenChange={handleOpenChange}>
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
