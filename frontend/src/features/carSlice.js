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
    
    const token = localStorage.getItem('token')
    const apiUrl = config.apiBaseUrl
    try {
        console.log(params)
        await axios.post(apiUrl + "/car", params, {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
                });
      
    } catch (err) {
        console.log(err)
    }
})

export const getCarById = createAsyncThunk("car/getCar", async (id) => {
    const apiUrl = config.apiBaseUrl
    const response = await axios.get(apiUrl + `/car/${id}`)
    return response.data
})

export const deleteCar = createAsyncThunk("car/delete", async (id) => {
    const token = localStorage.getItem('token');
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
        car: {},
        cars: {},
        loading: 'idle'
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminAddCar.fulfilled,(state, action) => {
                state.car = action.payload
            })
            .addCase(getCarById.fulfilled, (state, action) => {
                state.car = action.payload
            })
            .addCase(getAllCars.fulfilled, (state, action) => {
                state.cars = action.payload
            })
            .addCase(deleteCar.fulfilled, (state, action) => {
                state.cars = state.cars.cars.filter((car) => car.id !== action.payload);
            });

    }
})

export const carSelectors = {
    selectCarById: (state) => state.car.car,
    selectAllCars: (state) => state.car.cars,
}
export default carSlice.reducer;