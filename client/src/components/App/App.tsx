import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppContext } from 'context/AppContext';
import { DictionariesContextProvider } from 'context/DictionariesContext';
import { WordsContextProvider } from 'context/WordsContext';
import Dictionaries from 'components/pages/Dictionaries';
import Navbar from 'components/ui/Navbar';
import PageLoader from 'components/ui/PageLoader';
import Words from 'components/pages/Words';

const App: FC = () => {
    const { languagesLoaded } = useAppContext();

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
                    <Route
                        path="/"
                        element={
                            <DictionariesContextProvider>
                                <Dictionaries />
                            </DictionariesContextProvider>
                        }
                    />
                    <Route
                        path="/language/:langId"
                        element={
                            <WordsContextProvider>
                                <Words />
                            </WordsContextProvider>
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
