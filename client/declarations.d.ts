declare module '*.css';

declare module '*.scss';

declare module '@mui/material/styles' {
    interface Theme {
        typography: {
            fontSize: number;
        };
    }

    interface ThemeOptions {
        typography?: {
            fontSize?: number;
        };
    }
}
