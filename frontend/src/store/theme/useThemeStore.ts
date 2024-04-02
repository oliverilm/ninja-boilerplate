import { create } from 'zustand';

interface ThemeStoreBase {
    theme: 'light' | 'dark',
}

const initialState: ThemeStoreBase = {
  theme: 'light',
};

export const useThemeStore = create<{
    toggleTheme:() => void;
      } & ThemeStoreBase >((set) => ({
        ...initialState,

        toggleTheme: () => set((state) => ({ ...state, theme: state.theme === 'light' ? 'dark' : 'light' })),
      }));
