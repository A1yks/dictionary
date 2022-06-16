import { useAuthStore } from 'context/StoreContext';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Navigate } from 'react-router';
import { PrivateRouteProps } from './PrivateRoute.types';

const PrivateRoute: FC<PrivateRouteProps> = (props) => {
    const { isLoggedIn } = useAuthStore();

    return isLoggedIn ? <>{props.children}</> : <Navigate to={props.fallbackTo || '/login'} />;
};

export default observer(PrivateRoute);
