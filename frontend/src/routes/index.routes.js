import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/login/LoginPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
import HomePage from "../pages/home/HomePage";
import CarListPage from "../pages/car/carList/CarListPage";
import CarDetailPage from '../pages/car/carDetail/CarDetailPage'
import UserProfilePage from "../pages/user/UserProfilePage";
import UserSettingPage from "../pages/user/UserSettingPage";
import PrivateRoutes from "../utils/PrivateRoutes";
import AdminCarListPage from "../pages/admin/car/AdminCarListPage";
import DashboardAdmin from "../pages/admin/dashboard/DashboardAdmin";

import '../components/layouts/styles/mobile.css'
import AdminAddCar from "../pages/admin/dashboard/AdminAddCar";
function IndexRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route exact path="/" element={<HomePage />} />
        <Route path="/car" element={<CarListPage />} />
        <Route path="/car/:id" element={<CarDetailPage />} />
        <Route path="/user/profile" element={<UserProfilePage />} />
        <Route path="/user/profile/setting" element={<UserSettingPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/admin/carlist" element={<AdminCarListPage />} />
          <Route path="/admin/addcar" element={<AdminAddCar />} />
          <Route path="/dashboard" element={<DashboardAdmin />} />
        </Route>


      </Routes>
    </Router>
  );
}

export default IndexRoutes;
