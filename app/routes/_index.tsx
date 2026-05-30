import type { LoaderFunctionArgs } from 'react-router';
import { redirect } from 'react-router';

export const loader = ({ request }: LoaderFunctionArgs) => {
  return redirect('/invoices');
};
