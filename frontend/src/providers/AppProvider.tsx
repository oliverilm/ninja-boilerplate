import { RouteProvider } from "../router/router";
import { ThemeProvider } from "./ThemeProvider";

export function AppProvider() {
    return (
        <ThemeProvider>
            <RouteProvider />
        </ThemeProvider>
    )
}