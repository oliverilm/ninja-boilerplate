import { MantineProvider } from "@mantine/core";
import { theme } from "../theme/theme";
import '@mantine/core/styles.css';

interface Props {
    children: React.ReactNode
}

export function ThemeProvider({children}: Props) {
    return (
        <MantineProvider theme={theme}>
            {children}
        </MantineProvider>
    )
}