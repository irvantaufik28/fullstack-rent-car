import { Outlet, Navigate } from 'react-router-dom'
import { tokenValidation } from './tokenValidation';

const PrivateRoutes = () => {
   const auth = tokenValidation()
    return (
        auth.token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes