import axios from "axios";

const authInstance = axios.create({ baseURL: "" })

export function signUp(data: unknown) {
    return authInstance.post(``, data)
}

export function authenticate(data: unknown) {
    return authInstance.post(``, data)
}

export function getProfile() {
    return authInstance.get("")
}


