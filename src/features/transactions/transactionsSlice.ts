import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "utils/constants";


export const insertTransaction = createAsyncThunk<any, any>(
    "transactions/insertTransaction",

    async(payload, thunkAPI) => {

        try {
            const res = await axios.post(`${API_URL}/addtransaction`, payload);
            return res.data;
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }

);

export const getTransactions = createAsyncThunk<any,any>(
    "transactions/getTransactions",

    async(payload, thunkAPI) => {
        try {
            const res = await axios.post(`${API_URL}/gettransactions`, payload);
            return res.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const editTransaction = createAsyncThunk<any,any>(
    "transactions/editTransaction",

    async(payload, thunkAPI) => {
        try {
            const res = await axios.post(`${API_URL}/edittransaction`, payload);
            return res.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteTransaction = createAsyncThunk<any,any>(
    "transactions/deleteTransaction",

    async(payload, thunkAPI) => {
        try {
            const res = await axios.post(`${API_URL}/deletetransaction`, payload);
            return res.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

interface Transaction {
    id: number,
    userid: number,
    name: string,
    price: number,
    category: string,
    date: Date
}

interface Category {
    value: string
}

interface TransactionsState {
    transactionsList: Transaction[],
    categoryList: Category[],
}

const initialState: TransactionsState = {
    transactionsList: [],
    categoryList: [
        {
            value: 'Счета'
        },
        {
            value: 'Еда',
        },
        {
            value: 'Личное',
        },
        {
            value: 'Подписка'
        },
        {
            value: 'Здоровье',
        },
        {
            value: 'Образование',
        },
        {
            value: 'Транспорт',
        },
        {
            value: 'Другое',
        },
    ],
}

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers:{
        
    },
    extraReducers: (builder) => {
        builder.addCase(insertTransaction.fulfilled, (state, {payload}) => {
            state.transactionsList = payload
        });
        builder.addCase(getTransactions.fulfilled, (state, {payload}) => {
            state.transactionsList = payload
        });
        builder.addCase(editTransaction.fulfilled, (state, {payload}) => {
            state.transactionsList = payload;
        });
        builder.addCase(deleteTransaction.fulfilled, (state, {payload}) => {
            state.transactionsList = payload;
        });

    }
});

export default transactionsSlice.reducer;

