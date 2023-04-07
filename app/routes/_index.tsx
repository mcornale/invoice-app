import type { V2_MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }];
};

export default function Index() {
  return (
    <ul>
      <li>
        <Link to='login'>Login Route</Link>
      </li>
      <li>
        <Link to='invoices'>Invoices Route</Link>
      </li>
      <li>
        <Link to='invoices/some-invoice-id'>Invoice Route</Link>
      </li>
      <li>
        <Link to='invoices/new'>New Invoice Route</Link>
      </li>
      <li>
        <Link to='invoices/edit'>Edit Invoice Route</Link>
      </li>
    </ul>
  );
}
