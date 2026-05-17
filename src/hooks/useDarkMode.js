import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('cv-theme') !== 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('cv-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return {
    isDark,
    toggleDarkMode: () => setIsDark((value) => !value),
  };
}
