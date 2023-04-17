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
import {
  validateClientAddressCity,
  validateClientAddressCountry,
  validateClientAddressPostCode,
  validateClientAddressStreet,
  validateClientEmail,
  validateClientName,
  validateCreatedAt,
  validateDescription,
  validateItemNames,
  validateItemPrices,
  validateItemQuantities,
  validateItemTotals,
  validatePaymentTerms,
  validateSenderAddressCity,
  validateSenderAddressCountry,
  validateSenderAddressPostCode,
  validateSenderAddressStreet,
} from '~/utils/validators';
import { Button } from '~/components/ui/button';
import { useActionData, useNavigate } from '@remix-run/react';
import {
  getDisplayId,
  getItems,
  getPaymentDue,
  getTypedFormData,
} from '~/helpers/invoice';
import { db } from '~/utils/db.server';
import { InvoiceStatus } from '@prisma/client';
import { parseDate } from '~/utils/parsers';

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
        fieldErrors: null,
        formErrors: ['Form not submitted correctly.'],
      },
      400
    );
  }

  const displayId = getDisplayId();
  const senderAddress = {
    street: typedFormData.senderAddressStreet,
    city: typedFormData.senderAddressCity,
    postCode: typedFormData.senderAddressPostCode,
    country: typedFormData.senderAddressCountry,
  };
  const clientName = typedFormData.clientName;
  const clientEmail = typedFormData.clientEmail;
  const clientAddress = {
    street: typedFormData.clientAddressStreet,
    city: typedFormData.clientAddressCity,
    postCode: typedFormData.clientAddressPostCode,
    country: typedFormData.clientAddressCountry,
  };
  const paymentTerms = Number(typedFormData.paymentTerms);
  const description = typedFormData.description;

  const itemNames = typedFormData.itemNames;
  const itemQuantities = typedFormData.itemQuantities?.map((qty) =>
    Number(qty)
  );
  const itemPrices = typedFormData.itemPrices.map((price) => Number(price));
  const itemTotals = typedFormData.itemTotals.map((total) => Number(total));

  const createdAt = parseDate(typedFormData.createdAt);
  const paymentDue =
    createdAt instanceof Date ? getPaymentDue(createdAt, paymentTerms) : null;
  const items = getItems({ itemNames, itemQuantities, itemPrices, itemTotals });

  switch (intent) {
    case 'save-as-draft':
      await db.invoice.create({
        data: {
          displayId,
          senderAddress,
          clientName,
          clientEmail,
          clientAddress,
          createdAt,
          paymentTerms,
          paymentDue,
          description,
          status: InvoiceStatus.DRAFT,
          items,
          total: itemTotals.reduce((prevVal, currVal) => prevVal + currVal, 0),
        },
      });
      return redirect(`/invoices`);
    case 'save-and-send':
      const fieldErrors: ActionData['fieldErrors'] = {
        senderAddressStreet: validateSenderAddressStreet(senderAddress.street),
        senderAddressCity: validateSenderAddressCity(senderAddress.city),
        senderAddressPostCode: validateSenderAddressPostCode(
          senderAddress.postCode
        ),
        senderAddressCountry: validateSenderAddressCountry(
          senderAddress.country
        ),
        clientName: validateClientName(clientName),
        clientEmail: validateClientEmail(clientEmail),
        clientAddressStreet: validateClientAddressStreet(clientAddress.street),
        clientAddressCity: validateClientAddressCity(clientAddress.city),
        clientAddressPostCode: validateClientAddressPostCode(
          clientAddress.postCode
        ),
        clientAddressCountry: validateClientAddressCountry(
          clientAddress.country
        ),
        createdAt: validateCreatedAt(createdAt),
        paymentTerms: validatePaymentTerms(paymentTerms),
        description: validateDescription(description),
        itemNames: validateItemNames(itemNames),
        itemQuantities: validateItemQuantities(itemQuantities),
        itemPrices: validateItemPrices(itemPrices),
        itemTotals: validateItemTotals(itemTotals),
      };

      if (Object.values(fieldErrors).some(Boolean)) {
        return json<ActionData>(
          {
            fieldErrors,
            formErrors: null,
          },
          { status: 400 }
        );
      }
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
          fieldErrors={actionData?.fieldErrors ?? null}
          formErrors={actionData?.formErrors ?? null}
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
