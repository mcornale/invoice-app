import type { ActionFunctionArgs } from 'react-router';
import { themeSessionResolver } from '../utils/session.server';
import { isTheme } from '../utils/theme';

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await themeSessionResolver(request);
  const { theme } = await request.json();

  if (!theme) {
    return Response.json(
      { success: true },
      { headers: { 'Set-Cookie': await session.destroy() } }
    );
  }

  if (!isTheme(theme)) {
    return Response.json({
      success: false,
      message: `theme value of ${theme} is not a valid theme.`,
    });
  }

  session.setTheme(theme);
  return Response.json(
    { success: true },
    { headers: { 'Set-Cookie': await session.commit() } }
  );
};
