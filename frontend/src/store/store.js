import { configureStore } from "@reduxjs/toolkit";
import carReducer from '../features/carSlice';
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import carMediaReducer from "../features/carMediaSlice"
import orderReducer from "../features/orderSlice"

const store = configureStore({
  reducer: {
    car: carReducer,
    auth: authReducer,
    user: userReducer,
    carMedia: carMediaReducer,
    order: orderReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export default store;