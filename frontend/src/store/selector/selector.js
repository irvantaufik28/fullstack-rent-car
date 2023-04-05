import { createSelector } from "@reduxjs/toolkit";

export const selectToken = (state) => state.reducerToken.token;
export const selectRefreshToken = (state) => state.reducerRefreshToken.refreshToken;
export const selectGetUser = (state) => state.reducerGetUser.user
export const selectTokens = createSelector(
  selectToken,
  selectRefreshToken,
  selectGetUser,
  (token, refreshToken, user) => ({ token, refreshToken, user })
);