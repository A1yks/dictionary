import { AppBar, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';

// TODO add navigation

const Navbar: FC<{}> = () => {
	return (
		<AppBar position="static">
			<Toolbar variant="dense">
				<Typography variant="h6" component="div">
					Navbar
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
