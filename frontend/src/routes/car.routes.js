import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CarList from "../pages/CarList";
import CarDetailPage from '../pages/CarDetailPage'

function CarRoutes() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/car" element={<CarList />} />
          <Route path="/car/:id" element={<CarDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default CarRoutes;