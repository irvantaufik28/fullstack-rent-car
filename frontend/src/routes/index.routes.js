import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/login/LoginPage";
import RegisterPage from "../pages/auth/register/RegisterPage";
import HomePage from "../pages/client/home/HomePage";
import CarListPage from "../pages/client/car/carList/CarListPage";
import CarDetailPage from '../pages/client/car/carDetail/CarDetailPage'
import UserProfilePage from "../pages/client/user/UserProfilePage";
import UserSettingPage from "../pages/client/user/UserSettingPage";
import PrivateRoutes from "../utils/PrivateRoutes";
import AdminCarListPage from "../pages/admin/car/AdminCarListPage";
import DashboardAdmin from "../pages/admin/dashboard/DashboardAdmin";

import '../components/layouts/styles/mobile.css'
import AdminAddCarPage from "../pages/admin/car/AdminAddCarPage";
import AdminUpdateCarPage from "../pages/admin/car/AdminUpdateCarPage";
import PrivateRoutesCustomer from "../utils/PrivateRouteCustomer";
import PaymentPage from "../pages/client/payment/PaymentPage";
import { PaymentValidationPage } from "../pages/client/payment/PaymentValidationPage";
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

        <Route element={<PrivateRoutesCustomer />}>

          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/validation/order/:id" element={<PaymentValidationPage />} />

        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/admin/carlist" element={<AdminCarListPage />} />
          <Route path="/admin/addcar" element={<AdminAddCarPage />} />
          <Route path="/admin/update/car/:id" element={<AdminUpdateCarPage />} />
          <Route path="/dashboard" element={<DashboardAdmin />} />
        </Route>


      </Routes>
    </Router>
  );
}

export default IndexRoutes;
