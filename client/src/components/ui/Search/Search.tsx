import { InputBase, InputBaseProps } from '@mui/material';
import { FC } from 'react';
import styles from './Search.module.scss';
import SearchIcon from '@mui/icons-material/Search';

const Search: FC<InputBaseProps> = (props) => {
    return (
        <div className={styles.search}>
            <div className={styles.iconWrapper}>
                <SearchIcon />
            </div>
            <InputBase {...props} className={styles.input} />
        </div>
    );
};

export default Search;
