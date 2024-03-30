import { Button, Modal, TextInput, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import useForm from "../../hooks/useForm";
import { authenticate, signUp } from "../../api/auth";
import { useUserStore } from "../../store";

interface LoginModalProps {
    opened: boolean,
    onClose: () => void;
    haveAccountCallback: () => void;
}

export function SignupModal({ opened, onClose, haveAccountCallback}: LoginModalProps) {
    const isMobile = useMediaQuery('(max-width: 50em)');
    const {parseTokens} = useUserStore()
    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            passwordConfirm: "",
        },
        validate: {
            email: useForm.validators.skip,
            password: useForm.validators.skip,
            passwordConfirm: useForm.validators.skip
        }
    })

    const onSubmit = async ({email, password}: typeof form["values"]) => {
        const response = await signUp({email, password})
        if (response) {
            const tokens = await authenticate({ username: email, password })
            if (tokens) {
                parseTokens(tokens.data)
                onClose()
            }
        }
        console.log(response)
    }
    return (
        <Modal opened={opened} onClose={onClose} title="Authentication" centered
            fullScreen={isMobile}
            transitionProps={{ transition: 'slide-up', duration: 200 }}
          >
                <form onSubmit={form.onSubmit(onSubmit)}>
                    {/* Modal content */}
                    <TextInput {...form.getInputProps("email")} label="Email" />
                    <TextInput {...form.getInputProps("password")} label="Password" type="password" />
                    <TextInput {...form.getInputProps("passwordConfirm")} label="Password again" type="password" />

                    <Button type="submit" mt="lg" w={"100%"}>Submit</Button>

                    <Text mt="sm" onClick={haveAccountCallback} 
                        style={{ cursor: "pointer" }} 
                        size='sm' 
                        c="dimmed" 
                        td="underline">
                            Already have an account? Log in
                    </Text>
                </form>
            </Modal>
    )
}