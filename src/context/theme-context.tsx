import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

export interface ThemeTokens {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
}

const LIGHT: ThemeTokens = {
  background: '#fafafa',
  surface: '#ffffff',
  text: '#1a1a1a',
  textSecondary: '#777777',
  border: '#e6e6e6',
};

const DARK: ThemeTokens = {
  background: '#111112',
  surface: '#1e1e20',
  text: '#f5f5f5',
  textSecondary: '#a0a0a3',
  border: '#2e2e31',
};

interface ThemeContextValue {
  isDark: boolean;
  toggleTheme: () => void;
  tokens: ThemeTokens;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Defaults to the system color scheme; the header toggle overrides it for the rest of the session. */
export function AppThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [override, setOverride] = useState<boolean | null>(null);
  const isDark = override ?? systemScheme === 'dark';

  const value = useMemo<ThemeContextValue>(
    () => ({ isDark, toggleTheme: () => setOverride(!isDark), tokens: isDark ? DARK : LIGHT }),
    [isDark],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used within an AppThemeProvider');
  return ctx;
}
