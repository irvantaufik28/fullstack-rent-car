import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const refreshToken = useSelector((state) => state.refreshToken);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:4001/auth/refresh-token', {
          refresh_token: refreshToken,
        });
        setToken(response.data.access_token);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [refreshToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        setError(error);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  if (error) {
    return <div className="dashboard-admin">Error: {error.message}</div>;
  }

  return <div className="dashboard-admin">Welcome back: {user.email}</div>;
};

export default Dashboard;
