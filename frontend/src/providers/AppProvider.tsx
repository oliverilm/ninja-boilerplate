import { RouteProvider } from '../router/router';
import { GoogleProvider } from './GoogleProvider';
import { ThemeProvider } from './ThemeProvider';

export function AppProvider() {
  return (
    <ThemeProvider>
      <GoogleProvider>
        <RouteProvider />
      </GoogleProvider>
    </ThemeProvider>
  );
}
