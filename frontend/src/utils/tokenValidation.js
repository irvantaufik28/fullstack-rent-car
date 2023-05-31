import jwtDecode from 'jwt-decode';
import { refreshToken } from '../features/authSlice';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

export const TokenValidation = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies(['token', 'refresh_token']);

  let auth = {
    token: false,

  };
  const token = cookies.token
  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < new Date().getTime()) {
        const get_refresh_token = cookies.refresh_token
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
  const [cookies] = useCookies(['token', 'refresh_token']);
  const dispatch = useDispatch()
  let auth = {
    token: false,
    admin: false
  }
  const token = cookies.token
  if (token) {
    try {
      const decoded = jwtDecode(token)
      if (decoded.exp * 1000 < new Date().getTime()) {
        const get_refresh_token = cookies.refresh_token
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


export const CustomerValidation = () => {
  const [cookies] = useCookies(['token', 'refresh_token']);
  const dispatch = useDispatch()
  let auth = {
    token: false,
    customer: false
  }
  const token = cookies.token
  if (token) {
    try {
      const decoded = jwtDecode(token)
      if (decoded.exp * 1000 < new Date().getTime()) {
        const get_refresh_token = cookies.refresh_token
        let refresh_token = {
          refresh_token: get_refresh_token
        }
        dispatch(refreshToken(refresh_token)).unwrap()
        auth.token = true
      };
      if (decoded.role_name === 'CUSTOMER') {
        auth.admin = true
      }
    } catch (error) {
      console.error(error);
    }
  }
  return auth;
}