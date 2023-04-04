import React, { useState } from 'react'
import Login from '../components/auth/Login'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt from "jwt-decode";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");


  const loginAdmin = async (params = {}) => {
    try {
      const response = await axios.post(
        "http://localhost:4001/auth/login",
        params

      );

      const token = response.data.access_token;
      const user = jwt(token);
      setRole(user.role_name);
      dispatch({ type: "SET_REFRESH_TOKEN", payload: response.data.refresh_token });

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
  const navigate = useNavigate();
  return (
    <>
      <Login onSubmit={onSubmitLogin} message={message} role={role} />
      {role === 'ADMIN' ? (navigate("/dashboard")) : (navigate("/"))}
    </>
  )
}

export default LoginPage