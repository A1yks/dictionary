import { ReactNode } from 'react';

export type PrivateRouteProps = {
    fallbackTo?: string;
    children: ReactNode;
};
