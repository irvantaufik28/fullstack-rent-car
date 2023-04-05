import { combineReducers, configureStore } from "@reduxjs/toolkit";


const initialStatToken = {
  token: ""
};
const initialStateRefreshToken = {
  refreshToken: ""
};

function rootReducerToken(state = initialStatToken, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    default:
      return state;
  }
}

function rootReducerRefreshToken(state = initialStateRefreshToken, action) {
  switch (action.type) {
    case "SET_REFRESH_TOKEN":
      return { ...state, refreshToken: action.payload };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  reducerToken: rootReducerToken,
  reducerRefreshToken: rootReducerRefreshToken
})

const store = configureStore({
  reducer: rootReducer
});

export default store;