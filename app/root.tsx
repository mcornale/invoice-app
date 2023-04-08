import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import globalStylesUrl from '~/styles/global.css';
import badgeStylesUrl from '~/styles/badge.css';
import buttonStylesUrl from '~/styles/button.css';
import textStylesUrl from '~/styles/text.css';
import inputStylesUrl from '~/styles/input.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: badgeStylesUrl,
    },
    {
      rel: 'stylesheet',
      href: globalStylesUrl,
    },
    {
      rel: 'stylesheet',
      href: buttonStylesUrl,
    },
    {
      rel: 'stylesheet',
      href: textStylesUrl,
    },
    {
      rel: 'stylesheet',
      href: inputStylesUrl,
    },
  ];
};

export default function App() {
  return (
    <html lang='en'>
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
