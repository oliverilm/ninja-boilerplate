import { MantineProvider } from '@mantine/core';
import { theme } from '../theme/theme';
import '@mantine/core/styles.css';
import { useThemeStore } from '../store/theme/useThemeStore';

interface Props {
    children: React.ReactNode
}

export function ThemeProvider({ children }: Props) {
  const { theme: activeTheme } = useThemeStore();
  return (
    <MantineProvider defaultColorScheme="light" forceColorScheme={activeTheme} theme={theme}>
      {children}
    </MantineProvider>
  );
}
