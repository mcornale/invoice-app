import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { isString } from '~/utils/checkers';
import { createThemeSession } from '~/utils/session.server';

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const theme = formData.get('theme');
  if (!isString(theme)) throw new Error(`Cannot set theme: ${theme}`);

  const redirectTo = formData.get('redirectTo') as string;
  return createThemeSession(theme, redirectTo);
};

export const loader = async () => redirect('/');
