export interface LoginReq {
    login: string;
    password: string;
}

export interface RegisterReq {
    login: string;
    passwords: [string, string];
}
