import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../config";
import axios from "axios";

export const adminGetAllOrder = createAsyncThunk('order/admin/getAllOrder', async (params = {}) => {
    const token = localStorage.getItem('token')
    const apiUrl = config.apiBaseUrl
    console.log(params)
    try {

        const response = await axios.get(apiUrl + "/order", {
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

export const customerAddOrder = createAsyncThunk("customer/order", async (params = {}) => {

    const token = localStorage.getItem('token')
    const apiUrl = config.apiBaseUrl
    try {
        const response = await axios.post(apiUrl + "/order", params, {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });
        console.log(params)

        return response.data
    } catch (err) {
        console.log(err)
    }
})


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        data: {},
        selectAddOrderResponse: {},
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
            .addCase(customerAddOrder.fulfilled, (state, action) => {
                state.addCarResponse = action.payload
            })
    }
})

export const { setOrder } = orderSlice.actions;
export const selectAddOrderResponse = (state) => state.car.addCarResponse;
export const orderSelector = {
    selectAllOrders: (state) => state.order.data,

}

export default orderSlice.reducer