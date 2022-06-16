import Navbar from 'components/helpers/Navbar';
import { FC } from 'react';

const NavbarLayout: FC = (props) => {
    return (
        <>
            <Navbar />
            {props.children}
        </>
    );
};

export default NavbarLayout;
