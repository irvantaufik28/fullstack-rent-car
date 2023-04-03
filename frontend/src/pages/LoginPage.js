import React, { useState } from 'react'
import Login from '../components/auth/Login'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt from "jwt-decode";

const LoginPage = () => {

  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const loginAdmin = async (params = {}) => {
    try {
      const response = await axios.post(
        "http://localhost:4001/auth/login",
        params

      );

      const token = response.data.access_token;
      const user = jwt(token);
      setRole(user.role_name);

      if (user.role_name === 'ADMIN') {
        navigate("/dashboard");
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
    <Login onSubmit={onSubmitLogin} message={message} role={role} />
  )
}

export default LoginPage