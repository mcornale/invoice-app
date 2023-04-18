import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import { logoutUser } from '~/utils/session.server';

export const action = async ({ request }: ActionArgs) => logoutUser(request);

export const loader = async () => redirect('/');
