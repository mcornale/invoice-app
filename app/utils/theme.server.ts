import type { SessionStorage } from "react-router";
import { isTheme } from "./theme";
import type { Theme } from "./theme";

export function createThemeSessionResolver(
  cookieThemeSession: SessionStorage
) {
  return async (request: Request) => {
    const session = await cookieThemeSession.getSession(
      request.headers.get("Cookie")
    );
    return {
      getTheme: (): Theme | null => {
        const themeValue = session.get("theme");
        return isTheme(themeValue) ? themeValue : null;
      },
      setTheme: (theme: Theme) => session.set("theme", theme),
      commit: () => cookieThemeSession.commitSession(session),
      destroy: () => cookieThemeSession.destroySession(session),
    };
  };
}
