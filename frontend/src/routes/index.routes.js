import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/login/LoginPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
import HomePage from "../pages/home/HomePage";
import CarListPage from "../pages/car/carList/CarListPage";
import CarDetailPage from '../pages/car/carDetail/CarDetailPage'
import DashBoardPage from "../pages/dashboard/DashBoardPage";
import PrivateRoutes from "../utils/PrivateRoutes";
import UserProfilePage from "../pages/user/UserProfilePage";
import UserSettingPage from "../pages/user/UserSettingPage";

import '../components/layouts/styles/mobile.css'
function IndexRoutes() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route exact path="/" element={<HomePage />} />
          <Route path="/car" element={<CarListPage />} />
          <Route path="/car/:id" element={<CarDetailPage />} />
          <Route path="/user/profile" element={<UserProfilePage />} />
          <Route path="/user/profile/setting" element= {<UserSettingPage />} />
          <Route element={<PrivateRoutes />}>
                <Route element={<DashBoardPage/>} path="/dashboard" />
            </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default IndexRoutes;
