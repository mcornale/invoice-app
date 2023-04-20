import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import {
  createThemeSession,
  getThemeFromSession,
} from '~/utils/session.server';

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const theme = await getThemeFromSession(request);

  const newTheme = theme === 'dark' ? 'light' : 'dark';
  const redirectTo = formData.get('redirectTo') as string;
  return createThemeSession(newTheme, redirectTo);
};

export const loader = async () => redirect('/');
