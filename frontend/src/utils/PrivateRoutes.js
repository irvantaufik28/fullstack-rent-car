import { Outlet, Navigate } from 'react-router-dom'
import { adminValidation } from './tokenValidation';
import Pagenotfound from '../components/pagenotfound/Pagenotfound';


const PrivateRoutes = () => {
    const auth = adminValidation();

    if (auth.admin && auth.token) {
        return <Outlet />;
    } else if (auth.admin && !auth.token) {
        return <Navigate to='/login' />
    } else {
        return <Pagenotfound />
    }
};

export default PrivateRoutes
