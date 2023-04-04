import { createSelector } from "@reduxjs/toolkit";

export const selectToken = (state) => state.reducerToken.token;
export const selectRefreshToken = (state) => state.reducerRefreshToken.refreshToken;
export const selectTokens = createSelector(
  selectToken,
  selectRefreshToken,
  (token, refreshToken) => ({ token, refreshToken })
);