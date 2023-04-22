import { Button } from '~/components/ui/button';
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
import { getUserIdFromSession } from '~/utils/session.server';
import {
  getFieldErrors,
  getFormErrors,
  getFormattedInvoice,
  getInvoiceFormData,
  isInvoiceStatus,
} from '~/helpers/invoice';
import { badRequest } from '~/utils/request.server';
import {
  useActionData,
  useNavigation,
  useOutletContext,
} from '@remix-run/react';
import type { Invoice } from '@prisma/client';
import { InvoiceStatus } from '@prisma/client';
import { updateInvoice } from '~/models/invoice.server';
import { isString } from '~/utils/checkers';

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

export const action = async ({ params, request }: ActionArgs) => {
  const userId = await getUserIdFromSession(request);
  if (!userId) throw new Error("This shouldn't be possible");
  const invoiceId = params.id;
  if (!isString(invoiceId)) throw new Error("This shouldn't be possible");

  const formData = await request.formData();

  const intent = formData.get('intent');
  if (intent !== 'save-changes')
    return badRequest<ActionData>({
      fieldErrors: undefined,
      formErrors: [`unhandled intent: ${intent}`],
    });

  const status = formData.get('status');
  if (!isInvoiceStatus(status)) throw new Error("This shouldn't be possible");
  const typedFormData = getInvoiceFormData(formData);
  if (!typedFormData)
    return badRequest<ActionData>({
      fieldErrors: undefined,
      formErrors: ['form not submitted correctly'],
    });

  const fieldErrors = getFieldErrors(typedFormData);
  const formErrors = getFormErrors(typedFormData, fieldErrors);
  if (fieldErrors || formErrors) {
    return badRequest<ActionData>({
      fieldErrors,
      formErrors,
    });
  }

  const updatedInvoice = getFormattedInvoice({
    status: status === InvoiceStatus.DRAFT ? InvoiceStatus.PENDING : status,
    ...typedFormData,
  });
  await updateInvoice({ id: invoiceId, ...updatedInvoice });
  return redirect(`/invoices/${invoiceId}`);
};

export default function EditInvoiceRoute() {
  const actionData = useActionData<ActionData>();
  const context = useOutletContext() as { invoice: Invoice };
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === 'submitting' &&
    navigation.formData.get('intent') === 'save-changes';

  return (
    <SlideOver>
      <SlideOverContent title='Edit Invoice'>
        <InvoiceForm
          id='edit-invoice-form'
          method='post'
          initData={context.invoice}
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
