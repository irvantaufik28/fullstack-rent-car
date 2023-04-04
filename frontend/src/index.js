import React from 'react';
import ReactDOM from 'react-dom/client';
import CarRoutes from "./routes/car.routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from '../src/store/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CarRoutes />
    </Provider>
  </React.StrictMode>
);
