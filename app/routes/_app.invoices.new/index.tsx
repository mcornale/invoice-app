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
import { isArrOfString, isString } from '~/utils/type-checkers';
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
import { generateDisplayId, getPaymentDue } from '~/helpers/invoice';
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

  const senderAddressStreet = formData.get('sender-address-street');
  const senderAddressCity = formData.get('sender-address-city');
  const senderAddressPostCode = formData.get('sender-address-post-code');
  const senderAddressCountry = formData.get('sender-address-country');
  const clientName = formData.get('client-name');
  const clientEmail = formData.get('client-email');
  const clientAddressStreet = formData.get('client-address-street');
  const clientAddressCity = formData.get('client-address-city');
  const clientAddressPostCode = formData.get('client-address-post-code');
  const clientAddressCountry = formData.get('client-address-country');
  const createdAtString = formData.get('created-at');
  const paymentTermsString = formData.get('payment-terms');
  const description = formData.get('description');
  const itemNames = formData.getAll('item-name');
  const itemQuantitiesString = formData.getAll('item-quantity');
  const itemPricesString = formData.getAll('item-price');
  const itemTotalsString = formData.getAll('item-total');

  if (
    !isString(senderAddressStreet) ||
    !isString(senderAddressCity) ||
    !isString(senderAddressPostCode) ||
    !isString(senderAddressCountry) ||
    !isString(clientName) ||
    !isString(clientEmail) ||
    !isString(clientAddressStreet) ||
    !isString(clientAddressCity) ||
    !isString(clientAddressPostCode) ||
    !isString(clientAddressCountry) ||
    !isString(createdAtString) ||
    !isString(paymentTermsString) ||
    !isString(description) ||
    !isArrOfString(itemNames) ||
    !isArrOfString(itemQuantitiesString) ||
    !isArrOfString(itemPricesString) ||
    !isArrOfString(itemTotalsString)
  ) {
    return json<ActionData>(
      {
        fieldErrors: null,
        formErrors: ['Form not submitted correctly.'],
      },
      400
    );
  }

  const displayId = generateDisplayId();
  const paymentTerms = Number(paymentTermsString);
  const itemQuantities = itemQuantitiesString.map((qty) => Number(qty));
  const itemPrices = itemPricesString.map((price) => Number(price));
  const itemTotals = itemTotalsString.map((total) => Number(total));
  const createdAt = parseDate(createdAtString);
  const paymentDue =
    createdAt instanceof Date ? getPaymentDue(createdAt, paymentTerms) : null;
  const items = new Array(itemNames.length).fill(null).map((_, i) => ({
    name: itemNames[i],
    quantity: itemQuantities[i],
    price: itemPrices[i],
    total: itemTotals[i],
  }));

  switch (intent) {
    case 'save-as-draft':
      await db.invoice.create({
        data: {
          displayId,
          senderAddress: {
            street: senderAddressStreet,
            city: senderAddressCity,
            postCode: senderAddressPostCode,
            country: senderAddressCountry,
          },
          clientName,
          clientEmail,
          clientAddress: {
            street: clientAddressStreet,
            city: clientAddressCity,
            postCode: clientAddressPostCode,
            country: clientAddressCountry,
          },
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
