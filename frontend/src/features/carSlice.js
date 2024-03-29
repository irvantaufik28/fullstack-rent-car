import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';


export const getAllCars = createAsyncThunk("car/getAllCars", async (params = {}) => {
    const apiUrl = config.apiBaseUrl
    const response = await axios.get(apiUrl + "/car", {
        params
    })
    return response.data
})

export const adminAddCar = createAsyncThunk("car/addCar", async (params = {}) => {

    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

    const apiUrl = config.apiBaseUrl
    try {
        const response = await axios.post(apiUrl + "/car", params, {
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

export const getCarById = createAsyncThunk("car/getCar", async (id) => {
    const apiUrl = config.apiBaseUrl
    const response = await axios.get(apiUrl + `/car/${id}`)
    return response.data
})

export const adminUpdateCar = createAsyncThunk("car/update", async ({ id, params }) => {
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
    const apiUrl = config.apiBaseUrl
    try {
        const response = await axios.put(apiUrl + `/car/${id}`, params, {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const deleteCar = createAsyncThunk("car/delete", async (id) => {
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];
    const apiUrl = config.apiBaseUrl;
    await axios.delete(apiUrl + `/car/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return id;
});

const carSlice = createSlice({
    name: "car",
    initialState: {
        data: {},
        loading: false,
        addCarResponse: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminAddCar.fulfilled, (state, action) => {
                state.addCarResponse = action.payload
            })
            .addCase(getCarById.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(getAllCars.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.data = action.payload
                state.loading = false
            })
            .addCase(getAllCars.pending, (state, action) => {
                state.loading = true
            })
            .addCase(adminUpdateCar.pending, (state, action) => {
                state.loading = true
            })
            .addCase(adminUpdateCar.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(deleteCar.fulfilled, (state, action) => {
                state.car = state.data.cars.filter((car) => car.id !== action.payload);
            });

    }
})
export const { setCar } = carSlice.actions
export const selectAddCarResponse = (state) => state.car.addCarResponse;
export const carSelectors = {
    selectCarById: (state) => state.car.data,
    selectAllCars: (state) => state.car.data,
    loading: (state) => state.car.loading,
}
export default carSlice.reducer;