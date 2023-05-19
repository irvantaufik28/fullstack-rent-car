import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../config";
import axios from "axios";

export const adminGetAllOrder = createAsyncThunk('order/admin/getAllOrder', async(params = {}) => {
    const token = localStorage.getItem('token')
    const apiUrl = config.apiBaseUrl
    console.log(params)
    try {
        
        const response =  await axios.get(apiUrl + "/order", {
            params
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
    reducers: {
        setOrder: (state, action) => {
            console.log(action.payload)
            return action.payload;
          },
    },
    extraReducers: (builder) => {
        builder
        .addCase(adminGetAllOrder.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const { setOrder } = orderSlice.actions;

export const orderSelector = {
    selectAllOrders: (state) => state.order.data
}

export default orderSlice.reducer