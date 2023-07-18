import { FC, useEffect } from 'react';
import { useAuthStore, useUserStore } from 'context/StoreContext';
import PageLoader from 'components/UI/PageLoader';
import { observer } from 'mobx-react-lite';
import Router from 'components/helpers/Router';
import UserAPI from 'api/UserAPI';
import { useQuery } from 'react-query';

const App: FC = () => {
    const { isLoggedIn } = useAuthStore();
    const userStore = useUserStore();
    const { data, isLoading, isError } = useQuery('userData', UserAPI.getUser);

    useEffect(() => {
        if (data !== undefined) {
            userStore.setUser(data);
        }
    }, [data, userStore]);

    if (!isLoggedIn && (!isError || isLoading))
        return (
            <div className="app">
                <PageLoader />
            </div>
        );

    return (
        <div className="app">
            <Router />
        </div>
    );
};

export default observer(App);
