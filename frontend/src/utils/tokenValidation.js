import jwtDecode from 'jwt-decode';

export const tokenValidation = () => {
  let auth = {
    token: false,
    tokenUser: ''
  };
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      auth.token = decoded.exp * 1000 > new Date().getTime();
      if(auth.token) {
        auth.tokenUser = token
      }
    } catch (error) {
      console.error(error);
    }
  }
  return auth;
};

export const adminValidation = () => {
  let auth = {
    token: false,
    admin: false
  }
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const decode = jwtDecode(token)
      if (decode.exp * 1000 > new Date().getTime()) {
        auth.token = true
      }
      if (decode.role_name === 'ADMIN') {
        auth.admin = true
      }
    } catch (error) {
      console.error(error);
    }
  }
  return auth;
}