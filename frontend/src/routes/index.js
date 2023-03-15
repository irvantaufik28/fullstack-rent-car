import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import HomePage from "../pages/HomePage";
import CarList from "../pages/CarList";
import CarDetailPage from '../pages/CarDetailPage'

function RoutesIndex() {
  return (
    <Router>
      <div>
        <Navbar />
        

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/car" element={<CarList />} />
          <Route path="/car/:id" element={<CarDetailPage />} />
      
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default RoutesIndex;