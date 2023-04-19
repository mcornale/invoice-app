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
import styles from './styles.css';
import { Button } from '~/components/ui/button';
import { useActionData, useNavigate, useNavigation } from '@remix-run/react';
import {
  getFieldErrors,
  getFormErrors,
  getFormattedInvoice,
  getInvoiceFormData,
} from '~/helpers/invoice';
import { useEffect, useState } from 'react';
import { badRequest } from '~/utils/request.server';
import { createInvoice } from '~/models/invoice.server';
import { InvoiceStatus } from '@prisma/client';
import { getUserIdFromSession } from '~/utils/session.server';

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
  const userId = await getUserIdFromSession(request);

  const formData = await request.formData();
  const intent = formData.get('intent');

  const typedFormData = getInvoiceFormData(formData);
  if (!typedFormData)
    return badRequest<ActionData>({
      fieldErrors: undefined,
      formErrors: ['Form not submitted correctly'],
    });

  switch (intent) {
    case 'save-as-draft':
      const newDraftInvoice = getFormattedInvoice({
        status: InvoiceStatus.DRAFT,
        ...typedFormData,
      });
      await createInvoice({
        userId,
        ...newDraftInvoice,
      });
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

      const newPendingInvoice = getFormattedInvoice({
        status: InvoiceStatus.PENDING,
        ...typedFormData,
      });
      await createInvoice({
        userId,
        ...newPendingInvoice,
      });
      return redirect(`/invoices`);
    default:
      return badRequest<ActionData>({
        fieldErrors: undefined,
        formErrors: [`Unhandled intent: ${intent}`],
      });
  }
};

export default function NewInvoiceRoute() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  const isSubmitting =
    navigation.state === 'submitting' || navigation.state === 'loading';
  const isSubmittingSaveAsDraft =
    isSubmitting && navigation.formData?.get('intent') === 'save-as-draft';
  const isSubmittingSaveAndSend =
    isSubmitting && navigation.formData?.get('intent') === 'save-and-send';

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
