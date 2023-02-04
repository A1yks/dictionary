import Dictionaries from 'components/pages/Dictionaries';
import Auth from 'components/pages/Auth';
import Words from 'components/pages/Words';
import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from 'context/StoreContext';

const Router: FC = () => {
    const { isLoggedIn } = useAuthStore();

    return (
        <BrowserRouter>
            {isLoggedIn ? (
                <Routes>
                    <Route path="/" element={<Dictionaries />} />
                    <Route path="/language/:langId" element={<Words />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path="/login" element={<Auth variant="login" />} />
                    <Route path="/register" element={<Auth variant="register" />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            )}
        </BrowserRouter>
    );
};

export default observer(Router);
