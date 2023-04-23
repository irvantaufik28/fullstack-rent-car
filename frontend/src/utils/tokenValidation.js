import jwtDecode from 'jwt-decode';
import { refreshToken } from '../features/authSlice';
import { useDispatch } from 'react-redux';

export const TokenValidation = () => {
  const dispatch = useDispatch()

 
  let auth = {
    token: false,
   
  };
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < new Date().getTime()) {
        const get_refresh_token = localStorage.getItem('refresh_token');
        let refresh_token = {
          refresh_token: get_refresh_token,
        };
        dispatch(refreshToken(refresh_token)).unwrap();
        auth.token = true;
      } else {
        auth.token = true;
      }
    } catch (error) {
      console.error(error);
    }
  }
 
  return auth;
};

export const AdminValidation = () => {
  const dispatch = useDispatch()
  let auth = {
    token: false,
    admin: false
  }
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const decoded = jwtDecode(token)
      if (decoded.exp * 1000 < new Date().getTime()) {
        const get_refresh_token = localStorage.getItem('refresh_token')
        let refresh_token = {
          refresh_token: get_refresh_token
        }
        dispatch(refreshToken(refresh_token)).unwrap()
        auth.token = true
      };
      if (decoded.role_name === 'ADMIN') {
        auth.admin = true
      }
    } catch (error) {
      console.error(error);
    }
  }
  return auth;
}