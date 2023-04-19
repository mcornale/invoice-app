import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { DEMO_INVOICES } from '~/data/demo-invoices';
import { createInvoice } from '~/models/invoice.server';
import { requireUser } from '~/utils/session.server';

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUser(request);

  await Promise.all(
    DEMO_INVOICES.map(async (invoice) => {
      return createInvoice({ userId, ...invoice });
    })
  );

  return redirect('/invoices');
};
