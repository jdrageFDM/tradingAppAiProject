export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'ai-trading-theme';
export const PREFERENCES_STORAGE_KEY = 'ai-trading-preferences';

export const resolveThemePreference = (): Theme => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  const rawPreferences = localStorage.getItem(PREFERENCES_STORAGE_KEY);
  if (rawPreferences) {
    try {
      const parsed = JSON.parse(rawPreferences);
      if (parsed.theme === 'light' || parsed.theme === 'dark') {
        return parsed.theme;
      }
    } catch {
      // Ignore malformed stored preferences and use the browser preference.
    }
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }

  return 'dark';
};

export const persistTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  try {
    const storedPreferences = localStorage.getItem(PREFERENCES_STORAGE_KEY);
    if (storedPreferences) {
      const parsed = JSON.parse(storedPreferences);
      localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify({ ...parsed, theme }));
    }
  } catch {
    localStorage.removeItem(PREFERENCES_STORAGE_KEY);
  }
};