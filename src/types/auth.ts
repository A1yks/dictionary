export type Token = string;

export interface TokenPayload {
    userId: string;
}

export interface AuthCookies {
    authToken: string;
}
