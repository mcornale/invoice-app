import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { isString } from './checkers';
import { createThemeSessionResolver } from 'remix-themes';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

export const userStorage = createCookieSessionStorage({
  cookie: {
    name: 'invoice_app_user',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await userStorage.getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await userStorage.commitSession(session),
    },
  });
}

function getUserSession(request: Request) {
  const cookie = request.headers.get('Cookie');
  return userStorage.getSession(cookie);
}

export async function getUserIdFromSession(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || !isString(userId)) return;

  return userId;
}

export async function requireUserSession(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId) {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return session;
}

export async function destroyUserSession(request: Request) {
  const session = await getUserSession(request);
  return redirect('/login', {
    headers: {
      'Set-Cookie': await userStorage.destroySession(session),
    },
  });
}

export const themeStorage = createCookieSessionStorage({
  cookie: {
    name: 'invoice_app_theme',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
  },
});

export const themeSessionResolver = createThemeSessionResolver(themeStorage);
