import { InputBase, InputBaseProps } from '@mui/material';
import { FC } from 'react';
import styles from '../styles/Search.module.scss';
import SearchIcon from '@mui/icons-material/Search';

const Search: FC<InputBaseProps> = (props) => {
	return (
		<div className={styles.search}>
			<div className={styles.iconWrapper}>
				<SearchIcon />
			</div>
			<InputBase placeholder={props.placeholder} className={styles.input} onChange={props.onChange} />
		</div>
	);
};

export default Search;
