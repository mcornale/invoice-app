import { InvoiceStatus } from '@prisma/client';
import type { Invoice, InvoiceAddress } from '@prisma/client';
import type { InvoiceFormFields } from '~/components/invoice-form';
import {
  getInvoiceDisplayId,
  getInvoiceItems,
  getInvoicePaymentDue,
} from '~/helpers/invoice';
import { db } from '~/utils/db.server';
import { parseDate } from '~/utils/parsers';

export { InvoiceStatus };
export type { Invoice, InvoiceAddress };
export type InvoiceWithoutId = Omit<Invoice, 'id'>;

export interface CreateInvoiceParams extends InvoiceFormFields {
  status: InvoiceStatus;
}

export async function createInvoice({
  status,
  ...fields
}: CreateInvoiceParams) {
  const displayId = getInvoiceDisplayId();
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
    createdAt instanceof Date
      ? getInvoicePaymentDue(createdAt, paymentTerms)
      : null;
  const items = getInvoiceItems({
    itemNames: fields.itemNames,
    itemQuantities: fields.itemQuantities,
    itemPrices: fields.itemPrices,
    itemTotals: fields.itemTotals,
  });

  const data = {
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

  return db.invoice.create({ data });
}

export async function deleteInvoice(id: Invoice['id']) {
  return db.invoice.delete({ where: { id } });
}
