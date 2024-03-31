import axios, { AxiosResponse } from "axios";

const authInstance = axios.create({ baseURL: "http://0.0.0.0:8765/api/", headers: {
    "Content-Type": "application/json"
} })

// -------------------------------------
export type RegisterData = {
    email: string;
    password: string;
}

export interface Profile {
    id: number
    last_login: string
    is_superuser: boolean
    username: string
    first_name: string
    last_name: string
    email: string
    is_staff: boolean
    is_active: boolean
    date_joined: string
    groups: number[]
    user_permissions: number[]
}

export function signUp(data: RegisterData): Promise<AxiosResponse<Profile>> {
    return axios.post(`http://0.0.0.0:8765/api/users/`, data)
}

// -------------------------------------
export type AuthenticateData = {
    password: string;
    username: string;
}

export interface TokensResponse {
    access: string,
    refresh: string,
}
export function authenticate(data: AuthenticateData): Promise<AxiosResponse<TokensResponse>> {
    return authInstance.post(`token/pair`, data)
}

// -------------------------------------
export type VerifyData = {
    token: string;
}
export function verifyToken(data: VerifyData) {
    return authInstance.post(`token/verify`, data)
}

// -------------------------------------
export type RefreshData = {
    refresh: string;
}
export function refreshToken(data: RefreshData): Promise<AxiosResponse<TokensResponse>> {
    return authInstance.post(`token/refresh`, data)
}

// -------------------------------------


export function getProfile(): Promise<AxiosResponse<Profile>> {
    return authInstance.get("users/me", {headers: {
        "Authorization": "Bearer " + localStorage.getItem("access")
    }})
}

// -------------------------------------

