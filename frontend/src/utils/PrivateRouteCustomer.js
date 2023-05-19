import { Outlet } from 'react-router-dom'
import { CustomerValidation } from '../utils/tokenValidation'
import Pagenotfound from '../components/pagenotfound/Pagenotfound';


const PrivateRoutesCustomer = () => {
    const auth = CustomerValidation();
    if (auth.customer && auth.token) {
        return <Outlet />;
    } else if (auth.admin && !auth.token) {
        return <Outlet />;
    } else {
        return <Pagenotfound />
    }
};

export default PrivateRoutesCustomer