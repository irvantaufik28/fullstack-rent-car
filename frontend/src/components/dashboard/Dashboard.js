import React, { useState } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { Navigate } from 'react-router-dom'
const Dashboard = () => {
  const [name, setName ] = useState('')
  const [token, setToken] = useState('')

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:4001/auth/login')
    } catch (err) {
      
    }
  }

  return (
    <div className='dashboard-admin'>Welcome back: </div>
  )
}

export default Dashboard