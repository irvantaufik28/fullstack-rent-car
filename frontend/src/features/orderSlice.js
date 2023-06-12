import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../config";
import axios from "axios";

export const adminGetAllOrder = createAsyncThunk('order/admin/getAllOrder', async (params = {}) => {
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
    const apiUrl = config.apiBaseUrl

    try {

        const response = await axios.get(apiUrl + "/order/admin", {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data

    } catch (error) {
        console.log(error)

    }
})

export const adminGetOrderReport = createAsyncThunk('order/admin/report', async () => {
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
    const apiUrl = config.apiBaseUrl

    try {

        const response = await axios.get(apiUrl + "/order/admin/report", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response

    } catch (error) {
        console.log(error)

    }
})
export const adminGeOrderById = createAsyncThunk('order/admin/getOrderById', async (id) => {
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
    const apiUrl = config.apiBaseUrl

    try {

        const response = await axios.get(apiUrl + `/order/admin/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data

    } catch (error) {
        console.log(error)

    }
})


export const adminUpdateOrder = createAsyncThunk("order/admin/update", async ({ id, params }) => {
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
    const apiUrl = config.apiBaseUrl
    try {
        const response = await axios.patch(apiUrl + `/order/admin/update/${id}`,
            params, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    } catch (err) {
        console.log(err)
    }
})


export const customerAddOrder = createAsyncThunk("customer/order", async (params = {}) => {
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
    const apiUrl = config.apiBaseUrl
    try {
        const response = await axios.post(apiUrl + "/order", params, {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });


        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const customerGetOrderById = createAsyncThunk("customer/order/id", async (id) => {
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
    const apiUrl = config.apiBaseUrl
    const response = await axios.get(apiUrl + `/order/customer/${id}`, {
        headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
})


export const customerGetAllOrder = createAsyncThunk('order/customer/getAllOrder', async (params = {}) => {
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
    const apiUrl = config.apiBaseUrl

    try {

        const response = await axios.get(apiUrl + "/order/customer/list", {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data

    } catch (error) {
        console.log(error)

    }
})

export const customerUploadSlip = createAsyncThunk(
    'order/customer/slip',
    async (params = {}, { rejectWithValue }) => {
        const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='))
            ?.split('=')[1];
        const apiUrl = config.apiBaseUrl;

        try {
            const response = await axios.post(apiUrl + '/slip/post', params, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const customerUpdateOrder = createAsyncThunk("order/customer/update", async ({ id, params }) => {
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
    const apiUrl = config.apiBaseUrl
    try {
        const response = await axios.patch(apiUrl + `/order/customer/update/${id}`,
            params, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    } catch (err) {
        console.log(err)
    }
})


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        data: {},
        loading: false,
        errorMessage: null,
        selectAddOrderResponse: {},
        paginate: {}
    },
    reducers: {
        setOrder: (state, action) => {
            return action.payload;
        },
        setPaginate: (state, action) => {
            state.paginate = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(adminGetAllOrder.fulfilled, (state, action) => {
                state.data = action.payload
            }) 
            .addCase(adminGetOrderReport.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(adminGeOrderById.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(customerGetAllOrder.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(customerAddOrder.fulfilled, (state, action) => {
                state.addCarResponse = action.payload
            })
            .addCase(customerGetOrderById.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(customerUploadSlip.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.errorMessage = null;
            })
            .addCase(customerUploadSlip.rejected, (state, action) => {
                state.errorMessage = action.payload
            })
            .addCase(customerUploadSlip.pending, (state, action) => {
                state.loading = true
                state.errorMessage = null
            })
            .addCase(customerUpdateOrder.fulfilled, (state, action) => {
                state.data = action.payload
            })
    }
})

export const { setOrder, setPaginate } = orderSlice.actions;
export const selectAddOrderResponse = (state) => state.car.addCarResponse;
export const orderSelector = {
    selectAllOrders: (state) => state.order.data,
    selectCustomerAllOrders: (state) => state.order.data,
    selectOrderReport: (state) => state.order.data,
    selectCustomerOrdeyById: (state) => state.order.data,
    selectAdminOrderById: (state) => state.order.data,
    loading: (state) => state.order.loading,
    errorMessage: (state) => state.order.errorMessage

}

export default orderSlice.reducer