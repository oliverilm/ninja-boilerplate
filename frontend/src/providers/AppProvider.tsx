import { RouteProvider } from "../router/router";
import { System } from "../system/System";
import { ThemeProvider } from "./ThemeProvider";

export function AppProvider() {
    return (
        <ThemeProvider>
            <System />
            <RouteProvider />
        </ThemeProvider>
    )
}