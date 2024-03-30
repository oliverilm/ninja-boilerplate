import { Button, Modal, TextInput, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import useForm from "../../hooks/useForm";
import { useUserStore } from "../../store";
import { authenticate } from "../../api/auth";

interface LoginModalProps {
    opened: boolean,
    onClose: () => void;
    noAccountCallback: () => void;
}

export function LoginModal({ opened, onClose, noAccountCallback}: LoginModalProps) {
    const isMobile = useMediaQuery('(max-width: 50em)');
    const {parseTokens} = useUserStore()
    const form = useForm({
        initialValues: {
            username: "",
            password: ""
        },
        validate: {
            username: useForm.validators.skip,
            password: useForm.validators.skip
        }
    })

    const onSubmit = async (formValues: typeof form["values"]) => {
        const tokens = await authenticate(formValues)
        if (tokens) {
            parseTokens(tokens.data)
            // TODO: if error, parse this aswell
            onClose()
        }
    }
    return (
        <Modal opened={opened} onClose={onClose} title="Authentication" centered
            fullScreen={isMobile}
            transitionProps={{ transition: 'slide-up', duration: 200 }}
          >
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <TextInput {...form.getInputProps("username")} label="Email" />
                    <TextInput {...form.getInputProps("password")}label="Password" type="password" />

                    <Button type="submit" mt="lg" w={"100%"}>Submit</Button>

                    <Text mt="sm" onClick={noAccountCallback} 
                        style={{ cursor: "pointer" }} 
                        size='sm' 
                        c="dimmed" 
                        td="underline">
                            Don't have an account? Sign up
                    </Text>
                </form>
            </Modal>
    )
}