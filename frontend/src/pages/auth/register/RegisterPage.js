import React, { useState } from 'react'
import Register from './components/Register'
import axios from 'axios' 
import config from '../../../config'

const RegisterPage = () => {
  const [message, setMessage] = useState("")
  const [successRegister, setSuccessRegister] = useState(false);
  const apiUrl = config.apiBaseUrl
  const registerUser = async (params = {}) => {
    try {
      await axios.post(apiUrl + "/user/register", params)
    
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