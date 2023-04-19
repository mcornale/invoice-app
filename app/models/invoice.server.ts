import type { InvoiceStatus } from '@prisma/client';
import type { Invoice, User } from '@prisma/client';
import { db } from '~/utils/db.server';

export type InvoiceWithoutId = Omit<Invoice, 'id'>;

export async function createInvoice(data: InvoiceWithoutId) {
  return db.invoice.create({ data });
}

export async function deleteInvoice(id: Invoice['id']) {
  return db.invoice.delete({ where: { id } });
}

export async function getInvoiceList(
  status: InvoiceStatus[],
  userId: User['id']
) {
  return db.invoice.findMany({
    select: {
      id: true,
      displayId: true,
      clientName: true,
      paymentDue: true,
      status: true,
      total: true,
    },
    where: {
      userId,
      ...(status.length > 0 && { OR: status.map((s) => ({ status: s })) }),
    },
  });
}

export async function getInvoice(invoiceId: Invoice['id']) {
  return db.invoice.findUnique({ where: { id: invoiceId } });
}
