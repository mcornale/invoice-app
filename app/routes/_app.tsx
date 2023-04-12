import type { LinksFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import appStylesUrl from '~/styles/app.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: appStylesUrl,
    },
  ];
};

export default function AppRoute() {
  return (
    <div className='app'>
      <header className='app-header'>
        <img src='/logo.svg' alt='logo' />
      </header>
      <main className='app-main'>
        <div className='app-outlet'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
