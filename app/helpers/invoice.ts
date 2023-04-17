import type { Invoice } from '@prisma/client';
import { InvoiceStatus } from '@prisma/client';
import type {
  FieldErrors as InvoiceFormFieldErrors,
  Fields as InvoiceFormFields,
} from '~/components/invoice-form';
import { parseDate } from '~/utils/parsers';
import { isArrOfString, isString } from '~/utils/type-checkers';

type InvoiceWithoutId = Omit<Invoice, 'id'>;
interface getInvoiceParams extends InvoiceFormFields {
  status: InvoiceStatus;
}

type getItemsParams = Pick<
  InvoiceFormFields,
  'itemNames' | 'itemQuantities' | 'itemPrices' | 'itemTotals'
>;

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';

export function getTypedFormData(
  formData: FormData
): InvoiceFormFields | undefined {
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
  const createdAt = formData.get('created-at');
  const paymentTerms = formData.get('payment-terms');
  const description = formData.get('description');
  const itemNames = formData.getAll('item-name');
  const itemQuantities = formData.getAll('item-quantity');
  const itemPrices = formData.getAll('item-price');
  const itemTotals = formData.getAll('item-total');

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
    !isString(createdAt) ||
    !isString(paymentTerms) ||
    !isString(description) ||
    !isArrOfString(itemNames) ||
    !isArrOfString(itemQuantities) ||
    !isArrOfString(itemPrices) ||
    !isArrOfString(itemTotals)
  ) {
    return;
  }

  return {
    senderAddressStreet,
    senderAddressCity,
    senderAddressPostCode,
    senderAddressCountry,
    clientName,
    clientEmail,
    clientAddressStreet,
    clientAddressCity,
    clientAddressPostCode,
    clientAddressCountry,
    createdAt,
    paymentTerms,
    description,
    itemNames,
    itemQuantities,
    itemPrices,
    itemTotals,
  };
}

export function getDisplayId() {
  const randomLetters =
    ALPHABET[Math.floor(Math.random() * ALPHABET.length)] +
    ALPHABET[Math.floor(Math.random() * ALPHABET.length)];

  let randomNumber = '';
  for (let i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * NUMBERS.length);
    randomNumber += NUMBERS.charAt(index);
  }

  return `${randomLetters}${randomNumber}`;
}

export const getPaymentDue = (createdAt: Date, paymentTerms: number) => {
  const paymentTermsInMS = paymentTerms * 24 * 60 * 60 * 1000;
  return new Date(createdAt.getTime() + paymentTermsInMS);
};

export function getItems(itemFields: getItemsParams) {
  const itemNames = itemFields.itemNames;
  const itemQuantities = itemFields.itemQuantities?.map((qty) => Number(qty));
  const itemPrices = itemFields.itemPrices.map((price) => Number(price));
  const itemTotals = itemFields.itemTotals.map((total) => Number(total));

  return new Array(itemNames.length).fill(null).map((_, i) => ({
    name: itemNames[i],
    quantity: itemQuantities[i],
    price: itemPrices[i],
    total: itemTotals[i],
  }));
}

export function getFormattedInvoice({
  status,
  ...fields
}: getInvoiceParams): InvoiceWithoutId {
  const displayId = getDisplayId();
  const senderAddress = {
    street: fields.senderAddressStreet,
    city: fields.senderAddressCity,
    postCode: fields.senderAddressPostCode,
    country: fields.senderAddressCountry,
  };
  const clientName = fields.clientName;
  const clientEmail = fields.clientEmail;
  const clientAddress = {
    street: fields.clientAddressStreet,
    city: fields.clientAddressCity,
    postCode: fields.clientAddressPostCode,
    country: fields.clientAddressCountry,
  };
  const paymentTerms = Number(fields.paymentTerms);
  const description = fields.description;

  const createdAt = parseDate(fields.createdAt);
  const paymentDue =
    createdAt instanceof Date ? getPaymentDue(createdAt, paymentTerms) : null;
  const items = getItems({
    itemNames: fields.itemNames,
    itemQuantities: fields.itemQuantities,
    itemPrices: fields.itemPrices,
    itemTotals: fields.itemTotals,
  });

  return {
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
    total: items.reduce((prevVal, currItem) => prevVal + currItem.total, 0),
  };
}

export const getFormattedDraftInvoice = (fields: InvoiceFormFields) =>
  getFormattedInvoice({ status: InvoiceStatus.DRAFT, ...fields });

export const getFormattedPendingInvoice = (fields: InvoiceFormFields) =>
  getFormattedInvoice({ status: InvoiceStatus.PENDING, ...fields });

export const validateSenderAddressStreet = (val: string) => {
  if (val === '') return "can't be empty";
};

export const validateSenderAddressCity = (val: string) => {
  if (val === '') return "can't be empty";
};

export const validateSenderAddressPostCode = (val: string) => {
  if (val === '') return "can't be empty";
};

export const validateSenderAddressCountry = (val: string) => {
  if (val === '') return "can't be empty";
};

export const validateClientName = (val: string) => {
  if (val === '') return "can't be empty";
};

export const validateClientEmail = (val: string) => {
  if (val === '') return "can't be empty";
};

export const validateClientAddressStreet = (val: string) => {
  if (val === '') return "can't be empty";
};

export const validateClientAddressCity = (val: string) => {
  if (val === '') return "can't be empty";
};

export const validateClientAddressPostCode = (val: string) => {
  if (val === '') return "can't be empty";
};

export const validateClientAddressCountry = (val: string) => {
  if (val === '') return "can't be empty";
};

export const validateCreatedAt = (val: Date | null) => {
  if (val === null) return 'choose a valid date';
};

export const validatePaymentTerms = (val: number) => {
  if (val === null) return 'choose a valid value';
};

export const validateDescription = (val: string) => {
  if (val === '') return "can't be empty";
};

export const validateItemNames = (vals: string[]) => {
  if (vals.some((val) => val === '')) return "item names can't be empty";
};

export const validateItemQuantities = (vals: number[]) => {
  if (vals.some((val) => val <= 0))
    return 'item quantities must be a number greater than 0';
};

export const validateItemPrices = (vals: number[]) => {
  if (vals.some((val) => val <= 0))
    return 'item prices must be a number greater than 0';
};

export const validateItemTotals = (vals: number[]) => {
  if (vals.some((val) => val <= 0))
    return 'item totals must be a number greater than 0';
};

export const areThereFieldErrors = (fieldErrors: InvoiceFormFieldErrors) =>
  Object.values(fieldErrors).some(Boolean);

export const getFieldErrors = (
  invoice: InvoiceWithoutId
): InvoiceFormFieldErrors => ({
  senderAddressStreet: validateSenderAddressStreet(
    invoice.senderAddress.street
  ),
  senderAddressCity: validateSenderAddressCity(invoice.senderAddress.city),
  senderAddressPostCode: validateSenderAddressPostCode(
    invoice.senderAddress.postCode
  ),
  senderAddressCountry: validateSenderAddressCountry(
    invoice.senderAddress.country
  ),
  clientName: validateClientName(invoice.clientName),
  clientEmail: validateClientEmail(invoice.clientEmail),
  clientAddressStreet: validateClientAddressStreet(
    invoice.clientAddress.street
  ),
  clientAddressCity: validateClientAddressCity(invoice.clientAddress.city),
  clientAddressPostCode: validateClientAddressPostCode(
    invoice.clientAddress.postCode
  ),
  clientAddressCountry: validateClientAddressCountry(
    invoice.clientAddress.country
  ),
  createdAt: validateCreatedAt(invoice.createdAt),
  paymentTerms: validatePaymentTerms(invoice.paymentTerms),
  description: validateDescription(invoice.description),
  itemNames: validateItemNames(invoice.items.map((item) => item.name)),
  itemQuantities: validateItemQuantities(
    invoice.items.map((item) => item.quantity)
  ),
  itemPrices: validateItemPrices(invoice.items.map((item) => item.price)),
  itemTotals: validateItemTotals(invoice.items.map((item) => item.total)),
});

export const getFormErrors = (
  invoice: InvoiceWithoutId,
  fieldErrors: InvoiceFormFieldErrors
) => {
  const formErrors = [];
  if (areThereFieldErrors(fieldErrors))
    formErrors.push('All fields must be added');
  if (invoice.items.length === 0) formErrors.push('An item must be added');

  return formErrors.length > 0 ? formErrors : undefined;
};
