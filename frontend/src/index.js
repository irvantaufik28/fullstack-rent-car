import React from 'react';
import ReactDOM from 'react-dom/client';
import './pages/client/car/carDetail/styles/calendar.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie';
import store from '../src/store/store'
import IndexRoutes from './routes/index.routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <IndexRoutes />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
