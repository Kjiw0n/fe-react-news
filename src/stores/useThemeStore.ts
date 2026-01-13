import { create } from 'zustand';
import { ThemeState } from '@/constants/types/type';

interface ThemeStore {
  theme: ThemeState;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: ThemeState.LIGHT,
  toggleTheme: () =>
    set((state) => {
      const nextTheme =
        state.theme === ThemeState.LIGHT ? ThemeState.DARK : ThemeState.LIGHT;
      document.documentElement.setAttribute('data-theme', nextTheme);
      return { theme: nextTheme };
    }),
}));
