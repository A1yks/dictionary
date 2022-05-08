import ReactDOM from 'react-dom';
import App from './components/App';
import '@fontsource/roboto';
import { CssBaseline } from '@mui/material';
import './styles/globals.scss';
import { AppContextProvider } from './context/AppContext';
import { LearnContextProvider } from './context/LearnContext';

ReactDOM.render(
	<CssBaseline>
		<AppContextProvider>
			<LearnContextProvider>
				<App />
			</LearnContextProvider>
		</AppContextProvider>
	</CssBaseline>,
	document.getElementById('root')
);
