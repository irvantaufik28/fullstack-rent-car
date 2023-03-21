import React from 'react';
import ReactDOM from 'react-dom/client';
import CarRoutes from "./routes/car.routes";
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <CarRoutes />
  </React.StrictMode>
);
