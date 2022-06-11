import { FC, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dictionaries from 'components/pages/Dictionaries';
import Navbar from 'components/UI/Navbar';
import Words from 'components/pages/Words';
import { useLanguagesStore } from 'context/StoreContext';
import PageLoader from 'components/UI/PageLoader';
import { observer } from 'mobx-react-lite';

const App: FC = () => {
    const { fetchLanguages, languagesLoaded } = useLanguagesStore();

    useEffect(() => {
        fetchLanguages();
    }, [fetchLanguages]);

    if (!languagesLoaded)
        return (
            <div className="app">
                <PageLoader />;
            </div>
        );

    return (
        <div className="app">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Dictionaries />} />
                    <Route path="/language/:langId" element={<Words />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default observer(App);
