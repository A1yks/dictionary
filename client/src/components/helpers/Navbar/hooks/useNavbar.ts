import { useUserStore } from 'context/StoreContext';
import { useLocation, useNavigate } from 'react-router';

function useNavbar() {
    const { user } = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();
    const showBackArrow = location.pathname !== '/';
    const username = user?.login;

    function backClickHandler() {
        navigate(-1);
    }

    return { username, showBackArrow, backClickHandler };
}

export default useNavbar;
