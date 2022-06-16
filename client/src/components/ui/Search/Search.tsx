import { Box, InputBase, InputBaseProps } from '@mui/material';
import { FC } from 'react';
import styles from './Search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import c from 'classnames';

const Search: FC<InputBaseProps> = (props) => {
    const { className, fullWidth, ...restProps } = props;

    return (
        <Box className={c(styles.search, className)} sx={{ width: fullWidth ? '100%' : 'auto' }}>
            <div className={styles.iconWrapper}>
                <SearchIcon />
            </div>
            <InputBase {...restProps} className={styles.input} />
        </Box>
    );
};

export default Search;
