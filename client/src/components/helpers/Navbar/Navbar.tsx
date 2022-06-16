import { AppBar, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { useUserStore } from 'context/StoreContext';
import { FC } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import styles from './Navbar.module.scss';
import { openDialogHandler } from '../../UI/CustomDialog/controllers';
import { DialogNames } from 'components/dialogs/Dialog.types';
import { observer } from 'mobx-react-lite';
import LogoutConfirmationDialog from 'components/dialogs/LogoutConfirmationDialog';

const Navbar: FC = () => {
    const { user } = useUserStore();

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <PersonIcon className={styles.icon} />
                <Typography variant="h6" component="div" ml={1}>
                    {user?.login}
                </Typography>
                <div className={styles.iconsWrapper}>
                    <Tooltip title="Настройки">
                        <IconButton className={styles.iconBtn}>
                            <SettingsIcon className={styles.icon} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Выход">
                        <IconButton className={styles.iconBtn} onClick={openDialogHandler(DialogNames.LOGOUT_DIALOG)}>
                            <LogoutIcon className={styles.icon} />
                        </IconButton>
                    </Tooltip>
                </div>
            </Toolbar>

            <LogoutConfirmationDialog />
        </AppBar>
    );
};

export default observer(Navbar);
