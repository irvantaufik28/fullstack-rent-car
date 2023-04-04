import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { useSelector } from 'react-redux';

const Dashboard = () => {
  const refreshToken = useSelector((state) => state.refreshToken);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    refreshTokenFunc();
  }, []);

  useEffect(() => {
    getUser();
  }, [token]);

  const refreshTokenFunc = async () => {
    try {
      const response = await axios.post('http://localhost:4001/auth/refresh-token', {
        refresh_token: refreshToken,
      });
      setToken(response.data.access_token);
      const decodedToken = jwtDecode(response.data.access_token);
      setUser(decodedToken);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      
      const response = await axios.get('http://localhost:4001/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return <div className="dashboard-admin">Welcome back: </div>;
};

export default Dashboard;
