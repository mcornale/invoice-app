import { Outlet } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import styles from './styles.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
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
