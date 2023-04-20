import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import styles from './styles.css';
import {
  getThemeFromSession,
  requireUserSession,
} from '~/utils/session.server';
import { Form, links as formLinks } from '~/components/ui/form';
import { Button, links as buttonLinks } from '~/components/ui/button';
import { ExitIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Input } from '~/components/ui/input';

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
  await requireUserSession(request);
  const theme = await getThemeFromSession(request);
  return json({ theme });
};

export default function AppRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className='app'>
      <header className='app-header'>
        <img className='logo' src='/logo.svg' alt='logo' />
        <div className='app-header-actions'>
          <Form method='post' action='/set-theme'>
            <Input
              type='hidden'
              name='theme'
              value={data.theme === 'light' ? 'dark' : 'light'}
            />
            <Button variant='tertiary-gray' iconOnly>
              {data.theme && data.theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              <VisuallyHidden.Root>Toggle Theme</VisuallyHidden.Root>
            </Button>
          </Form>
          <Form action='/logout' method='post'>
            <Button variant='tertiary-gray' type='submit' iconOnly>
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
