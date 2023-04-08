import type { LinksFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import invoiceStylesUrl from '~/styles/invoices.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: invoiceStylesUrl,
    },
  ];
};

export default function InvoicesRoute() {
  return (
    <div className='container'>
      <header className='header'>
        <img src='/logo.svg' alt='logo' />
      </header>
      <main className='main'>
        <Outlet />
      </main>
    </div>
  );
}
