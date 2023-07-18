declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_CONNECT: string;
            PORT: string;
            DICTIONARY_API_KEY: string;
            TOKEN_SECRET: string;
        }
    }
}

export {};
