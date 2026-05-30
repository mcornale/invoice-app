import type { LinksFunction, LoaderFunctionArgs } from 'react-router';
import { Outlet } from 'react-router';
import styles from './styles.css?url';
import { requireUserSession } from '~/utils/session.server';
import { Form, links as formLinks } from '~/components/ui/form';
import { Button, links as buttonLinks } from '~/components/ui/button';
import { ExitIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Theme, useTheme } from '~/utils/theme';

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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserSession(request);

  return {};
};

export default function AppRoute() {
  const [theme, setTheme] = useTheme();

  function toggleTheme() {
    setTheme((prevTheme) =>
      prevTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    );
  }

  return (
    <div className='app'>
      <header className='app-header'>
        <img className='logo' src='/logo.svg' alt='logo' />
        <div className='app-header-actions'>
          <Button onClick={toggleTheme} variant='tertiary-gray' iconOnly>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            <VisuallyHidden.Root>Toggle Theme</VisuallyHidden.Root>
          </Button>
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
