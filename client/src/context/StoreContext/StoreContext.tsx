import { createContext, FC, useContext } from 'react';
import RootStore from 'stores/RootStore';

const store = new RootStore();
const StoreContext = createContext<RootStore | undefined>(undefined);

export function useStore() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw new Error('useStore must be used within StoreContextProvider');
    }

    return context;
}

export const useLanguagesStore = () => useStore().languagesStore;

export const useWordsStore = () => useStore().wordsStore;

export const useDictionariesStore = () => useStore().dictionariesStore;

export const useAuthStore = () => useStore().authStore;

export const useUserStore = () => useStore().userStore;

export const StoreContextProvider: FC = (props) => {
    return <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>;
};
