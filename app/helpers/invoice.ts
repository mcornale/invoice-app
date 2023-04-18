import type {
  InvoiceFormFieldErrors,
  InvoiceFormFields,
} from '~/components/invoice-form';
import { isArrOfString, isString, hasSomeTruthyValues } from '~/utils/checkers';
import { isEmail, isEmpty, isNull, isPositive } from '~/utils/validators';
import { ERROR_MESSAGES } from '~/utils/error-messages';
import { parseDate } from '~/utils/parsers';
import { InvoiceStatus } from '@prisma/client';

export type getItemsParams = Pick<
  InvoiceFormFields,
  'itemNames' | 'itemQuantities' | 'itemPrices' | 'itemTotals'
>;

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';

export function getInvoiceFormData(
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

export function getInvoiceDisplayId() {
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

export const getInvoicePaymentDue = (createdAt: Date, paymentTerms: number) => {
  const paymentTermsInMS = paymentTerms * 24 * 60 * 60 * 1000;
  return new Date(createdAt.getTime() + paymentTermsInMS);
};

export function getInvoiceItems(itemFields: getItemsParams) {
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

export const validateSenderAddressStreet = (val: string) => {
  if (isEmpty(val)) return ERROR_MESSAGES.EMPTY;
};

export const validateSenderAddressCity = (val: string) => {
  if (isEmpty(val)) return ERROR_MESSAGES.EMPTY;
};

export const validateSenderAddressPostCode = (val: string) => {
  if (isEmpty(val)) return ERROR_MESSAGES.EMPTY;
};

export const validateSenderAddressCountry = (val: string) => {
  if (isEmpty(val)) return ERROR_MESSAGES.EMPTY;
};

export const validateClientName = (val: string) => {
  if (isEmpty(val)) return ERROR_MESSAGES.EMPTY;
};

export const validateClientEmail = (val: string) => {
  if (isEmpty(val)) return ERROR_MESSAGES.EMPTY;
  if (!isEmail(val)) return ERROR_MESSAGES.EMAIL;
};

export const validateClientAddressStreet = (val: string) => {
  if (isEmpty(val)) return ERROR_MESSAGES.EMPTY;
};

export const validateClientAddressCity = (val: string) => {
  if (isEmpty(val)) return ERROR_MESSAGES.EMPTY;
};

export const validateClientAddressPostCode = (val: string) => {
  if (isEmpty(val)) return ERROR_MESSAGES.EMPTY;
};

export const validateClientAddressCountry = (val: string) => {
  if (isEmpty(val)) return ERROR_MESSAGES.EMPTY;
};

export const validateCreatedAt = (val: string) => {
  if (isNull(parseDate(val))) return 'choose a valid date';
};

export const validatePaymentTerms = (val: string) => {
  if (!isPositive(Number(val))) return 'choose a valid option';
};

export const validateDescription = (val: string) => {
  if (isEmpty(val)) return ERROR_MESSAGES.EMPTY;
};

export const validateItemNames = (vals: string[]) => {
  if (vals.some((val) => isEmpty(val)))
    return `item names ${ERROR_MESSAGES.EMPTY}`;
};

export const validateItemQuantities = (vals: string[]) => {
  if (vals.some((val) => !isPositive(Number(val))))
    return `item quantities ${ERROR_MESSAGES.NOT_POSITIVE}`;
};

export const validateItemPrices = (vals: string[]) => {
  if (vals.some((val) => !isPositive(Number(val))))
    return `item prices ${ERROR_MESSAGES.NOT_POSITIVE}`;
};

export const validateItemTotals = (vals: string[]) => {
  if (vals.some((val) => !isPositive(Number(val))))
    return `item totals ${ERROR_MESSAGES.NOT_POSITIVE}`;
};

export const getFieldErrors = (
  fields: InvoiceFormFields
): InvoiceFormFieldErrors | undefined => {
  const fieldErrors = {
    senderAddressStreet: validateSenderAddressStreet(
      fields.senderAddressStreet
    ),
    senderAddressCity: validateSenderAddressCity(fields.senderAddressCity),
    senderAddressPostCode: validateSenderAddressPostCode(
      fields.senderAddressPostCode
    ),
    senderAddressCountry: validateSenderAddressCountry(
      fields.senderAddressCountry
    ),
    clientName: validateClientName(fields.clientName),
    clientEmail: validateClientEmail(fields.clientEmail),
    clientAddressStreet: validateClientAddressStreet(
      fields.clientAddressStreet
    ),
    clientAddressCity: validateClientAddressCity(fields.clientAddressCity),
    clientAddressPostCode: validateClientAddressPostCode(
      fields.clientAddressPostCode
    ),
    clientAddressCountry: validateClientAddressCountry(
      fields.clientAddressCountry
    ),
    createdAt: validateCreatedAt(fields.createdAt),
    paymentTerms: validatePaymentTerms(fields.paymentTerms),
    description: validateDescription(fields.description),
    itemNames: validateItemNames(fields.itemNames),
    itemQuantities: validateItemQuantities(fields.itemQuantities),
    itemPrices: validateItemPrices(fields.itemPrices),
    itemTotals: validateItemTotals(fields.itemTotals),
  };

  return hasSomeTruthyValues(fieldErrors) ? fieldErrors : undefined;
};

export const getFormErrors = (
  fields: InvoiceFormFields,
  fieldErrors?: InvoiceFormFieldErrors
) => {
  const formErrors = [];
  if (fieldErrors) {
    const fieldErrorsArr = Object.values(fieldErrors).filter(Boolean);

    if (!isArrOfString(fieldErrorsArr))
      throw new Error('Not supported field error found');

    if (fieldErrorsArr.some((err) => err.includes(ERROR_MESSAGES.EMPTY)))
      formErrors.push('all fields must be added');
  }
  if (fields.itemNames.length === 0) formErrors.push('an item must be added');

  return formErrors.length > 0 ? formErrors : undefined;
};

export const parseInvoiceStatusParams = (statusParams: string[]) =>
  statusParams.map((status) => {
    switch (status) {
      case 'draft':
        return InvoiceStatus.DRAFT;
      case 'pending':
        return InvoiceStatus.PENDING;
      case 'paid':
        return InvoiceStatus.PAID;
      default:
        throw new Error(`Not supported status found: ${status}`);
    }
  });

export const getInvoiceSummaryStatus = (status: InvoiceStatus[]) => {
  if (
    status.length === 0 ||
    status.length === Object.values(InvoiceStatus).length
  )
    return 'total';
  else return status.join(' and ').toLowerCase();
};
