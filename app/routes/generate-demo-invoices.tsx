import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { DEMO_INVOICES } from '~/data/demo-invoices';
import { db } from '~/utils/db.server';

export const loader = async (args: LoaderArgs) => {
  await Promise.all(
    DEMO_INVOICES.map((invoice) => {
      return db.invoice.create({ data: invoice });
    })
  );

  return redirect('/invoices');
};
