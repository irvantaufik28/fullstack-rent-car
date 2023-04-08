import { configureStore } from "@reduxjs/toolkit";
import carReducer from '../features/carSlice';
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";


const store = configureStore({
  reducer: {
    car: carReducer,
    auth: authReducer,
    user: userReducer
  },
});

export default store;

// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import rootCarReducer from '../features/carSlice'

// const initialStatToken = {
//   token: ""
// };
// const initialStateRefreshToken = {
//   refreshToken: ""
// };

// const intialStateUser = {
//   user: {}
// }

// function rootReducerToken(state = initialStatToken, action) {
//   switch (action.type) {
//     case "SET_TOKEN":
//       return { ...state, token: action.payload };
//     default:
//       return state;
//   }
// }

// function rootReducerRefreshToken(state = initialStateRefreshToken, action) {
//   switch (action.type) {
//     case "SET_REFRESH_TOKEN":
//       return { ...state, refreshToken: action.payload };
//     default:
//       return state;
//   }
// }

// function rootReducerGetUser(state = intialStateUser, action) {
//   switch (action.type) {
//     case "SET_GET_USER":
//       return { ...state, user: action.payload };
//     default:
//       return state;
//   }
// }

// const rootReducer = combineReducers({
//   reducerToken: rootReducerToken,
//   reducerRefreshToken: rootReducerRefreshToken,
//   reducerGetUser: rootReducerGetUser,
//   reducerCar : rootCarReducer
// })

// const store = configureStore({
//   reducer: rootReducer
// });

// export default store;