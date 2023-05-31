import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";
// import config from "../config";

const initialState = {
    user: {},
    loading: 'idle',
    errorMessage: null,
  }

export const getUser = createAsyncThunk('user/getUser', async ( token,rejectWithValue) => {
  const apiUrl = config.apiBaseUrl
    try {

        const response = await axios.get(apiUrl + '/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getUser.pending, (state) => {
            state.loading = 'pending';
            state.errorMessage = null;
          })
          .addCase(getUser.fulfilled, (state, action) => {
            state.loading = 'fulfilled';
            state.user = action.payload;
            state.errorMessage = null;
          })
          .addCase(getUser.rejected, (state, action) => {
            state.loading = 'rejected';
            state.errorMessage = action.payload;
          });
      }
})


export const userSelector = {
    selectUser: (state) => state.user.user
}
export default userSlice.reducer;