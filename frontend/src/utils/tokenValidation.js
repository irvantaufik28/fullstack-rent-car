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