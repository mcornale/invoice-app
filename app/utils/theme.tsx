import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

const themes: string[] = Object.values(Theme);

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && themes.includes(value);
}

type ThemeContextType = [
  Theme | null,
  (theme: Theme | null | ((prev: Theme | null) => Theme | null)) => void
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const prefersLightMQ = "(prefers-color-scheme: light)";

function getPreferredTheme(): Theme {
  return window.matchMedia(prefersLightMQ).matches ? Theme.LIGHT : Theme.DARK;
}

export function ThemeProvider({
  children,
  specifiedTheme,
  themeAction,
}: {
  children: ReactNode;
  specifiedTheme: Theme | null;
  themeAction: string;
}) {
  const [theme, setTheme] = useState<Theme | null>(() => {
    if (specifiedTheme) {
      return isTheme(specifiedTheme) ? specifiedTheme : null;
    }
    if (typeof window !== "object") return null;
    return getPreferredTheme();
  });

  const [themeDefinedBy, setThemeDefinedBy] = useState<"USER" | "SYSTEM">(
    specifiedTheme ? "USER" : "SYSTEM"
  );

  useEffect(() => {
    if (themeDefinedBy === "USER") return;
    const mq = window.matchMedia(prefersLightMQ);
    const handleChange = (ev: MediaQueryListEvent) => {
      setTheme(ev.matches ? Theme.LIGHT : Theme.DARK);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, [themeDefinedBy]);

  const handleThemeChange = useCallback(
    (value: Theme | null | ((prev: Theme | null) => Theme | null)) => {
      const nextTheme = typeof value === "function" ? value(theme) : value;

      if (nextTheme === null) {
        const preferredTheme = getPreferredTheme();
        setTheme(preferredTheme);
        setThemeDefinedBy("SYSTEM");
        fetch(themeAction, {
          method: "POST",
          body: JSON.stringify({ theme: null }),
        });
      } else {
        setTheme(nextTheme);
        setThemeDefinedBy("USER");
        fetch(themeAction, {
          method: "POST",
          body: JSON.stringify({ theme: nextTheme }),
        });
      }
    },
    [theme, themeAction]
  );

  const value = useMemo<ThemeContextType>(
    () => [theme, handleThemeChange],
    [theme, handleThemeChange]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

const clientThemeCode = `
(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersLightMQ)}).matches
    ? 'light'
    : 'dark';
  const cl = document.documentElement.classList;
  const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
  if (!themeAlreadyApplied) {
    cl.add(theme);
  }
  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    meta.content = theme === 'dark' ? 'dark light' : 'light dark';
  }
})();
`;

export function PreventFlashOnWrongTheme({
  ssrTheme,
}: {
  ssrTheme: boolean;
}) {
  const [theme] = useTheme();
  return (
    <>
      <meta
        name="color-scheme"
        content={theme === "light" ? "light dark" : "dark light"}
      />
      {ssrTheme ? null : (
        <script
          dangerouslySetInnerHTML={{ __html: clientThemeCode }}
          suppressHydrationWarning
        />
      )}
    </>
  );
}
