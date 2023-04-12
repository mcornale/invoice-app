import { Outlet } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import invoicesStylesUrl from '~/styles/invoices.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: invoicesStylesUrl,
    },
  ];
};

export default function InvoicesRoute() {
  return (
    <div className='invoices-container'>
      <Outlet />
    </div>
  );
}
