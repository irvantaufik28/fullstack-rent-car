import React, { useState } from 'react'
import Register from './components/Register'
import axios from 'axios' 

const RegisterPage = () => {
  const [message, setMessage] = useState("")
  const [successRegister, setSuccessRegister] = useState(false);

  const registerUser = async (params = {}) => {
    try {
      await axios.post("http://localhost:4001/user/register", params)
    
      setSuccessRegister(true)
    } catch (err) {
      if(err) {
        setMessage(err.response.data.message)
        console.log(err.response)
      }
    }
  }

  const onSubmitRegister = payload => {
      registerUser(payload)
  } 


  return (
    <Register onSubmit={onSubmitRegister} message={message} successRegister={successRegister} />
  )
}

export default RegisterPage