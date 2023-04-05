import { Outlet, Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
const PrivateRoutes = () => {
    let auth = { 
        token: false,
    };
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            auth.token = decoded.exp * 1000 > new Date().getTime();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        auth.token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes