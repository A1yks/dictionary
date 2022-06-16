import { AppBar, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { FC } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import styles from './Navbar.module.scss';
import { openDialogHandler } from '../../UI/CustomDialog/controllers';
import { DialogNames } from 'components/dialogs/Dialog.types';
import { observer } from 'mobx-react-lite';
import LogoutConfirmationDialog from 'components/dialogs/LogoutConfirmationDialog';
import useNavbar from './hooks/useNavbar';

const Navbar: FC = () => {
    const { username, showBackArrow, backClickHandler } = useNavbar();

    return (
        <AppBar position="static" className={styles.appBar}>
            <Toolbar variant="dense">
                {showBackArrow && (
                    <Tooltip title="Назад">
                        <IconButton onClick={backClickHandler} className={styles.backArrowBtn}>
                            <ArrowBackIcon className={styles.icon} />
                        </IconButton>
                    </Tooltip>
                )}
                <div className={styles.usernameWrapper}>
                    <PersonIcon className={styles.icon} />
                    <Typography variant="h6" component="div" ml={1}>
                        {username}
                    </Typography>
                </div>
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
