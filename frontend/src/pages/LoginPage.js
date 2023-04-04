import React, { useState } from 'react'
import Login from '../components/auth/admin/Login'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");


  const loginAdmin = async (params = {}) => {
    try {
      const response = await axios.post(
        "http://localhost:4001/auth/login",
        params

      );

      const token = response.data.access_token;
      const user = jwtDecode(token);
      setRole(user.role_name);
      dispatch({ type: "SET_REFRESH_TOKEN", payload: response.data.refresh_token });
      
        if (user.role_name === 'ADMIN') {
          navigate('/dashboard')
        }
    } catch (err) {
      if (err) {
        setMessage(err.response.data.message);
        console.log(err.response);
      }
    }

  }
  const onSubmitLogin = (payload) => {
    loginAdmin(payload)
  }
  return (
    <>
      <Login onSubmit={onSubmitLogin} message={message} role={role} />
    </>
  )
}

export default LoginPage