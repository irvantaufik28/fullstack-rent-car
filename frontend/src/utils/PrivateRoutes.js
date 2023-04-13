import { Outlet, Navigate } from 'react-router-dom'
import { AdminValidation } from './tokenValidation';
import Pagenotfound from '../components/pagenotfound/Pagenotfound';


const PrivateRoutes = () => {
    const auth = AdminValidation();

    if (auth.admin && auth.token) {
        return <Outlet />;
    } else if (auth.admin && !auth.token) {
        return <Outlet />;
        // return <Navigate to='/login' />
    } else {
        return <Pagenotfound />
    }
};

export default PrivateRoutes
