import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';

export const getAllCars = createAsyncThunk("car/getAllCars" , async(params = {}) => {
    const apiUrl = config.apiBaseUrl
    const response = await axios.get(apiUrl + "/customer/v2/car", {
        params
    })
    // console.log(response.data)
    return response.data
})


export const getCarById = createAsyncThunk("car/getCar" , async(id) => {
    const apiUrl = config.apiBaseUrl
    const response = await axios.get(apiUrl + `/customer/car/${id}`)
    return response.data
})

const carSlice = createSlice({
    name: "car",
    initialState: {
        car: {},
        cars: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCarById.fulfilled, (state, action) => {
            state.car = action.payload
        })
        .addCase(getAllCars.fulfilled, (state, action) => {
            state.cars = action.payload
        }) 
    }  
})

export const carSelectors = {
    selectCarById: (state) => state.car.car,
    selectAllCars: (state) => state.car.cars
}
export default carSlice.reducer;