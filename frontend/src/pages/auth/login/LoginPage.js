import React, { useState } from 'react'
import Login from './components/Login'
import { useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from '../../../features/authSlice';
import { useCookies } from 'react-cookie';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [cookies, setCookie] = useCookies(['token', 'refresh_token']);
  
  const onSubmitLogin = async (payload) => {
    try {
      const result = await dispatch(login(payload)).unwrap();
      
      const user = jwtDecode(result.access_token)
      setCookie('token', result.access_token, { path: '/' });
      setCookie('refresh_token', result.refresh_token, { path: '/' });
      

      if (user.role_name === 'ADMIN') {
        navigate('/dashboard')
      }
      if (user.role_name === 'CUSTOMER') {
        navigate('/')
      }
    } catch (err) {
      setMessage(err.message);
    }
 
  };

  return (
    <>
      <Login onSubmit={onSubmitLogin} message={message} />
    </>
  )
}

export default LoginPage