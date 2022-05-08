import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { DictionariesContextProvider } from '../context/DictionariesContext';
import { WordsContextProvider } from '../context/WordsContexts';
import Dictionaries from './Dictionaries';
import Navbar from './Navbar';
import PageLoader from './PageLoader';
import Words from './words/Words';
// import Navbar from './Navbar';

const App: FC<{}> = () => {
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
