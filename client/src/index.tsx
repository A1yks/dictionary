import { createRoot } from 'react-dom/client';
import App from './components/App';
import '@fontsource/roboto';
import { CssBaseline } from '@mui/material';
import { StoreContextProvider } from 'context/StoreContext';
import './styles/globals.scss';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <CssBaseline>
        <StoreContextProvider>
            <App />
        </StoreContextProvider>
    </CssBaseline>
);
