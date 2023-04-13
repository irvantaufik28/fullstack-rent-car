import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";

const initialState = {
  token: null,
  dataRefreshToken: {},
  loading: 'idle',
  errorMessage: null,
}

export const login = createAsyncThunk(
  "user/login",
  async (params = {}, { rejectWithValue }) => {
    try {
      const apiUrl = config.apiBaseUrl
      const response = await axios.post(apiUrl + "/auth/login", params);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const refreshToken = createAsyncThunk("user/refreshToken", async (params ={}, {rejectWithValue}) => {
  try {
    // console.log(params)
    const apiUrl = config.apiBaseUrl
    const response = await axios.post(apiUrl + "/auth/refresh-token", params);
    localStorage.setItem('token', response.data.access_token)
    console.log('token has been refreshed')
    return response.data.access_token
  } catch (err) {
    if (!err.response) {
      throw err
    }
    return rejectWithValue(err.response.data)
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = 'pending';
        state.errorMessage = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.token = action.payload;
        state.errorMessage = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = 'rejected';
        state.errorMessage = action.payload;
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = 'pending';
        state.errorMessage = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.dataRefreshToken = action.payload;
        state.errorMessage = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = 'rejected';
        state.errorMessage = action.payload;
      });
  }
});

export const authSelector = {
  selectRefreshToken : (state) => state.auth.refreshToken
}

export default authSlice.reducer;
