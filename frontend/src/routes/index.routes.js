import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import HomePage from "../pages/HomePage";
import CarList from "../pages/CarList";
import CarDetailPage from '../pages/CarDetailPage'
import Dashboard from "../components/dashboard/Dashboard";
import PrivateRoutes from "../utils/PrivateRoutes";
import '../components/styles/mobile.css'
import UserProfilePage from "../pages/user/UserProfilePage";
import UserSettingPage from "../pages/user/UserSettingPage";
import UpdateCarPage from "../pages/car/UpdateCarPage";
function IndexRoutes() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route exact path="/" element={<HomePage />} />
          <Route path="/car" element={<CarList />} />
          <Route path="/car/:id" element={<CarDetailPage />} />
          <Route path="/car/update" element={< UpdateCarPage />} />
          <Route path="/user/profile" element={<UserProfilePage />} />
          <Route path="/user/profile/setting" element= {<UserSettingPage />} />
          <Route element={<PrivateRoutes />}>
                <Route element={<Dashboard/>} path="/dashboard" />
            </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default IndexRoutes;
