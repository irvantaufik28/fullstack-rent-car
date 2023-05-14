import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../config";
import axios from "axios";

export const adminGetAllOrder = createAsyncThunk('order/admin/getAllOrder', async(params = {}) => {
    const token = localStorage.getItem('token')
    const apiUrl = config.apiBaseUrl

    try {
        
        const response =  await axios.get(apiUrl + "/order", params, {
            // headers: {
            //     Authorization: `Bearer ${token}`
            // }
        });

        return response.data

    } catch (error) {
        console.log(error)
        
    }
})


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        data: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(adminGetAllOrder.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const orderSelector = {
    selectAllOrders: (state) => state.order.data
}

export default orderSlice.reducer