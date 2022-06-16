import Dictionaries from 'components/pages/Dictionaries';
import Auth from 'components/pages/Auth';
import Words from 'components/pages/Words';
import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { observer } from 'mobx-react-lite';

const Router: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Auth variant="login" />} />
                <Route path="/register" element={<Auth variant="register" />} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Dictionaries />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/language/:langId"
                    element={
                        <PrivateRoute>
                            <Words />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default observer(Router);
