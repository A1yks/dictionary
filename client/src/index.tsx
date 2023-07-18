import { createRoot } from 'react-dom/client';
import App from './components/App';
import '@fontsource/roboto';
import { CssBaseline } from '@mui/material';
import { StoreContextProvider } from 'context/StoreContext';
import './styles/globals.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

const container = document.getElementById('root');
const root = createRoot(container!);
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

root.render(
    <CssBaseline>
        <StoreContextProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </StoreContextProvider>
    </CssBaseline>
);
