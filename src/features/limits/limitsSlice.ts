import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "utils/constants";


export const getLimits = createAsyncThunk<any, any>(
    "limits/getLimits",

    async(payload, thunkAPI) => {

        try {
            const res = await axios.post(`${API_URL}/getlimits`, payload);
            return res.data;
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }

);

export const editLimits = createAsyncThunk<any, any>(
    "limits/editLimits",

    async(payload, thunkAPI) => {

        try {
            const res = await axios.post(`${API_URL}/editlimits`, payload);
            return res.data;
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }

);

interface Limits {
    "Счета": number,
    "Еда": number,
    "Личное": number,
    "Подписка": number,
    "Здоровье": number,
    "Образование": number,
    "Транспорт": number,
    "Инвестиции": number,
    "Другое": number
}

interface LimitsState {
    categoryLimits: Limits[]
}

const initialState: LimitsState = {
    categoryLimits: [],
}

const limitsSlice = createSlice({
    name: 'limits',
    initialState,
    reducers:{
        
    },
    extraReducers: (builder) => {
        builder.addCase(getLimits.fulfilled, (state, {payload}) => {
            state.categoryLimits = payload
        });
        builder.addCase(editLimits.fulfilled, (state, {payload}) => {
            state.categoryLimits = payload
        });
    }
});

export default limitsSlice.reducer;

