import { SxProps } from '@mui/material';
import { ReactNode } from 'react';

declare global {
    type MaybePromise<T> = T | Promise<T>;

    namespace Props {
        type WithSx = {
            sx?: SxProps;
        };

        type WithChildren = {
            children: ReactNode;
        };
    }
}

export {};
