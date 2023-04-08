import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode'

const Dashboard = () => {
 
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const userToken = localStorage.getItem('token');
  if (!userToken) 
  try {
      const storedToken = localStorage.getItem('token');
      if (storedToken === null) {
        localStorage.setItem('token', userToken);
      } else {
        const decoded = jwtDecode(storedToken);

        const currentDate = new Date();
        if (decoded.exp * 1000 < currentDate.getTime()) {
          localStorage.setItem('token', userToken);
        }
      }
    } catch (error) {
      console.log('Error decoding token:', error);
    }
  


  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div className="dashboard-admin">Error: {error.message}</div>;
  }

  return (
<div>
  <div className="dashboard-admin">Welcome back: {user.email}</div>
      
</div>

  )
};

export default Dashboard;