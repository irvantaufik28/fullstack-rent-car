import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  refreshToken: ""
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_REFRESH_TOKEN":
      return { ...state, refreshToken: action.payload };
    default:
      return state;
  }
}

const store = configureStore({
  reducer: rootReducer
});

export default store;