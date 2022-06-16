import { FC, useEffect, useState } from 'react';
import Navbar from 'components/helpers/Navbar';
import { useAuthStore, useUserStore } from 'context/StoreContext';
import PageLoader from 'components/UI/PageLoader';
import { observer } from 'mobx-react-lite';
import Router from 'components/helpers/Router';

const App: FC = () => {
    // const { fetchLanguages, languagesLoaded } = useLanguagesStore();
    const { isLoggedIn } = useAuthStore();
    const { getCurrentUser, loading: gettingUser, error } = useUserStore();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // fetchLanguages();
        getCurrentUser();
    }, [getCurrentUser]);

    useEffect(() => {
        if (isLoggedIn || (error !== '' && !gettingUser)) {
            setLoading(false);
        }
    }, [gettingUser, isLoggedIn, error]);

    if (loading)
        return (
            <div className="app">
                <PageLoader />
            </div>
        );

    return (
        <div className="app">
            {isLoggedIn && <Navbar />}
            <Router />
        </div>
    );
};

export default observer(App);
