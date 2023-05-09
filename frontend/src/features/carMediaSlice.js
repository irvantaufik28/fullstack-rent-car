import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import config from "../config"


export const addImageCar = createAsyncThunk('car/media', async(params = {}) => {
    const token = localStorage.getItem('token')
    const apiUrl =  config.apiBaseUrl

    try {
        await axios.post(apiUrl+ "/car-media", params, {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}` 
            }
        })
    } catch (err) {
        console.log(err)
    }
})


const carMediaSlice = createSlice({
    name: "carMedia",
    initialState: {
        data: {},
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addImageCar.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(addImageCar.pending, (state, action) => {
                state.loading = true
            })
    }
})


export const carMediaSelectors = {
    loading: (state) => state.carMedia.loading
}

export default carMediaSlice.reducer