import { FC } from 'react';
import { CircularProgress } from '@mui/material';
import styles from '../styles/PageLoader.module.scss';

const PageLoader: FC<{}> = () => {
	return (
		<div className={styles.loader}>
			<CircularProgress />
		</div>
	);
};

export default PageLoader;
