import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  loading: 'idle',
  errorMessage: null,
}

export const login = createAsyncThunk(
  "user/login",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:4001/auth/login", params);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

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
      });
  }
});

export default authSlice.reducer;
