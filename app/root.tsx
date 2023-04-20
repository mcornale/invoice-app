import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import globalStyles from '~/styles/global.css';
import designSystemStyles from '~/styles/design-system.css';
import { getThemeFromSession } from './utils/session.server';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: globalStyles,
    },
    {
      rel: 'stylesheet',
      href: designSystemStyles,
    },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  const theme = await getThemeFromSession(request);
  return json({ theme });
};

export default function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <html lang='en' className={`${data.theme ?? ''} `}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
          rel='stylesheet'
        ></link>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
