import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import { destroyUserSession } from '~/utils/session.server';

export const action = async ({ request }: ActionArgs) =>
  destroyUserSession(request);

export const loader = async () => redirect('/');
