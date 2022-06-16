import { useAuthStore } from 'context/StoreContext';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import ConfirmationDialog from '../ConfirmationDialog';
import { DialogNames } from '../Dialog.types';

const LogoutConfirmationDialog: FC = () => {
    const { logout } = useAuthStore();

    function confirmHandler() {
        logout();
    }

    return (
        <ConfirmationDialog
            id={DialogNames.LOGOUT_DIALOG}
            content="Вы действительно хотите выйти из аккаунта?"
            onConfirm={confirmHandler}
            // loading={loading}
        />
    );
};

export default observer(LogoutConfirmationDialog);
