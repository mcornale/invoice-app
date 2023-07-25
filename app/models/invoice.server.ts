import type { InvoiceStatus, Invoice, User, Prisma } from '@prisma/client';
import { db } from '~/utils/db.server';

type EditInvoiceParams = {
  id: Invoice['id'];
} & Prisma.InvoiceUpdateArgs['data'];

export async function createInvoice(data: Prisma.InvoiceCreateArgs['data']) {
  return db.invoice.create({ data });
}

export async function editInvoice({ id, ...data }: EditInvoiceParams) {
  return db.invoice.update({ where: { id }, data });
}

export async function markInvoiceAsPaid(
  id: Invoice['id'],
  status: InvoiceStatus
) {
  return db.invoice.update({ where: { id }, data: { status } });
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
