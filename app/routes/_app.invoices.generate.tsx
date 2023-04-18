import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { demoInvoices } from '~/assets/data';
import { db } from '~/utils/db.server';

export const loader = async (args: LoaderArgs) => {
  await Promise.all(
    demoInvoices.map((invoice) => {
      return db.invoice.create({ data: invoice });
    })
  );

  return redirect('/invoices');
};
