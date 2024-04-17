import { notifications } from '@mantine/notifications';
import axios, { AxiosResponse } from 'axios';

const PORT = 8000;
const BASE = 'http://0.0.0.0';

const authInstance = axios.create({
  baseURL: `${BASE}:${PORT}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

authInstance.interceptors.response.use((value) => value, (error) => {
  if (error?.response?.data?.message && error?.response?.data?.detail) {
    const errorData: { detail: string, message: string[]} = error?.response?.data;
    errorData.message.forEach((message) => {
      notifications.show({ title: errorData.detail, message, color: 'red' });
    });
  }
});
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
    google_profile: number;
    groups: number[]
    user_permissions: number[]
}

export function signUp(data: RegisterData): Promise<AxiosResponse<Profile>> {
  return authInstance.post('users/', data);
}

// -------------------------------------
export type AuthenticateData = {
    password: string;
    username: string;
}

export interface TokensResponse {
    access: string,
    refresh: string,
    username: string,
}
export function authenticate(data: AuthenticateData): Promise<AxiosResponse<TokensResponse>> {
  return authInstance.post('token/pair', data);
}

// -------------------------------------
export type VerifyData = {
    token: string;
}
export function verifyToken(data: VerifyData) {
  return authInstance.post('token/verify', data);
}

// -------------------------------------
export type RefreshData = {
    refresh: string;
}
export function refreshToken(data: RefreshData): Promise<AxiosResponse<TokensResponse>> {
  return authInstance.post('token/refresh', data);
}

// -------------------------------------
export function getProfile(): Promise<AxiosResponse<Profile>> {
  return authInstance.get('users/me', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access')}`,
    },
  });
}

// -------------------------------------

// eslint-disable-next-line camelcase
export function googleAuth(access_token: string): Promise<AxiosResponse<Omit<TokensResponse, 'username'>>> {
  // eslint-disable-next-line camelcase
  return authInstance.post('users/google', { access_token });
}
// eslint-disable-next-line camelcase
export function linkGoogleToAccount(access_token: string): Promise<AxiosResponse<unknown>> {
// eslint-disable-next-line camelcase
  return authInstance.post('users/google-link', { access_token }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access')}`,
    },
  });
}

// eslint-disable-next-line camelcase
export function unlinkGoogleToAccount(): Promise<AxiosResponse<unknown>> {
  // eslint-disable-next-line camelcase
  return authInstance.post('users/google-unlink', {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access')}`,
    },
  });
}
