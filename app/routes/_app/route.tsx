import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import styles from './styles.css';
import { requireUserSession } from '~/utils/session.server';
import { Form, links as formLinks } from '~/components/ui/form';
import { Button, links as buttonLinks } from '~/components/ui/button';
import { ExitIcon } from '@radix-ui/react-icons';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

export const links: LinksFunction = () => {
  return [
    ...formLinks(),
    ...buttonLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserSession(request);
  return json({ userId });
};

export default function AppRoute() {
  return (
    <div className='app'>
      <header className='app-header'>
        <img className='logo' src='/logo.svg' alt='logo' />
        <div className='app-header-actions'>
          <Form action='/logout' method='post'>
            <Button
              variant='tertiary-gray'
              type='submit'
              className='logout-button'
            >
              <ExitIcon />
              <VisuallyHidden.Root>Logout</VisuallyHidden.Root>
            </Button>
          </Form>
        </div>
      </header>
      <main className='app-main'>
        <div className='app-outlet-wrapper'>
          <div className='app-outlet'>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
