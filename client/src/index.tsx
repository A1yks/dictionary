import ReactDOM from 'react-dom';
import App from './components/App';
import '@fontsource/roboto';
import { CssBaseline } from '@mui/material';
import { StoreContextProvider } from 'context/StoreContext';
import './styles/globals.scss';

ReactDOM.render(
    <CssBaseline>
        <StoreContextProvider>
            <App />
        </StoreContextProvider>
    </CssBaseline>,
    document.getElementById('root')
);
