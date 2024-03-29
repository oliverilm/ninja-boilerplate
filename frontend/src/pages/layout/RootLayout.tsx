import { AppShell, Burger, Button, Text, Group, Modal, Skeleton, TextInput } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";

import { Outlet } from "react-router-dom";

export function RootLayout() {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    const [loginModalOpened, { toggle: toggleLogin }] = useDisclosure(false);
    const [signupModalOpened, { toggle: toggleSignup }] = useDisclosure(false);


    return (
        <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md" w={"100%"} justify='space-between'>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <div />

            <Group visibleFrom="sm" justify='flex-end'>
                <Button onClick={toggleLogin} variant="default">Log in</Button>
                <Button onClick={toggleSignup}>Sign up</Button>
            </Group>

          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          Navbar
          {Array(15)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            ))}
        </AppShell.Navbar>
        <AppShell.Main>
            <Modal opened={loginModalOpened} onClose={toggleLogin} title="Authentication" centered>
                {/* Modal content */}
                <TextInput label="Email" />
                <TextInput label="Password" type="password" />

                <Button mt="lg" w={"100%"}>Submit</Button>

                <Text mt="sm" onClick={() => {
                        toggleLogin()
                        toggleSignup()
                    }} 
                    style={{ cursor: "pointer" }} 
                    size='sm' 
                    c="dimmed" 
                    td="underline">
                        Don't have an account? Sign up
                    </Text>
            </Modal>

            <Modal opened={signupModalOpened} onClose={toggleSignup} title="Authentication" centered>
                {/* Modal content */}
                <TextInput label="Email" />
                <TextInput label="Password" type="password" />
                <TextInput label="Password again" type="password" />

                <Button mt="lg" w={"100%"}>Submit</Button>

            </Modal>

            <Outlet />
            
        </AppShell.Main>
      </AppShell>
    )
}