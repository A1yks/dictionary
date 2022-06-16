declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_CONNECT: string;
            PORT: number;
            DICTIONARY_API_KEY: string;
            TOKEN_SECRET: string;
        }
    }
}

export {};
