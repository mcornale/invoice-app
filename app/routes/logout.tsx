import type { ActionFunctionArgs } from 'react-router';
import { redirect } from 'react-router';

import { destroyUserSession } from '~/utils/session.server';

export const action = async ({ request }: ActionFunctionArgs) =>
  destroyUserSession(request);

export const loader = async () => redirect('/');
